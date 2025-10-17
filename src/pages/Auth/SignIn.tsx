import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { setCredentials } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../hooks/redux";
import useDialog from "../../hooks/useDialog";

import { signInRequest } from "../../api/authentication";

type SignInResponse = {
  Role: string;
  access_token: string;
  email: string;
  expires_in: number;
  id: number;
  profile: string | null;
  token_type: string;
  username: string;
  [k: string]: any;
};

type SignInError = {
  response: {
    data: string;
  };
};

type SignInPayload = { email: string; password: string };

const BUFFER_SECONDS = 30;

const validationSchema = yup.object({
  email: yup.string().email("Correo inválido").min(4, "Mínimo 4 caracteres").required("Campo requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Campo requerido"),
});

function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showError } = useDialog();
  const signInMutation = useMutation<SignInResponse, SignInError, SignInPayload>({
    mutationFn: (data) => signInRequest(data),
    onSuccess: (data) => {
      const decoded: { exp?: number; sub?: string } = jwtDecode(data.access_token);
      const user = {
        id: parseInt(decoded.sub ?? "0", 10),
        fullName: data.username,
        email: data.email,
        profile: data.profile,
        role: data.Role,
      };

      if (typeof decoded.exp === "number") {
        const expMs = decoded.exp * 1000;
        const buffered = expMs - BUFFER_SECONDS * 1000;
        const sessionExpirationISO = new Date(buffered).toISOString();

        dispatch(setCredentials({ user, token: data.access_token, sessionExpiration: sessionExpirationISO }));
      } else {
        dispatch(setCredentials({ user, token: data.access_token, sessionExpiration: new Date().toISOString() }));
        console.warn("El token no contiene el campo exp.");
      }
      navigate("/dashboard");
    },
    onError: (error) => {
      showError({
        title: "¡Ocurrió un error!",
        content: error.response.data,
      });
      console.error(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const formattedData = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      signInMutation.mutate(formattedData);
      setSubmitting(false);
    },
  });
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      bgcolor={theme.palette.primary.main}
    >
      <Paper
        elevation={3}
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: "600px",
          height: "650px",
          p: 6,
          borderRadius: "20px",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            component="img"
            src="/src/assets/images/logo-uc-christus.png"
            alt="UC-Christus"
            width={240}
            height={65}
          />
        </Box>
        <Typography variant="subtitle1" textAlign="center" fontWeight={500} mb={2}>
          Una plataforma del Centro de Manejo del Dolor
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
          <FormControl fullWidth margin="normal" required>
            <FormLabel
              sx={{
                mb: 1,
              }}
            >
              Correo electrónico
            </FormLabel>
            <TextField
              fullWidth
              id="email"
              type="email"
              name="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <FormLabel
              sx={{
                mb: 1,
              }}
            >
              Contraseña
            </FormLabel>
            <TextField
              fullWidth
              id="password"
              type="password"
              name="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
          <FormControlLabel control={<Checkbox />} label="Recordarme" />
          <Link>¿Olvidaste tu contraseña?</Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: "5px",
            mt: 4,
          }}
          type="submit"
        >
          <Typography variant="button" color="white">
            Iniciar Sesión
          </Typography>
        </Button>
      </Paper>
    </Box>
  );
}

export default SignIn;

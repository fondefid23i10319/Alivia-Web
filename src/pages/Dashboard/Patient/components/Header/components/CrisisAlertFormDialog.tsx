import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

import useDialog from "../../../../../../hooks/useDialog";
import { useAppSelector } from "../../../../../../hooks/redux";
import { selectId } from "../../../../../../features/auth/selectors";

import { getDoctorsRequest } from "../../../../../../api/doctor/get";
import { createCrisisAlertRequest } from "../../../../../../api/patient/post";

const validationSchema = yup.object({
  description: yup.string().required("Campo requerido"),
  doctor: yup.object().required("Campo requerido"),
});

interface CrisisAlertDialogProps {
  open: boolean;
  onClose: () => void;
}

type CrisisAlertPayload = {
  receiver: number;
  content: string;
  sender: number;
  subject: string;
  alert: boolean;
  patient_alert: boolean;
};

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
}

interface FormValues {
  doctor: Doctor | null;
  description: string;
}

function CrisisAlertFormDialog({ open, onClose }: CrisisAlertDialogProps) {
  const id = useAppSelector(selectId);
  const { showSuccess, showError } = useDialog();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctorsRequest(id),
  });

  const createCrisisAlertMutation = useMutation<object, Error, CrisisAlertPayload>({
    mutationFn: (data) => createCrisisAlertRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["general-info", id],
      });
      showSuccess({
        title: "Reporte enviado con éxito",
        content: "El reporte ha sido enviado a tu doctor tratante",
      });
    },
    onError: (error) => {
      showError({
        title: "Error al enviar reporte",
        content: error.message,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      doctor: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues, { setSubmitting }) => {
      setSubmitting(true);
      if (!values.doctor) {
        showError({
          title: "Error",
          content: "Debes seleccionar un profesional tratante.",
        });
        setSubmitting(false);
        return;
      }
      const data = {
        receiver: values.doctor.id,
        content: values.description,
        sender: id,
        subject: "Alerta por crisis",
        alert: true,
        patient_alert: true,
      };
      createCrisisAlertMutation.mutate(data);
      setSubmitting(false);
      onClose();
    },
  });
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          elevation: 8,
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle m={0}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              sx={{
                "&:hover": {
                  borderRadius: "50%",
                  backgroundColor: "#3D3D3D33",
                },
                color: "#3D3D3D",
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6" color="#950600" mb={0}>
              Reporte de Crisis
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            py: 2,
            px: 4,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" p={2} bgcolor="#9506001A" borderRadius="8px">
            <InfoIcon
              sx={{
                color: "#950600",
              }}
            />
            <Typography variant="body2" display="flex" flexWrap="wrap" color="#950600">
              Las crisis solo podrán ser reportadas una vez al día. Esta medida busca garantizar una mejor atención
              y manejo de los pacientes.
            </Typography>
          </Stack>
          <FormControl fullWidth margin="normal">
            <FormLabel
              sx={{
                mb: 1,
                fontSize: "14px",
              }}
            >
              Profesional Tratante
            </FormLabel>
            <Autocomplete
              id="doctor"
              options={data.doctors}
              getOptionLabel={(option: { first_name: string; last_name: string }) =>
                `${option.first_name} ${option.last_name}`
              }
              value={formik.values.doctor}
              onChange={(_, newValue) => {
                formik.setFieldValue("doctor", newValue);
              }}
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecciona tu profesional"
                  variant="outlined"
                  error={formik.touched.doctor && Boolean(formik.errors.doctor)}
                  helperText={formik.touched.doctor && formik.errors.doctor}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: "#F7F7F7",
                    },
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel
              sx={{
                mb: 1,
                fontSize: "14px",
              }}
            >
              Descripción
            </FormLabel>
            <TextField
              id="description"
              type="text"
              name="description"
              placeholder="Describe tu crisis brevemente"
              variant="outlined"
              multiline
              rows={5}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  borderRadius: "8px",
                  backgroundColor: "#F7F7F7",
                },
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ py: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "4px",
              backgroundColor: "#950600",
            }}
            type="submit"
          >
            <Typography variant="button" color="white" fontWeight="bold">
              Enviar reporte
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CrisisAlertFormDialog;

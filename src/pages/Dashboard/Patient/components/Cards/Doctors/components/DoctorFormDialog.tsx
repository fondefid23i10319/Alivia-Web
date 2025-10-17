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
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { useAppSelector } from "../../../../../../../hooks/redux";
import useDialog from "../../../../../../../hooks/useDialog";
import { selectId } from "../../../../../../../features/auth/selectors";

import { getDoctorsWithoutPatientRequestsRequest } from "../../../../../../../api/doctor/get";
import { createDoctorAssignmentRequest } from "../../../../../../../api/patient/post";

const validationSchema = yup.object({
  doctor: yup.object().required("Campo requerido"),
});

interface DoctorDialogProps {
  open: boolean;
  onClose: () => void;
}

type DoctorPayload = {
  patientID: number;
  doctorID: number;
};

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
}

interface FormValues {
  doctor: Doctor | null;
}

function DoctorFormDialog({ open, onClose }: DoctorDialogProps) {
  const id = useAppSelector(selectId);
  const { showSuccess, showError } = useDialog();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctors-without-requests", id],
    queryFn: () => getDoctorsWithoutPatientRequestsRequest(id),
  });

  const createDoctorAssignmentMutation = useMutation<object, Error, DoctorPayload>({
    mutationFn: (data) => createDoctorAssignmentRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assigned-doctors", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["doctors-without-requests", id],
      });
      showSuccess({
        title: "Solicitud enviada con éxito",
        content: "Se te notificará cuando tu médico tratante apruebe tu solicitud",
      });
    },
    onError: (error) => {
      showError({
        title: "Error al agregar médico",
        content: error.message,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      doctor: null,
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
        patientID: id,
        doctorID: values.doctor.id,
      };
      createDoctorAssignmentMutation.mutate(data);
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
            <Stack direction="column" spacing={1} alignItems="center">
              <Box bgcolor="#4476B51A" p={1} borderRadius="4px">
                <NoteAddIcon
                  color="primary"
                  sx={{
                    fontSize: 35,
                  }}
                />
              </Box>

              <Typography variant="h6">Agrega un nuevo profesional tratante</Typography>
              <Typography variant="body2" color="#2E2E2E" display="flex" flexWrap="wrap" textAlign="center">
                El profesional tratante recibirá tu solicitud y deberá aceptarla. Con esto estás dando acceso al
                profesional a tus personales.
              </Typography>
            </Stack>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 2,
          }}
        >
          <FormControl fullWidth margin="normal">
            <FormLabel
              sx={{
                mb: 1,
                fontSize: "14px",
              }}
            >
              Indica el nombre de tu profesional tratante
            </FormLabel>
            <Autocomplete
              id="doctor"
              options={data.doctors}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
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
        </DialogContent>
        <DialogActions sx={{ py: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "4px",
            }}
            color="primary"
            type="submit"
          >
            <Typography variant="button" color="white" fontWeight="bold">
              Enviar solicitud
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DoctorFormDialog;

import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import type { ProfessionalFileProps } from "../../interface";

import { useAppSelector } from "../../../../hooks/redux";
import useDialog from "../../../../hooks/useDialog";
import { selectId } from "../../../../features/auth/selectors";

import { getPatientsAssignedRequest } from "../../../../api/doctor/get";
import { assignFileToPatientRequest } from "../../../../api/file/post";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = yup.object({
  patientIds: yup.array().of(yup.number()).min(1, "Debe seleccionar al menos un paciente"),
});

interface AssignFileDialogProps {
  file: ProfessionalFileProps | null;
  open: boolean;
  onClose: () => void;
}

type Payload = {
  patients: Array<number>;
  exclusive: boolean;
  doctorID: number;
};

function AssignFileDialog({ file, open, onClose }: AssignFileDialogProps) {
  const id = useAppSelector(selectId);
  const { showSuccess, showError } = useDialog();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-patients", id],
    queryFn: () => getPatientsAssignedRequest(id),
  });
  const assignFileToPatientMutation = useMutation<object, Error, Payload>({
    mutationFn: (data) => assignFileToPatientRequest(file ? file.id : -1, data),
    onSuccess: () => {
      showSuccess({
        title: "Operación exitosa",
        content: "Se asignó el archivo correctamente",
      });
    },
    onError: (error) => {
      showError({
        title: "Error al editar archivo",
        content: error.message,
      });
    },
  });
  const formik = useFormik<{ patientIds: Array<number> }>({
    initialValues: {
      patientIds: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!file) return;
      setSubmitting(true);
      const data: Payload = {
        patients: values.patientIds,
        exclusive: false,
        doctorID: id,
      };
      assignFileToPatientMutation.mutate(data);
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

  const formattedPatients = data.patients.map(
    (patient: { id: number; first_name: string; last_name: string }) => ({
      label: `${patient.first_name} ${patient.last_name}`,
      value: patient.id,
    })
  );

  const renderSelected = (selectedIds: Array<number>) => {
    if (!selectedIds || selectedIds.length === 0) return "";
    const labels = selectedIds
      .map((id) => formattedPatients.find((p: { label: string; value: number }) => p.value === id))
      .filter(Boolean)
      .map((p) => p.label);
    return labels.join(", ");
  };
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
            <Stack direction="column" spacing={3} alignItems="center">
              <Box bgcolor="#4476B51A" p={1} borderRadius="4px">
                <UploadFileIcon
                  color="primary"
                  sx={{
                    fontSize: 35,
                  }}
                />
              </Box>
              <Typography textAlign="center" display="flex" flexWrap="wrap" variant="h6">
                Asigna {`"${file ? file.article_name : ""}"`} a tu pacientes
              </Typography>
            </Stack>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            py: 2,
            px: 4,
          }}
        >
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Seleccione los pacientes</InputLabel>
            <Select
              id="patientIds"
              multiple
              value={formik.values.patientIds}
              onChange={(e) => {
                formik.setFieldValue("patientIds", e.target.value);
              }}
              input={
                <OutlinedInput
                  label="Seleccione los pacientes"
                  sx={{
                    fontSize: "14px",
                    borderRadius: "8px",
                    backgroundColor: "#F7F7F7",
                  }}
                />
              }
              renderValue={renderSelected}
              MenuProps={MenuProps}
            >
              {formattedPatients.map((patient: { label: string; value: number }) => (
                <MenuItem key={patient.value} value={patient.value}>
                  <Checkbox checked={formik.values.patientIds.indexOf(patient.value) > -1} />
                  <ListItemText primary={patient.label} />
                </MenuItem>
              ))}
            </Select>
            {formik.touched.patientIds && formik.errors.patientIds ? (
              <FormHelperText
                sx={{
                  mt: 1,
                  color: "#950600",
                }}
              >
                {formik.errors.patientIds}
              </FormHelperText>
            ) : null}
            {formik.values.patientIds.length > 0 && (
              <Stack my={1} direction="row" flexWrap="wrap" gap={1} alignItems="center">
                {formik.values.patientIds.map((patientId) => {
                  const patient = formattedPatients.find(
                    (p: { label: string; value: number }) => p.value === patientId
                  );
                  return (
                    <Box
                      key={patientId}
                      px={1}
                      py={1.5}
                      borderRadius="5px"
                      display="flex"
                      justifyContent="center"
                      bgcolor="#4476B51A"
                      onClick={() => {
                        const newPatientIds = formik.values.patientIds.filter((id) => id !== patientId);
                        formik.setFieldValue("patientIds", newPatientIds);
                      }}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#4476B533",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" color="primary" fontWeight="bold" mb={0}>
                          {patient.label}
                        </Typography>
                        <CloseIcon
                          color="primary"
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            )}
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
              Asignar
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AssignFileDialog;

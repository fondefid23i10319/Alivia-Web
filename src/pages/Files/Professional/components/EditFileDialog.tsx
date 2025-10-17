import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import UploadFileIcon from "@mui/icons-material/UploadFile";

import type { ProfessionalFileProps } from "../../interface";

import useDialog from "../../../../hooks/useDialog";

import { updateFileRequest } from "../../../../api/file/patch";

const validationSchema = yup.object({
  name: yup.string().required("Debe ingresar el nombre del archivo"),
});

interface EditFileDialogProps {
  file: ProfessionalFileProps | null;
  open: boolean;
  onClose: () => void;
}

type EditFilePayload = {
  article_name: string;
  text: string;
  type: string;
};

function EditFileDialog({ file, open, onClose }: EditFileDialogProps) {
  const { showSuccess, showError } = useDialog();
  const queryClient = useQueryClient();
  const updateFileMutation = useMutation<object, Error, EditFilePayload>({
    mutationFn: (data) => updateFileRequest(file ? file.id : -1, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      showSuccess({
        title: "Operación exitosa",
        content: "Se edito el archivo correctamente",
      });
    },
    onError: (error) => {
      showError({
        title: "Error al editar archivo",
        content: error.message,
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      name: file ? file.article_name : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!file) return;
      setSubmitting(true);
      const payload = {
        article_name: values.name,
        text: file.text,
        type: file.file_type,
      };
      updateFileMutation.mutate(payload);
      setSubmitting(false);
      onClose();
    },
  });
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
                Estas editando {`"${file ? file.article_name : ""}"`}
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
            <FormLabel
              sx={{
                mb: 1,
                fontSize: "14px",
              }}
            >
              Nombre del archivo
            </FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
            }}
            color="primary"
            type="submit"
          >
            <Typography variant="button" color="white" fontWeight="bold">
              Guardar cambios
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditFileDialog;

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

import { useAppSelector } from "../../../../hooks/redux";
import useDialog from "../../../../hooks/useDialog";
import { selectId } from "../../../../features/auth/selectors";

import { getPresignedUrl } from "../../../../api/file/get";
import { createFileRequest } from "../../../../api/file/post";
import { uploadFileToS3 } from "../../../../api/s3";

const getFileType = (type: string): string => type.split("/").pop() || "pdf";

const validationSchema = yup.object({
  name: yup.string().required("Campo requerido"),
});

interface UploadFileDialogProps {
  file: File | null;
  open: boolean;
  onClose: () => void;
}

type FilePayload = {
  professionalID: number;
  article_name: string;
  text: string;
  file_type: string;
  document: string;
};

function UploadFileDialog({ file, open, onClose }: UploadFileDialogProps) {
  const id = useAppSelector(selectId);
  const { showError, showLoading, hideLoading, showSuccess } = useDialog();
  const queryClient = useQueryClient();

  const createFileMutation = useMutation<object, Error, FilePayload>({
    mutationFn: (data) => createFileRequest(data),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!file) return;
        setSubmitting(true);
        showLoading({
          typeElement: "archivo",
        });
        const name = values.name;
        const fileType = getFileType(file.type);
        const { uploadURL, key } = await getPresignedUrl(name, fileType);
        await uploadFileToS3(uploadURL, file);
        const payload = {
          professionalID: id,
          article_name: name,
          text: "",
          file_type: fileType,
          document: key,
        };
        await createFileMutation.mutateAsync(payload);
        hideLoading();
        queryClient.invalidateQueries({
          queryKey: ["files"],
        });
        showSuccess({
          title: "Operación exitosa",
          content: "Se subió el archivo correctamente",
        });
      } catch (error: unknown) {
        let message = "Ocurrió un error desconocido";
        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === "string") {
          message = error;
        } else if (error && typeof (error as any).message === "string") {
          message = (error as any).message;
        } else {
          try {
            message = JSON.stringify(error);
          } catch {}
        }
        console.error(error);
        hideLoading();
        showError({
          title: "Error al subir archivo",
          content: message,
        });
      } finally {
        hideLoading();
        setSubmitting(false);
        onClose();
      }
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
              <Typography display="flex" textAlign="center" flexWrap="wrap" variant="h6">
                Estas subiendo {`"${file ? file.name : ""}"`}
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
              Subir archivo
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UploadFileDialog;

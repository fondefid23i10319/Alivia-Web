import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function FileUploadZone({
  minHeight = null,
  height = null,
  onFileSelected,
}: {
  minHeight: string | number | null;
  height: string | number | null;
  onFileSelected: (file: File) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <Box
      {...getRootProps()}
      p={3}
      minHeight={minHeight ? minHeight : 280}
      height={height ? height : "100%"}
      borderRadius={2}
      border="4px dashed #4476B5"
      bgcolor={isDragActive ? "#4476B530" : "#4476B514"}
      width="100%"
      display="flex"
      flexDirection="column"
      gap={2}
      justifyContent="center"
      alignItems="center"
      sx={{ cursor: "pointer" }}
    >
      <input {...getInputProps()} />
      <NoteAddIcon sx={{ fontSize: 48 }} color="primary" />
      <Typography gutterBottom color="primary" textAlign="center" variant="subtitle2" fontWeight="bold">
        {isDragActive ? "Suelta el archivo aquí" : "Selecciona un archivo o arrástralo aquí"}
      </Typography>
    </Box>
  );
}

export default FileUploadZone;

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import FileCard from "./components/FileCard";
import FileUploadZone from "../../../components/FileUploadZone";

import type { ProfessionalFileProps } from "../interface";

import AssignFileDialog from "./components/AssignFileDialog";
import EditFileDialog from "./components/EditFileDialog";
import UploadFileDialog from "./components/UploadFileDialog";

import useDialog from "../../../hooks/useDialog";

import { getFilesRequest } from "../../../api/file/get";
import { deleteFileByIdRequest } from "../../../api/file/delete";

const filters = [
  { id: 1, label: "Todos", value: "all" },
  { id: 2, label: "PDF", value: "pdf" },
  { id: 3, label: "Vídeos", value: "videos" },
];

const VIDEO_EXTENSIONS = ["mp4", "mov", "avi", "mkv", "webm"];

const isVideo = (fileType: string | null) => {
  if (!fileType) return false;
  return VIDEO_EXTENSIONS.includes(String(fileType).toLowerCase());
};

function Professional() {
  const queryClient = useQueryClient();
  const { showDelete, showError, showSuccess, hideDelete } = useDialog();
  const {
    data: files,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["files"],
    queryFn: () => getFilesRequest(),
  });

  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClickOpenUploadFileDialog = () => setOpenUploadFileDialog(true);
  const handleCloseUploadFileDialog = () => setOpenUploadFileDialog(false);

  const handleFileSelected = (file: File) => {
    setFileToUpload(file);
    handleClickOpenUploadFileDialog();
  };

  const [selectedFile, setSelectedFile] = useState<ProfessionalFileProps | null>(null);

  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  const handleOpenAssignDialog = (file: ProfessionalFileProps) => {
    setSelectedFile(file);
    setOpenAssignDialog(true);
  };
  const handleCloseAssignDialog = () => setOpenAssignDialog(false);

  const deleteFileMutation = useMutation({
    mutationFn: (fileId: number) => deleteFileByIdRequest(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      showSuccess({
        title: "Operación exitosa",
        content: "Se eliminó el archivo correctamente",
      });
    },
    onError: (error) => {
      showError({
        title: "Error al eliminar archivo",
        content: error.message,
      });
    },
  });

  const handleDeleteFile = (file: ProfessionalFileProps) => {
    showDelete({
      title: `Eliminar archivo "${file.article_name}"`,
      content: "¿Estás seguro que deseas eliminar este archivo? Esta acción no se puede deshacer.",
      onClick: () => {
        deleteFileMutation.mutate(file.id);
        hideDelete();
      },
    });
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleOpenEditDialog = (file: ProfessionalFileProps) => {
    setSelectedFile(file);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => setOpenEditDialog(false);

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

  const filteredFiles = files.filter((file: ProfessionalFileProps) => {
    const matchesSearch = file.article_name.toLowerCase().includes(searchQuery.toLowerCase());
    if (currentFilter === "all") {
      return matchesSearch;
    }
    if (currentFilter === "pdf") {
      return !isVideo(file.file_type) && matchesSearch;
    }
    if (currentFilter === "videos") {
      return isVideo(file.file_type) && matchesSearch;
    }
    return true;
  });

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          placeholder="Escribe el nombre del archivo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
          sx={{
            width: "40%",
            "& .MuiOutlinedInput-root": { borderRadius: "24px", backgroundColor: "white" },
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center">
          {filters.map((filter) => {
            const active = currentFilter === filter.value;
            return (
              <Box
                key={filter.id}
                onClick={() => setCurrentFilter(filter.value)}
                p={2}
                display="flex"
                justifyContent="center"
                borderRadius="100px"
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  backgroundColor: active ? "#4476B5" : "#E9E9E9",
                }}
              >
                <Typography variant="subtitle2" fontWeight={500} color="white" mb={0}>
                  {filter.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FileUploadZone minHeight={250} height="100%" onFileSelected={handleFileSelected} />
        </Grid>

        {filteredFiles.length > 0 ? (
          filteredFiles.map((file: ProfessionalFileProps) => (
            <Grid key={file.id} size={{ xs: 12, md: 4 }}>
              <FileCard
                file={file}
                onAssign={handleOpenAssignDialog}
                onDelete={handleDeleteFile}
                onEdit={handleOpenEditDialog}
              />
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4">No se encontraron archivos</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <AssignFileDialog file={selectedFile} open={openAssignDialog} onClose={handleCloseAssignDialog} />
      <EditFileDialog file={selectedFile} open={openEditDialog} onClose={handleCloseEditDialog} />
      <UploadFileDialog file={fileToUpload} open={openUploadFileDialog} onClose={handleCloseUploadFileDialog} />
    </React.Fragment>
  );
}

export default Professional;

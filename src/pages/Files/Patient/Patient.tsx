import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import FileCard from "./components/FileCard";

import type { PatientFileProps } from "../interface";

import { useAppSelector } from "../../../hooks/redux";
import { selectId } from "../../../features/auth/selectors";

import { getFilesByPatientIdRequest } from "../../../api/file/get";

const filters = [
  { id: 1, label: "Todos", value: "all" },
  { id: 2, label: "PDF", value: "pdf" },
  { id: 3, label: "Vídeos", value: "videos" },
];

const VIDEO_EXTENSIONS = ["mp4", "mov", "avi", "mkv", "webm"];

const isVideo = (fileType: string): boolean => {
  return VIDEO_EXTENSIONS.includes(String(fileType).toLowerCase());
};

function Patient() {
  const id = useAppSelector(selectId);
  const {
    data: files,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-files", id],
    queryFn: () => getFilesByPatientIdRequest(id),
  });

  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredFiles = files.articles.filter((file: PatientFileProps) => {
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
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file: PatientFileProps) => (
            <Grid key={file.id} size={{ xs: 12, md: 4 }}>
              <FileCard file={file} />
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
    </React.Fragment>
  );
}

export default Patient;

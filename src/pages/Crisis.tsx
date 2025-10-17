import React from "react";
import { useQuery } from "@tanstack/react-query";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES as coreEsES } from "@mui/material/locale";
import { esES as dataGridEsES } from "@mui/x-data-grid/locales";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { useAppSelector } from "../hooks/redux";
import { selectId } from "../features/auth/selectors";

import { getCrisisOfPatients } from "../api/doctor/get";

const theme = createTheme(coreEsES, dataGridEsES);

type LogApiProps = {
  id: number;
  receiverID: number;
  alert: boolean;
  read: boolean;
  first_name_sender: string;
  last_name_sender: string;
  content: number;
  createdAt: string;
};

function Crisis() {
  const id = useAppSelector(selectId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["crisis", id],
    queryFn: () => getCrisisOfPatients(id),
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

  return <div>Implementar</div>;
}

export default Crisis;

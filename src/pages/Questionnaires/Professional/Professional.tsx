import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import type { ProfessionalQuestionnaireProps } from "../interface";

import { getQuestionnairesRequest } from "../../../api/questionnaire/get";

import QuestionnaireCard from "./components/QuestionnaireCard";

function Patient() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["questionnaires"],
    queryFn: () => getQuestionnairesRequest(),
  });
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

  console.log("data", data);

  const filteredQuestionnaires = data.filter(
    (questionnaire: {
      active: boolean;
      creator: string;
      createdAt: string;
      id: number;
      questionary_name: string;
    }) => questionnaire.active
  );
  return (
    <React.Fragment>
      <TextField
        placeholder="Escribe el nombre del cuestionario..."
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
          mb: 3,
          width: "40%",
          "& .MuiOutlinedInput-root": { borderRadius: "24px", backgroundColor: "white" },
        }}
      />
      <Grid container spacing={2}>
        {filteredQuestionnaires.length > 0 ? (
          filteredQuestionnaires.map((questionnaire: ProfessionalQuestionnaireProps) => (
            <Grid key={questionnaire.id} size={{ xs: 12, md: 4 }}>
              <QuestionnaireCard questionnaire={questionnaire} />
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4">No se encontraron cuestionarios</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default Patient;

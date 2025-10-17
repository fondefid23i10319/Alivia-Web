import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import type { PatientQuestionnaireProps } from "../interface";

import { useAppSelector } from "../../../hooks/redux";
import { selectId } from "../../../features/auth/selectors";

import { getReportsByPatientIdRequest } from "../../../api/report/get";
import QuestionnaireCard from "./components/QuestionnaireCard";

function Patient() {
  const id = useAppSelector(selectId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reports", id],
    queryFn: () => getReportsByPatientIdRequest(id),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const formatQuestionnaires = (
    reports: {
      id: number;
      questionary: {
        id: number;
        questionary_name: string;
      };
      active: boolean;
      answers: [];
      createdAt: string;
    }[]
  ) => {
    const filterReports = reports.filter(
      (report) => report.questionary !== null && report.active && !report.answers
    );

    const formattedQuestionnaires = filterReports.map((report) => ({
      id: report.id,
      questionnaireId: report.questionary.id,
      name: report.questionary.questionary_name,
      createdAt: report.createdAt,
    }));

    return formattedQuestionnaires;
  };
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
  const formattedQuestionnaires = formatQuestionnaires(data);

  const filteredQuestionnaires = formattedQuestionnaires.filter((questionnaire: PatientQuestionnaireProps) => {
    const matchesSearch = questionnaire.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
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
          filteredQuestionnaires.map((questionnaire: PatientQuestionnaireProps) => (
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

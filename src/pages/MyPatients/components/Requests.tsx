import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment-timezone";

const userTz = "America/Santiago";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES as coreEsES } from "@mui/material/locale";
import { esES as dataGridEsES } from "@mui/x-data-grid/locales";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { selectId } from "../../../features/auth/selectors";
import { useAppSelector } from "../../../hooks/redux";

import { getPatientRequestsToDoctorRequest } from "../../../api/doctor/get";

const theme = createTheme(coreEsES, dataGridEsES);

function Requests() {
  const id = useAppSelector(selectId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["requests", id],
    queryFn: () => getPatientRequestsToDoctorRequest(id),
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

  console.log("data", data);

  const rows: GridRowsProp = data.requests.map(
    (request: {
      id: number;
      createdAt: string;
      patient: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
      };
    }) => ({
      id: request.id,
      name: `${request.patient.first_name} ${request.patient.last_name}`,
      email: request.patient.email,
      createdAt: request.createdAt,
    })
  );

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Fecha de Envío",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueFormatter: (value: string | null) => (value ? moment(value).tz(userTz).format("DD-MM-YYYY") : "-"),
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (
        params: GridRenderCellParams<
          any,
          {
            id: number;
            name: string;
            status: string;
            responseDate: string;
            specialty: string;
          }
        >
      ) => {
        const row = params.row;

        return (
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#35A0001A",
              }}
              size="small"
              startIcon={
                <HowToRegIcon
                  sx={{
                    color: "#35A000",
                  }}
                />
              }
            >
              <Typography variant="button" color="#35A000" fontWeight="bold">
                Aceptar
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D828211A",
              }}
              size="small"
              startIcon={
                <DeleteIcon
                  sx={{
                    color: "#D82821",
                  }}
                />
              }
            >
              <Typography variant="button" color="#D82821" fontWeight="bold">
                Eliminar
              </Typography>
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-start" p={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to={`/my-patients`}
        >
          <Typography variant="button" color="white" fontSize="14px" fontWeight="bold">
            Volver
          </Typography>
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "20px" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            sx={{
              maxHeight: 530,
              borderRadius: "20px",
              "& .MuiDataGrid-footerContainer": {
                justifyContent: "center",
              },
              "& .MuiTablePagination-root": {
                display: "flex",
                justifyContent: "center",
              },
              "& .MuiTablePagination-toolbar": {
                justifyContent: "center",
              },
            }}
          />
        </ThemeProvider>
      </Paper>
    </React.Fragment>
  );
}

export default Requests;

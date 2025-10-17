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
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BlockIcon from "@mui/icons-material/Block";
import SellIcon from "@mui/icons-material/Sell";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useAppSelector } from "../../hooks/redux";
import { selectId } from "../../features/auth/selectors";

import { getPatientsAssignedRequest } from "../../api/doctor/get";

const theme = createTheme(coreEsES, dataGridEsES);

function MyPatients() {
  const id = useAppSelector(selectId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-patients", id],
    queryFn: () => getPatientsAssignedRequest(id),
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

  const rows: GridRowsProp = data.patients.map(
    (patient: { id: number; first_name: string; last_name: string; rut: string; dob: string }) => ({
      id: patient.id,
      name: `${patient.first_name} ${patient.last_name}`,
      rut: patient.rut,
      dob: patient.dob,
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
      field: "rut",
      headerName: "Rut",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "dob",
      headerName: "Fecha de Nacimiento",
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
            rut: string;
            dob: string;
          }
        >
      ) => {
        const row = params.row;

        return (
          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3D3D3D1A",
              }}
              size="small"
              component={RouterLink}
              to={`${row.id}/diagnosis`}
              startIcon={
                <VisibilityIcon
                  sx={{
                    color: "#484848",
                  }}
                />
              }
            >
              <Typography variant="button" color="#484848" fontWeight="bold">
                Ver
              </Typography>
            </Button>
            <IconButton
              sx={{
                backgroundColor: "#D828211A",
                borderRadius: "5px",
              }}
            >
              <BlockIcon
                sx={{
                  color: "#D82821",
                }}
              />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            color="primary"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
            size="large"
            startIcon={<SellIcon />}
          >
            <Typography
              variant="button"
              color="primary"
              fontSize="14px"
              fontWeight="bold"
              sx={{
                borderRadius: "4px",
              }}
            >
              Etiquetas de los pacientes
            </Typography>
          </Button>
          <Button variant="contained" color="primary" size="large" component={RouterLink} to={`requests`}>
            <Typography variant="button" color="white" fontSize="14px" fontWeight="bold">
              Solicitudes de pacientes
            </Typography>
          </Button>
        </Stack>
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

export default MyPatients;

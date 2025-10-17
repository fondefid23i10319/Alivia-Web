import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";

const userTz = "America/Santiago";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES as coreEsES } from "@mui/material/locale";
import { esES as dataGridEsES } from "@mui/x-data-grid/locales";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { getReportsByPatientIdRequest } from "../../../../api/report/get";

const theme = createTheme(coreEsES, dataGridEsES);

function Content({ patientId }: { patientId: number }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reports", patientId],
    queryFn: () => getReportsByPatientIdRequest(patientId),
  });

  const formatQuestionnaires = (
    reports: {
      id: number;
      questionary: {
        id: number;
        questionary_name: string;
      };
      active: boolean;
      answers: [];
    }[]
  ) => {
    const filterReports = reports.filter((report) => report.questionary !== null);

    const formattedQuestionnaires = filterReports.map((report) => ({
      id: report.id,
      questionnaireId: report.questionary.id,
      name: report.questionary.questionary_name,
      isAnswered: report.answers ? true : false,
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

  const rows: GridRowsProp = [
    {
      id: 1,
      name: "Cuestionario 1",
      status: "Por responder",
      responseDate: new Date().toUTCString(),
      specialty: "Medicina Familiar",
    },
    {
      id: 2,
      name: "Cuestionario 2",
      status: "Respondido",
      responseDate: new Date().toUTCString(),
      specialty: "Kinesiología",
    },
    {
      id: 3,
      name: "Cuestionario 3",
      status: "Por responder",
      responseDate: new Date().toUTCString(),
      specialty: "Fonoaudiología",
    },
    {
      id: 4,
      name: "Random",
      status: "Por responder",
      responseDate: new Date().toUTCString(),
      specialty: "Kinesiología",
    },
    {
      id: 5,
      name: "Cuestionario 5",
      status: "Respondido",
      responseDate: new Date().toUTCString(),
      specialty: "Medicina Familiar",
    },
    {
      id: 6,
      name: "Cuestionario 6",
      status: "Respondido",
      responseDate: new Date().toUTCString(),
      specialty: "Medicina Familiar",
    },
    {
      id: 7,
      name: "Cuestionario 7",
      status: "Por responder",
      responseDate: new Date().toUTCString(),
      specialty: "Medicina Familiar",
    },
    {
      id: 8,
      name: "Cuestionario 8",
      status: "Por responder",
      responseDate: new Date().toUTCString(),
      specialty: "Fonoaudiología",
    },
    {
      id: 9,
      name: "Cuestionario 9",
      status: "Respondido",
      responseDate: new Date().toUTCString(),
      specialty: "Fonoaudiología",
    },
    {
      id: 10,
      name: "Cuestionario 10",
      status: "Respondido",
      responseDate: new Date().toUTCString(),
      specialty: "Medicina Familiar",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estado",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
        const bgColor = row.status === "Por responder" ? "#DE90001A" : "#35A0001A";
        const textColor = row.status === "Por responder" ? "#DE9000" : "#35A000";
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
              bgcolor={bgColor}
              borderRadius="5px"
              mt={1}
            >
              <Typography variant="body2" fontWeight="bold" color={textColor}>
                {row.status}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "responseDate",
      headerName: "Fecha de Respuesta",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueFormatter: (value: string | null) => (value ? moment(value).tz(userTz).format("DD-MM-YYYY") : "-"),
    },
    {
      field: "specialty",
      headerName: "Especialidad",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
        const bgColor = row.status === "Por responder" ? "#4476B51A" : "#3D3D3D1A";
        const text = row.status === "Por responder" ? "Responder" : "Ver";
        const textColor = row.status === "Por responder" ? "#4476B5" : "#484848";
        const buttonIcon =
          row.status === "Por responder" ? (
            <CheckIcon
              sx={{
                color: textColor,
              }}
            />
          ) : (
            <VisibilityIcon
              sx={{
                color: textColor,
              }}
            />
          );
        const handleOpen = (e: React.MouseEvent) => {
          e.stopPropagation();
          console.log("Abrir reporte", row.id);
        };

        return (
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: bgColor,
              }}
              size="small"
              onClick={handleOpen}
              startIcon={buttonIcon}
            >
              <Typography variant="button" color={textColor} fontWeight="bold">
                {text}
              </Typography>
            </Button>
          </div>
        );
      },
    },
  ];

  const formattedQuestionnaires = formatQuestionnaires(data);

  return (
    <Box py={0.5}>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "20px" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            sx={{
              maxHeight: 520,
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
    </Box>
  );
}

export default Content;

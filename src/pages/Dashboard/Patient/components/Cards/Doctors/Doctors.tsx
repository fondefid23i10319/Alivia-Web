import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SchoolIcon from "@mui/icons-material/School";

import DoctorFormDialog from "./components/DoctorFormDialog";

import { useAppSelector } from "../../../../../../hooks/redux";
import { selectId } from "../../../../../../features/auth/selectors";

import { getDoctorsByPatientIdRequest } from "../../../../../../api/patient/get";

function Doctors() {
  const theme = useTheme();
  const id = useAppSelector(selectId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["assigned-doctors", id],
    queryFn: () => getDoctorsByPatientIdRequest(id),
  });

  const [openDoctorFormDialog, setOpenDoctorFormDialog] = useState(false);

  const handleClickOpenDoctorFormDialog = () => {
    setOpenDoctorFormDialog(true);
  };

  const handleCloseDoctorFormDialog = () => {
    setOpenDoctorFormDialog(false);
  };

  const formatDoctors = (
    doctors: { id: number; first_name: string; last_name: string; specialty_name: string }[]
  ) => {
    return doctors.map((doctor) => ({
      id: doctor.id,
      name: `${doctor.first_name} ${doctor.last_name}`,
      specialty: doctor.specialty_name,
    }));
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

  const doctors = formatDoctors(data.attendants);
  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        bgcolor={`${theme.palette.background.paper}`}
        borderRadius="24px"
        py={2}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        border={`1px solid ${theme.palette.divider}`}
        width="100%"
      >
        <Stack direction="row" spacing={1} alignItems="center" px={2}>
          <SchoolIcon
            sx={{
              fontSize: "1.2rem",
            }}
            color="primary"
          />
          <Typography variant="subtitle2">Profesionales Tratantes</Typography>
        </Stack>
        <Box display="flex" justifyContent="center" bgcolor="#FAFAFA">
          {doctors.length > 0 ? (
            <List
              sx={{
                width: "100%",
                maxHeight: 150,
                overflow: "auto",
              }}
              dense
            >
              {doctors.map((doctor, index) => (
                <React.Fragment key={doctor.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Stack component="span" direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="body2">{doctor.name}</Typography>
                          <Typography>-</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {doctor.specialty || "Especialidad no especificada"}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < doctors.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary" p={2}>
              No tienes profesionales tratantes asignados.
            </Typography>
          )}
        </Box>
        <Box display="flex" justifyContent="flex-start" px={2} py={0}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ borderRadius: "4px" }}
            onClick={handleClickOpenDoctorFormDialog}
          >
            <Typography variant="button" color="white" fontWeight="bold">
              Agregar profesional
            </Typography>
          </Button>
        </Box>
      </Box>
      <DoctorFormDialog open={openDoctorFormDialog} onClose={handleCloseDoctorFormDialog} />
    </React.Fragment>
  );
}

export default Doctors;

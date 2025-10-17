import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import CrisisAlertFormDialog from "./components/CrisisAlertFormDialog";
import NotificationsDialog from "./components/NotificationsDialog";

import { useAppSelector } from "../../../../../hooks/redux";
import { selectUser, selectId } from "../../../../../features/auth/selectors";

import { getNotificationsByPatientIdRequest } from "../../../../../api/notification/get";

interface HeaderProps {
  selfReportIsAnswered: boolean;
  onClickOpenSelfReportDialog: () => void;
  crisisAlertIsActivated: boolean;
}

function Header({ selfReportIsAnswered, onClickOpenSelfReportDialog, crisisAlertIsActivated }: HeaderProps) {
  const user = useAppSelector(selectUser);
  const id = useAppSelector(selectId);
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["assigned-notifications", id],
    queryFn: () => getNotificationsByPatientIdRequest(id),
  });

  const [openCrisisAlertDialog, setOpenCrisisAlertDialog] = useState(false);

  const handleClickOpenCrisisAlertDialog = () => {
    setOpenCrisisAlertDialog(true);
  };

  const handleCloseCrisisAlertDialog = () => {
    setOpenCrisisAlertDialog(false);
  };

  const [openNotificationsDialog, setOpenNotificationsDialog] = useState(false);

  const handleClickOpenNotificationsDialog = () => {
    setOpenNotificationsDialog(true);
  };

  const handleCloseNotificationsDialog = () => {
    setOpenNotificationsDialog(false);
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
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6" fontSize="30px" fontWeight="bold">
                👋 Buenos días, {user?.fullName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {selfReportIsAnswered ? (
                <CheckCircleOutlineIcon
                  sx={{
                    color: "#008B52",
                  }}
                />
              ) : (
                <HighlightOffIcon
                  sx={{
                    color: "#F5222D",
                  }}
                />
              )}
              <Typography variant="subtitle1" color="textSecondary">
                {selfReportIsAnswered ? "Autorreporte del día completado" : "No has completado tu autorreporte"}
              </Typography>
            </Stack>
          </Stack>
          <Tooltip title="Notificaciones" arrow>
            <Badge badgeContent={notifications.length} color="error">
              <IconButton sx={{ backgroundColor: "#4476B51A" }} onClick={handleClickOpenNotificationsDialog}>
                {notifications.length > 0 ? (
                  <NotificationsActiveIcon
                    color="primary"
                    sx={{
                      fontSize: 35,
                    }}
                  />
                ) : (
                  <NotificationsIcon color="primary" sx={{ fontSize: 35 }} />
                )}
              </IconButton>
            </Badge>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            color="primary"
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
            startIcon={<ListAltIcon />}
            onClick={onClickOpenSelfReportDialog}
          >
            <Typography variant="button" color="primary" fontWeight="bold">
              Autorreporte
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: "8px",
            }}
            startIcon={<ReportProblemIcon />}
            disabled={crisisAlertIsActivated}
            onClick={handleClickOpenCrisisAlertDialog}
          >
            <Typography variant="button" color="white" fontWeight="bold">
              Reportar una Crisis
            </Typography>
          </Button>
        </Stack>
      </Box>
      <NotificationsDialog
        data={notifications}
        open={openNotificationsDialog}
        onClose={handleCloseNotificationsDialog}
      />
      <CrisisAlertFormDialog open={openCrisisAlertDialog} onClose={handleCloseCrisisAlertDialog} />
    </React.Fragment>
  );
}

export default Header;

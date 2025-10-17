import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import HelpIcon from "@mui/icons-material/Help";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NotificationsIcon from "@mui/icons-material/Notifications";

function getIcon(type: string) {
  switch (type) {
    case "task":
      return <EditCalendarIcon />;
    case "report":
      return <HelpIcon />;
    default:
      return <InsertDriveFileIcon />;
  }
}

function getBackGroundColor(type: string) {
  switch (type) {
    case "task":
      return "#35A0001A";
    case "report":
      return "#DE90001A";
    default:
      return "#4476B51A";
  }
}

function getTextColor(type: string) {
  switch (type) {
    case "task":
      return "#35A000";
    case "report":
      return "#DE9000";
    default:
      return "#4476B5";
  }
}

function getLabel(type: string) {
  switch (type) {
    case "task":
      return "Te han asignado una nueva tarea";
    case "report":
      return "Te han asignado un nuevo cuestionario";
    default:
      return "Te han asignado un nuevo archivo";
  }
}

function getLinkText(type: string) {
  switch (type) {
    case "task":
      return "Ir a ver el detalle";
    case "report":
      return "Ir a responderlo";
    default:
      return "Ir a verlo";
  }
}

function getPath(notification: { type: string; elementId: number | null }) {
  switch (notification.type) {
    case "task":
      return "/diagnosis/tasks";
    case "report":
      return `/questionnaires/${notification.elementId}/answer`;
    default:
      return "/files";
  }
}

type Notification = {
  id: number;
  type: string;
  patientTask?: { done: boolean };
  report?: { id: number };
};

interface NotificationsDialogProps {
  data: Notification[];
  open: boolean;
  onClose: () => void;
}

function NotificationsDialog({ data, open, onClose }: NotificationsDialogProps) {
  const formattedNotifications = data.map((notification) => {
    if (notification.type === "task") {
      return {
        id: notification.id,
        type: notification.type,
        state: notification.patientTask && !notification.patientTask.done,
        elementId: null,
      };
    } else if (notification.type === "report") {
      return {
        id: notification.id,
        type: notification.type,
        state: true,
        elementId: notification.report ? notification.report.id : null,
      };
    } else {
      return {
        id: notification.id,
        type: notification.type,
        state: true,
        elementId: null,
      };
    }
  });

  const filteredNotifications = formattedNotifications.filter((notification) => notification.state);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center" m={0}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <NotificationsIcon color="primary" sx={{ fontSize: 28 }} />
          <Stack direction="column" spacing={0.5}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Notificaciones
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Aquí puedes ver todas tus notificaciones recientes.
            </Typography>
          </Stack>
        </Stack>
        <IconButton
          sx={{
            "&:hover": {
              borderRadius: "50%",
              backgroundColor: "#3D3D3D33",
            },
            color: "#3D3D3D",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
        }}
        dividers
      >
        {filteredNotifications.length > 0 ? (
          <List
            sx={{
              width: "95%",
              pl: 3,
            }}
          >
            {filteredNotifications.map((notification) => (
              <ListItem
                key={notification.id}
                alignItems="flex-start"
                sx={{
                  backgroundColor: getBackGroundColor(notification.type),
                  mb: 1,
                  borderRadius: "8px",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: "transparent",
                      color: getTextColor(notification.type),
                    }}
                  >
                    {getIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body2">{getLabel(notification.type)}</Typography>}
                  secondary={
                    <Link href={getPath(notification)} underline="always">
                      {getLinkText(notification.type)}
                    </Link>
                  }
                  slotProps={{
                    primary: {
                      mb: 1,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="subtitle1" fontWeight="bold" textAlign="center" m={2}>
            No tienes notificaciones nuevas
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          startIcon={<CancelIcon />}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: "4px",
          }}
        >
          <Typography variant="button" color="error" fontWeight="bold">
            Cancelar
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationsDialog;

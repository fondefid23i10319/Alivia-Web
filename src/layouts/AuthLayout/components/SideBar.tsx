import React from "react";
import { NavLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { selectIsPatient, selectUser } from "../../../features/auth/selectors";
import { logout } from "../../../features/auth/authSlice";

import { APPBAR_HEIGHT, DRAWER_WIDTH, PAGE_GAP } from "../constants";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const patientItems = [
  {
    id: 1,
    label: "Inicio",
    path: "/dashboard",
    icon: <SpaceDashboardIcon />,
  },
  {
    id: 2,
    label: "Mi diagnóstico",
    path: "/diagnosis",
    icon: <FactCheckOutlinedIcon />,
  },
  {
    id: 3,
    label: "Archivos",
    path: "/files",
    icon: <FolderOutlinedIcon />,
  },
  {
    id: 4,
    label: "Cuestionarios",
    path: "/questionnaires",
    icon: <HelpOutlineOutlinedIcon />,
  },
  {
    id: 5,
    label: "Mensajería",
    path: "/messaging",
    icon: <MessageOutlinedIcon />,
  },
];

const professionalItems = [
  {
    id: 1,
    label: "Inicio",
    path: "/dashboard",
    icon: <SpaceDashboardIcon />,
  },
  {
    id: 2,
    label: "Mis pacientes",
    path: "/my-patients",
    icon: <PeopleOutlineOutlinedIcon />,
  },
  {
    id: 3,
    label: "Crisis",
    path: "/crisis",
    icon: <CrisisAlertOutlinedIcon />,
  },
  {
    id: 4,
    label: "Archivos",
    path: "/files",
    icon: <FolderOutlinedIcon />,
  },
  {
    id: 5,
    label: "Cuestionarios",
    path: "/questionnaires",
    icon: <HelpOutlineOutlinedIcon />,
  },
  {
    id: 6,
    label: "Tareas",
    path: "/tasks",
    icon: <TaskOutlinedIcon />,
  },
  {
    id: 7,
    label: "Mensajería",
    path: "/messaging",
    icon: <MessageOutlinedIcon />,
  },
  {
    id: 8,
    label: "Mi Cuenta",
    path: "/account",
    icon: <PermIdentityIcon />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isPatient = useAppSelector(selectIsPatient);
  const topOffset = PAGE_GAP + APPBAR_HEIGHT + 16;
  const items = isPatient ? patientItems : professionalItems;
  const drawerContent = (
    <Box sx={{ width: DRAWER_WIDTH, px: 1 }}>
      <Toolbar />
      <Stack direction="column" spacing={2} alignItems="center" mb={1}>
        <Avatar sx={{ width: 75, height: 75 }}>
          <PersonIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Stack direction="column" spacing={0} alignItems="center">
          <Typography variant="h6">{user?.fullName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {user?.email}
          </Typography>
        </Stack>
      </Stack>
      <List>
        {items.map((item) => (
          <ListItem disablePadding key={item.id}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: "#4476B51A",
                  borderRadius: "4px",
                  "& .MuiListItemIcon-root, & .MuiTypography-root": {
                    color: "primary.main",
                    fontWeight: "medium",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  "&.MuiListItemIcon-root": {
                    minWidth: 34,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: { variant: "body1" },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 4 }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(logout());
            }}
          >
            <ListItemIcon
              sx={{
                "&.MuiListItemIcon-root": {
                  minWidth: 34,
                },
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar Sesión"
              slotProps={{
                primary: { variant: "body1" },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            left: `${PAGE_GAP}px`,
            top: `${topOffset}px`,
            height: `calc(100% - ${topOffset + PAGE_GAP}px)`,
            borderRadius: 4,
            overflow: "auto",
            overflowX: "hidden",
            boxShadow: "0 6px 18px rgba(17,17,17,0.06)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            left: `${PAGE_GAP}px`,
            top: `${topOffset}px`,
            height: `calc(100% - ${topOffset + PAGE_GAP}px)`,
            borderRadius: 4,
            overflow: "auto",
            overflowX: "hidden",
            boxShadow: "0 6px 18px rgba(17,17,17,0.06)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;

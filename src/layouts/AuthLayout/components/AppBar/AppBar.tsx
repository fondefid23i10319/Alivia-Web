import { useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Actions from "./components/Actions";

import { PAGE_GAP, APPBAR_HEIGHT } from "../../constants";

interface Props {
  onMenuClick: () => void;
}

function AppBar({ onMenuClick }: Props) {
  const navigate = useNavigate();

  return (
    <MuiAppBar
      position="fixed"
      color="default"
      elevation={2}
      sx={{
        top: `${PAGE_GAP}px`,
        left: `${PAGE_GAP}px`,
        width: `calc(100% - ${PAGE_GAP * 2}px)`,
        height: `${APPBAR_HEIGHT}px`,
        bgcolor: "white",
        borderRadius: 4,
        zIndex: (theme) => theme.zIndex.drawer + 10,
        boxShadow: "0 6px 18px rgba(17,17,17,0.08)",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          px: 1,
          minHeight: `${APPBAR_HEIGHT}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: { xs: "block", lg: "none" }, mr: 1 }}>
          <IconButton color="primary" aria-label="open drawer" onClick={onMenuClick} edge="start" size="large">
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          component="img"
          src="/src/assets/images/logo-uc-christus.png"
          alt="UC-Christus"
          height={40}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Actions />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;

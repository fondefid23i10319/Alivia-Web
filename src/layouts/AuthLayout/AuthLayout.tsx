import { useState } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import AppBar from "./components/AppBar";
import Sidebar from "./components/SideBar";

import { APPBAR_HEIGHT, DRAWER_WIDTH, PAGE_GAP } from "./constants";

function AuthLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const contentTopOffset = PAGE_GAP + APPBAR_HEIGHT + 12;
  return (
    <Box sx={{ display: "flex", bgcolor: "#f7f7f7" }}>
      <AppBar onMenuClick={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          px: `${PAGE_GAP}px`,
          py: `${PAGE_GAP}px`,
          pt: `${contentTopOffset}px`,
          ml: { lg: `${DRAWER_WIDTH + PAGE_GAP}px` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AuthLayout;

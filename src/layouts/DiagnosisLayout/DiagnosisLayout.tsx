import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { sections } from "./constants";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function getSectionLink(origin: string, path: string) {
  return path === "information" ? `${origin}` : `${origin}/${path}`;
}

function DiagnosisLayout({ origin }: { origin: string }) {
  return (
    <React.Fragment>
      <Stack direction="row" spacing={2} alignItems="center" my={2}>
        {sections.map((section) => {
          const to = getSectionLink(origin, section.path);
          const isIndex = section.path === "information";

          return (
            <Box
              key={section.id}
              component={NavLink}
              to={to}
              end={isIndex}
              sx={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                px: 2,
                py: 1.5,
                borderRadius: "100px",
                cursor: "pointer",
                userSelect: "none",
                bgcolor: (t) => t.palette.action.hover,
                color: (t) => t.palette.text.secondary,
                transition: "all 150ms",
                "&.active, &.active:hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 600,
                },
                "&:hover": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Typography variant="subtitle2" fontWeight={500} color="inherit" mb={0}>
                {section.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <Outlet />
    </React.Fragment>
  );
}

export default DiagnosisLayout;

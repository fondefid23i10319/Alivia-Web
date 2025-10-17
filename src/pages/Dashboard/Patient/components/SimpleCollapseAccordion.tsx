import type { ReactNode } from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SimpleCollapseAccordionProps {
  id: string;
  title: string;
  children: ReactNode;
}

function SimpleCollapseAccordion({ id, title, children }: SimpleCollapseAccordionProps) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((v) => !v);
  return (
    <Box sx={{ backgroundColor: "transparent", width: "100%" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={
            open ? (
              <ExpandMoreIcon
                sx={{
                  color: "#3A3A3A",
                }}
              />
            ) : (
              <ExpandLessIcon
                sx={{
                  color: "#3A3A3A",
                }}
              />
            )
          }
          onClick={handleToggle}
          sx={{
            border: 0.5,
            borderRadius: "8px",
            borderColor: "#E4E4E4",
            backgroundColor: "white",
            alignItems: "center",
            "&focus": { outline: "none" },
            textTransform: "none",
            padding: "6px 12px",
            minWidth: "fit-content",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#F5F5F5",
              borderColor: "#E4E4E4",
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
              backgroundColor: "#E4E4E4",
              borderColor: "#E4E4E4",
            },
          }}
        >
          <Typography fontWeight="bold" variant="body1">
            {open ? "Ocultar" : "Ver más"}
          </Typography>
        </Button>
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box id={`${id}-content`} sx={{ mt: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}

export default SimpleCollapseAccordion;

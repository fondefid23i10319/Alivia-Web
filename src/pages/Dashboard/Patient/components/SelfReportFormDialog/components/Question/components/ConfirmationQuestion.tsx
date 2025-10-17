import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";

import renderOptionImagePath from "../utils/renderOptionImagePath";
import renderOptionLabel from "../utils/renderOptionLabel";
import getPalette from "../utils/getPalette";

interface ConfirmationQuestionProps {
  typeMetric: string;
  title: string;
  options: Array<number>;
  value: number | null;
  onChange: (value: number) => void;
}

function ConfirmationQuestion({
  typeMetric = "confirmation",
  title = "",
  options = [0, 1],
  value = null,
  onChange = () => {},
}: ConfirmationQuestionProps) {
  const theme = useTheme();
  const pal = getPalette(typeMetric);
  const [selected, setSelected] = useState(value ?? null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  const handleSelect = (opt: number) => {
    setSelected(opt);
    onChange(opt);
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" gap={2}>
      {title && (
        <Typography variant="h6" textAlign="center" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
        {options.map((opt) => {
          const img = renderOptionImagePath("confirmation", opt);
          const label = renderOptionLabel("confirmation", opt);
          const isSel = selected === opt;

          return (
            <Paper
              key={opt}
              elevation={isSel ? 6 : 1}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(opt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(opt);
                }
              }}
              aria-pressed={isSel}
              sx={{
                width: 66,
                minWidth: 66,
                height: 66,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                position: "relative",
                cursor: "pointer",
                userSelect: "none",
                bgcolor: isSel ? pal.accent : "background.paper",
                color: isSel ? "common.white" : "text.primary",
                border: isSel ? `2px solid ${pal.accent}` : `1px solid ${theme.palette.divider}`,
                transition: "transform 0.12s ease, box-shadow 0.12s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <Box
                component="img"
                src={img}
                alt={label}
                sx={{
                  width: 34,
                  height: 34,
                  objectFit: "contain",
                  mb: 0.5,
                }}
              />
              <Typography variant="caption" align="center" sx={{ fontWeight: 600, mt: 0.5 }}>
                {label}
              </Typography>

              {isSel && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    borderRadius: 1,
                    bgcolor: "common.white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                  }}
                >
                  <CheckIcon sx={{ color: pal.accent, fontSize: 18 }} />
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

export default ConfirmationQuestion;

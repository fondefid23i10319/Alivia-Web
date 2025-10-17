import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";

import renderOptionImagePath from "../utils/renderOptionImagePath";
import renderOptionLabel from "../utils/renderOptionLabel";
import getPalette from "../utils/getPalette";

interface OptionsQuestionBodyProps {
  typeMetric: string;
  options: Array<number>;
  value: number | null;
  onChange: (value: number | null) => void;
}

function OptionsQuestionBody({
  typeMetric = "confirmation",
  options = [0, 1],
  value = null,
  onChange = (_: number | null) => {},
}: OptionsQuestionBodyProps) {
  const theme = useTheme();
  const pal = getPalette(typeMetric);
  const [selected, setSelected] = useState<number | null>(value ?? null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  const handleSelect = (opt: number) => {
    const next: number | null = selected === opt ? null : opt;
    setSelected(next);
    onChange(next);
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" gap={2} px={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {options.map((opt) => {
          const img = renderOptionImagePath(typeMetric, opt);
          const label = renderOptionLabel(typeMetric, opt);
          const isSel = selected === opt;

          return (
            <Paper
              key={String(opt)}
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
                width: 86,
                minWidth: 86,
                height: 86,
                borderRadius: "0.75rem",
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
                textAlign: "center",
              }}
            >
              <Box
                component="img"
                src={img}
                alt={label}
                sx={{ borderRadius: "0.75rem", width: 44, height: 44, objectFit: "contain", mb: 0.5 }}
              />
              <Typography variant="body2" align="center" sx={{ fontWeight: 600, mt: 0.5 }}>
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

export default OptionsQuestionBody;

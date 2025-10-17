import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getUserRequest } from "../../../../../api/user/get";

const MIN = 0;
const MAX = 10;

const marks = Array.from({ length: MAX + 1 }, (_, index) => ({
  value: index,
  label: index.toString(),
}));

function EvaLevelCard({ patientId }: { patientId: number }) {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patient-info", patientId],
    queryFn: () => getUserRequest(patientId),
  });
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
    <Card
      sx={{
        borderRadius: "20px",
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              EVA
            </Typography>
            <Typography variant="subtitle1" color="primary">
              (Escala Visual Analógica del Dolor)
            </Typography>
          </Stack>
        }
        subheader={"Indique su nivel de dolor"}
        slotProps={{
          subheader: {
            variant: "body1",
            fontWeight: 500,
          },
        }}
      />
      <CardContent
        sx={{
          p: 4.5,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Slider
          value={data.base_pain ? data.base_pain : 0}
          min={MIN}
          max={MAX}
          marks={marks}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            width: "100%",
            color: "#4476B5",
            height: 24,
            boxSizing: "border-box",
            px: 2,
            "& .MuiSlider-track": {
              height: 8,
              border: "none",
              background: `linear-gradient(90deg, #bbdefb, ${theme.palette.primary.main})`,
            },
            "& .MuiSlider-thumb": {
              height: 26,
              width: 26,
              backgroundColor: theme.palette.primary.main,
              border: "2px solid currentColor",
              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                boxShadow: "inherit",
              },
              "&::before": {
                display: "none",
              },
            },

            "& .MuiSlider-valueLabel": {
              lineHeight: 1.2,
              fontSize: 12,
              background: "unset",
              padding: 0,
              width: 32,
              height: 32,
              borderRadius: "50% 50% 50% 0",
              backgroundColor: "#4476B5",
              transformOrigin: "bottom left",
              transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
              "&::before": { display: "none" },
              "&.MuiSlider-valueLabelOpen": {
                transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
              },
              "& > *": {
                transform: "rotate(45deg)",
              },
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#E0E0E0",
              height: 8,
              border: "none",
            },
            "& .MuiSlider-mark": {
              display: "none",
            },
            mb: 2,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default EvaLevelCard;

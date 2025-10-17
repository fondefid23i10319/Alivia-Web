import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import getPalette from "../utils/getPalette";

interface ScaleQuestionBodyProps {
  typeMetric: string;
  min: number;
  max: number;
  value: number | null;
  onChange: (value: number | null) => void;
}

function ScaleQuestionBody({
  typeMetric,
  min,
  max,
  value = 5,
  onChange = (_: number | null) => {},
}: ScaleQuestionBodyProps) {
  const pal = getPalette(typeMetric);
  const marks = Array.from({ length: max + 1 }, (_, index) => ({
    value: index,
    label: index.toString(),
  }));
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2.5}
        mb={3}
        width="100%"
        px={2}
        boxSizing="border-box"
      >
        <Typography variant="h3" color={pal.accent} fontWeight="bold" lineHeight={1}>
          {value}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={1} alignSelf="center" width="80%">
        <Slider
          value={value ? value : Math.round((min + max) / 2)}
          min={min}
          max={max}
          marks={marks}
          step={1}
          valueLabelDisplay="auto"
          onChange={(_, v) => onChange(Number(v))}
          sx={{
            width: "100%",
            color: pal.accent,
            height: 24,
            boxSizing: "border-box",
            px: 2,
            "& .MuiSlider-track": {
              height: 8,
              border: "none",
              background: `linear-gradient(90deg, ${pal.accent}1A, ${pal.accent})`,
            },
            "& .MuiSlider-thumb": {
              height: 26,
              width: 26,
              backgroundColor: pal.accent,
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
              backgroundColor: pal.accent,
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
          }}
        />
      </Box>
    </>
  );
}

export default ScaleQuestionBody;

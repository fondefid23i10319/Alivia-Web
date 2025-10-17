import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface LabelProps {
  previousValue: number;
  currentValue: number;
}

function Label({ previousValue, currentValue }: LabelProps) {
  if (currentValue < previousValue) {
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <TrendingDownIcon
          sx={{
            color: "#00C950",
          }}
        />
        <Typography variant="body2" color="#00C950">
          Mejorando
        </Typography>
      </Stack>
    );
  } else if (currentValue === previousValue) {
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <TrendingFlatIcon
          sx={{
            color: "#A65F00",
          }}
        />
        <Typography variant="body2" color="#A65F00">
          Se Mantiene
        </Typography>
      </Stack>
    );
  } else
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <TrendingUpIcon
          sx={{
            color: "#FB2C36",
          }}
        />
        <Typography variant="body2" color="#FB2C36">
          Empeorando
        </Typography>
      </Stack>
    );
}

export default Label;

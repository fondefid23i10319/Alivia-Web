import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Label({ value }: { value: number }) {
  if (value === 0) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <TrendingDownIcon
          sx={{
            color: "#FB2C36",
          }}
        />
        <Typography variant="h6" color="#FB2C36">
          Diminuyó
        </Typography>
      </Stack>
    );
  } else if (value === 1) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <TrendingFlatIcon
          sx={{
            color: "#A65F00",
          }}
        />
        <Typography variant="h6" color="#A65F00" justifyContent="center">
          Se Mantiene
        </Typography>
      </Stack>
    );
  } else if (value === 2)
    return (
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <TrendingUpIcon
          sx={{
            color: "#00C950",
          }}
        />
        <Typography variant="h6" color="#00C950">
          Aumentó
        </Typography>
      </Stack>
    );
  else
    return (
      <Typography variant="h6" textAlign="center">
        No registrado
      </Typography>
    );
}

export default Label;

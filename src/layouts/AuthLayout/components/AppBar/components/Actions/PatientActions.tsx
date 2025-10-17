import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

function PatientActions() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <StarIcon color="primary" />
      <Typography variant="subtitle1" fontWeight={600}>
        Tienes
      </Typography>
      <Typography variant="subtitle1" fontWeight={600} color="primary">
        5
      </Typography>
      <Typography variant="subtitle1" fontWeight={600}>
        puntos
      </Typography>
    </Stack>
  );
}

export default PatientActions;

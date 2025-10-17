import moment from "moment-timezone";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MedicationIcon from "@mui/icons-material/Medication";

const userTz = "America/Santiago";

interface MedicineSOSProps {
  lastUse: {
    createdAt: string;
  } | null;
  usesUntilNow: number;
}

function MedicineSOS({ medicineSOS }: { medicineSOS: MedicineSOSProps }) {
  const theme = useTheme();
  let lastUseMoment = null;
  if (medicineSOS.lastUse) {
    try {
      if (moment.tz) {
        lastUseMoment = moment.tz(medicineSOS.lastUse.createdAt, userTz);
      } else {
        lastUseMoment = moment(medicineSOS.lastUse.createdAt);
      }
    } catch (e) {
      console.error("error", e);
      lastUseMoment = moment(medicineSOS.lastUse.createdAt);
    }
  }

  const formattedAbsolute = lastUseMoment ? lastUseMoment.format("DD[/]MM [/]YYYY HH:mm") : null;

  const formattedRelative = lastUseMoment ? lastUseMoment.fromNow() : null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor={`${theme.palette.background.paper}`}
      borderRadius="24px"
      p={2}
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      border={`1px solid ${theme.palette.divider}`}
      width="100%"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <MedicationIcon
          sx={{
            color: "#008B52",
            fontSize: "1.2rem",
          }}
        />
        <Typography variant="subtitle2">Medicamento SOS</Typography>
      </Stack>

      <Stack p={1} direction="column" spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Typography variant="h4" color="#008B52">
            {medicineSOS.usesUntilNow}
          </Typography>
          <Typography variant="h6" color="grey">
            {medicineSOS.usesUntilNow === 1 ? "uso" : "usos"}
          </Typography>
        </Stack>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          Esta semana
        </Typography>
        <Typography variant="body2" textAlign="center">
          {lastUseMoment ? (
            <>
              Último uso: {formattedAbsolute}
              {"\n"}
              <Typography variant="body2" textAlign="center" color="gray">
                ({formattedRelative})
              </Typography>
            </>
          ) : (
            "Sin registros esta semana"
          )}
        </Typography>
      </Stack>
    </Box>
  );
}

export default MedicineSOS;

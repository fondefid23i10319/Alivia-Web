import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import MedicationIcon from "@mui/icons-material/Medication";

import formatAlarmTime from "./utils/formatAlarmTime";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#008B52" : "#008B5233",
  },
}));

interface CalendarProps {
  nextMedication: {
    name: string;
    scheduledAt: string;
    time: string;
    timeZone: string;
  };
  totalToday: number;
  consumedToday: number;
  pendingToday: number;
}

function Calendar({ calendarMedication }: { calendarMedication: CalendarProps }) {
  const theme = useTheme();
  const nextTimeLabel = formatAlarmTime(calendarMedication.nextMedication);
  const consumedTodayProgress =
    calendarMedication.totalToday > 0
      ? (calendarMedication.consumedToday / calendarMedication.totalToday) * 100
      : 0;
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
        <Typography variant="subtitle2">Medicamentos hoy</Typography>
      </Stack>

      <Stack p={1} spacing={2} direction="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold" color="#008B52">
            {calendarMedication.consumedToday}/{calendarMedication.totalToday}
          </Typography>
          <Box p={0.5} border={0.5} borderRadius="14px" borderColor="#FFB86A">
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessAlarmsIcon
                sx={{
                  color: "#F54900",
                  fontSize: "1.2rem",
                }}
              />
              <Typography variant="body2" color="#F54900">
                Pendientes: {calendarMedication.pendingToday}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <BorderLinearProgress variant="determinate" value={consumedTodayProgress} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="#717171">
            Próxima dosis
          </Typography>
          {calendarMedication.nextMedication ? (
            <Typography variant="body2" color="#F54900">
              {calendarMedication.nextMedication.name} - {nextTimeLabel}
            </Typography>
          ) : (
            <Typography variant="body2" color="#717171">
              No hay más dosis por hoy
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default Calendar;

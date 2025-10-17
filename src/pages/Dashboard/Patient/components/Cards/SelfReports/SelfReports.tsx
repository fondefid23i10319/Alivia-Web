import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import renderLabel from "./utils/renderLabel";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#4476B5" : "#4476B533",
  },
}));

interface SelfReportsProps {
  selfReportByDay: Array<{ day: string; responded: boolean }>;
  monthlyReportStats: {
    daysCompleted: number;
    daysInMonth: number;
    maxConsecutiveDays: number;
  };
}

function SelfReports({ selfReportByDay, monthlyReportStats }: SelfReportsProps) {
  const theme = useTheme();
  const daysOfWeekCompleted = selfReportByDay.filter((d) => d.responded).length;
  const daysOfWeekProgress = (daysOfWeekCompleted / selfReportByDay.length) * 100;
  const initial = (label: string | null) => (label ? label.charAt(0).toUpperCase() : "?");
  const percentageComplete = Number(
    Number((monthlyReportStats.daysCompleted / monthlyReportStats.daysInMonth).toFixed(3)) * 100
  ).toFixed(1);
  const label = renderLabel(Number(percentageComplete));
  const restSelfReports = monthlyReportStats.daysInMonth - monthlyReportStats.daysCompleted;
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarTodayIcon
            sx={{
              fontSize: "1.2rem",
            }}
            color="primary"
          />
          <Typography variant="subtitle2">Reportes del Mes</Typography>
        </Stack>
        <Typography variant="body2" color={label.color} bgcolor={label.bgColor} borderRadius="14px" p={0.5}>
          {percentageComplete}% {label.text}
        </Typography>
      </Box>
      <Stack p={1} spacing={2} direction="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold" color="primary">
            {monthlyReportStats.daysCompleted}/{monthlyReportStats.daysInMonth}
          </Typography>
          <Typography variant="body2" color="primary" bgcolor="#4476B533" borderRadius="14px" p={0.5}>
            Racha: {monthlyReportStats.maxConsecutiveDays}{" "}
            {monthlyReportStats.maxConsecutiveDays !== 1 ? "días" : "día"}
          </Typography>
        </Box>

        <BorderLinearProgress variant="determinate" value={daysOfWeekProgress} />

        <Box display="flex" justifyContent="flex-end">
          <Stack direction="row" spacing={1} alignItems="center">
            {selfReportByDay.map((d, index) => {
              return (
                <Box
                  key={index}
                  width="35px"
                  height="35px"
                  borderRadius="14px"
                  p={1}
                  sx={{
                    justifyItems: "center",
                    border: 0.5,
                    borderColor: d.responded ? "#4476B5" : "grey",
                    backgroundColor: d.responded ? "#4476B5" : "white",
                  }}
                >
                  <Typography variant="body2" color={`${d.responded ? "white" : "black"}`}>
                    {initial(d.day)}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
        {monthlyReportStats.daysCompleted > 0 && (
          <Typography
            variant="body2"
            fontSize="10px"
            bgcolor="#EFF6FF"
            borderRadius="14px"
            textAlign="center"
            color="#4476B5"
            p={0.5}
          >
            ¡Muy bien! Solo {restSelfReports} {restSelfReports > 1 ? "reportes" : ""} más para completar el mes
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default SelfReports;

import { useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TimelineIcon from "@mui/icons-material/Timeline";

import Label from "./components/Label";

import renderMessage from "./utils/renderMessage";

interface PainProps {
  painByDayCurrentWeek: Array<{
    avg: number | null;
    day: string;
  }>;
  painByDayLastWeek: Array<{
    avg: number | null;
    day: string;
  }>;
}

function Pain({ painByDayCurrentWeek, painByDayLastWeek }: PainProps) {
  const theme = useTheme();
  const nonNullValuesCurrentWeek = painByDayCurrentWeek
    .map((d) => (d.avg !== null ? d.avg : null))
    .filter((v) => v !== null);
  const weeklyAvgCounted =
    nonNullValuesCurrentWeek.length > 0
      ? Number((nonNullValuesCurrentWeek.reduce((a, b) => a + b, 0) / nonNullValuesCurrentWeek.length).toFixed(1))
      : null;
  const nonNullValuesLastWeek = painByDayLastWeek
    ?.map((d) => (d.avg !== null ? d.avg : null))
    .filter((v) => v !== null);
  const previousWeeklyAvgCounted =
    nonNullValuesLastWeek.length > 0
      ? Number((nonNullValuesLastWeek.reduce((a, b) => a + b, 0) / nonNullValuesLastWeek.length).toFixed(1))
      : null;
  const message = renderMessage(Number(weeklyAvgCounted), Number(previousWeeklyAvgCounted));
  const avgDifference = Math.abs(Number(previousWeeklyAvgCounted) - Number(weeklyAvgCounted)).toFixed(1);

  const dataset = painByDayCurrentWeek.map((d) => ({
    day: d.day ? d.day : "",
    value: d.avg === null ? null : Number(d.avg),
  }));

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
          <TimelineIcon
            sx={{
              color: "#F9052B",
              fontSize: "1.2rem",
            }}
          />
          <Typography variant="subtitle2">Nivel de Dolor</Typography>
        </Stack>
        <Label currentValue={Number(weeklyAvgCounted)} previousValue={Number(previousWeeklyAvgCounted)} />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">Promedio semanal</Typography>
          <Typography variant="body2" fontWeight="bold">
            {weeklyAvgCounted !== null ? `${weeklyAvgCounted}/10` : "-"}
          </Typography>
        </Stack>
      </Box>

      <BarChart
        hideLegend
        borderRadius={4}
        dataset={dataset}
        series={[{ dataKey: "value", label: "Nivel", type: "bar" }]}
        xAxis={[
          {
            dataKey: "day",
            scaleType: "band",
            position: "bottom",
            height: 28,
            disableLine: true,
            disableTicks: true,
            tickLabelStyle: { fontSize: 8 },
          },
        ]}
        yAxis={[{ position: "none" }]}
        margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
        height={100}
        colors={["#F9052B"]}
      />

      <Typography
        variant="body2"
        fontSize="10px"
        bgcolor={message.bgColor}
        borderRadius="14px"
        color={message.textColor}
        textAlign="center"
        p={0.5}
      >
        {message.content}{" "}
        {weeklyAvgCounted !== previousWeeklyAvgCounted ? `${avgDifference} puntos vs. la semana anterior.` : ""}
      </Typography>
    </Box>
  );
}

export default Pain;

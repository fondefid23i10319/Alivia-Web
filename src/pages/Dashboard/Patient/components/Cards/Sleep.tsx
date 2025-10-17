import { useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BedtimeIcon from "@mui/icons-material/Bedtime";

const goal = 8;

interface SleepProps {
  sleepByDay: Array<{
    avg: number | null;
    day: string;
  }>;
}

function Sleep({ sleepByDay }: SleepProps) {
  const theme = useTheme();
  const nonNullValues = sleepByDay.map((d) => (d.avg !== null ? d.avg : null)).filter((v) => v !== null);
  const weeklyAvgCounted =
    nonNullValues.length > 0
      ? Number((nonNullValues.reduce((a, b) => a + b, 0) / nonNullValues.length).toFixed(1))
      : null;

  const dataset = sleepByDay.map((d) => ({
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
          <BedtimeIcon
            sx={{
              color: "#008B52",
              fontSize: "1.2rem",
            }}
          />
          <Typography variant="subtitle2">Horas de Sueño</Typography>
        </Stack>
        <Box>
          <Typography variant="body2" className="rounded-full border border-[#F0B100] px-2 py-1 color-[#A65F00]">
            {weeklyAvgCounted ? Number(Number((weeklyAvgCounted / goal).toFixed(3)) * 100).toFixed(1) : 0}% meta
          </Typography>
        </Box>
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
        colors={["rgba(75, 192, 192, 0.2)"]}
      />

      {weeklyAvgCounted && weeklyAvgCounted < goal && (
        <Typography
          variant="body2"
          fontSize="10px"
          bgcolor="#FEFCE8"
          borderRadius="14px"
          color="#A65F00"
          textAlign="center"
          p={0.5}
        >
          Intenta dormir {Number(goal - weeklyAvgCounted).toFixed(1)}{" "}
          {Number(Number(goal - weeklyAvgCounted).toFixed(1)) > 1 ? "horas" : "hora"} más para alcanzar tu meta de{" "}
          {goal} horas.
        </Typography>
      )}
    </Box>
  );
}

export default Sleep;

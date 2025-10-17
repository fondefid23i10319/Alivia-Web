import Chip from "@mui/material/Chip";

import getPalette from "../utils/getPalette";
import renderMetricName from "../utils/renderMetricLabel";

interface MetricLabelProps {
  typeMetric: string;
}

function MetricLabel({ typeMetric }: MetricLabelProps) {
  const metricName = renderMetricName(typeMetric);
  const pal = getPalette(typeMetric);
  return (
    <Chip
      label={metricName}
      sx={{
        color: "white",
        backgroundColor: pal.accent,
        fontWeight: "bold",
      }}
      size="small"
    />
  );
}

export default MetricLabel;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import { areaElementClasses, LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

import { getPatientUserHealthDataRequest } from "../../../../../api/patient/get";

function PainChart({ patientId }: { patientId: number }) {
  const [range, setRange] = useState("last-week");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patientUserHealthData", patientId, "pain", range],
    queryFn: () => getPatientUserHealthDataRequest(patientId, "pain", range),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card
      sx={{
        borderRadius: "20px",
      }}
    >
      <CardHeader
        action={
          <IconButton
            sx={{
              backgroundColor: "#4476B51A",
              mr: 0.5,
            }}
            size="small"
          >
            <TuneIcon color="primary" fontSize="small" />
          </IconButton>
        }
        title="Dolor en el Tiempo"
        slotProps={{
          title: {
            variant: "subtitle1",
            fontWeight: "bold",
            color: "primary",
          },
        }}
      />
      <CardContent
        sx={{
          p: 2,
          backgroundColor: "#FAFAFA",
        }}
      >
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, -5.5, 2, -7.5, 1.5, 6],
              area: true,
              baseline: "min",
            },
          ]}
          height={300}
          colors={["#D82821"]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              strokeDasharray: "10 5",
              strokeWidth: 2,
            },
            [`& .${areaElementClasses.root}`]: {
              fill: "#D828211A",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default PainChart;

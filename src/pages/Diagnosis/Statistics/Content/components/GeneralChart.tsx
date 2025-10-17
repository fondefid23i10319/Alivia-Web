import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import { RadarChart } from "@mui/x-charts/RadarChart";

import { getPatientUserHealthDataRequest } from "../../../../../api/patient/get";

function GeneralChart({ patientId }: { patientId: number }) {
  const [range, setRange] = useState("last-week");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patientUserHealthData", patientId, "general", range],
    queryFn: () => getPatientUserHealthDataRequest(patientId, "general", range),
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
        title="Datos Generales"
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
        <RadarChart
          height={500}
          series={[
            {
              label: "Lisa",
              data: [120, 98, 86, 99, 85, 65],
              fillArea: true,
            },
          ]}
          radar={{
            max: 120,
            metrics: ["Math", "Chinese", "English", "Geography", "Physics", "History"],
          }}
          fillOpacity={0.1}
          colors={["#9D00AE"]}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}

export default GeneralChart;

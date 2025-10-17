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

function HearthRateChart({ patientId }: { patientId: number }) {
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
        title="Frecuencia Cardíaca"
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
          height={230}
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

export default HearthRateChart;

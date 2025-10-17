import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getBodyMapRequest } from "../../../../../../api/patient/get";

import bodyParts from "./constants/bodyParts";
import bodyPaths from "./constants/bodyPaths";

const colorOptions: Record<string, string> = {
  "Sin dolor": "#206000",
  Eléctrico: "#10386B",
  Tensión: "#00C2DC",
  Quemante: "#D82821",
  Punzante: "#DE9000",
  Presión: "#FF87FF",
  Opresivo: "#9D00AE",
  Pinchazo: "#F4C700",
  Otro: "#A4A2A2",
};

const labelColum = [
  ["Sin dolor", "Eléctrico", "Tensión"],
  ["Quemante", "Punzante", "Presión"],
  ["Opresivo", "Pinchazo", "Otro"],
];

function getPainColor(
  bodyPartId: number,
  currentPainZones:
    | {
        id: number;
        painType: string;
      }[]
    | null
) {
  const currentZone = currentPainZones?.find((zone: { id: number; painType: string }) => zone.id === bodyPartId);
  if (currentZone) {
    return colorOptions[currentZone.painType as keyof typeof colorOptions];
  } else {
    return "#206000";
  }
}

function PainZonesCard({ patientId }: { patientId: number }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["body-map", patientId],
    queryFn: () => getBodyMapRequest(patientId),
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
        title={"Zonas de Dolor"}
        subheader={"Haz click sobre las zonas en las que sientes dolor"}
        slotProps={{
          title: {
            variant: "subtitle1",
            fontWeight: "bold",
            color: "primary",
          },
          subheader: {
            variant: "body1",
            fontWeight: 500,
          },
        }}
      />
      <CardContent
        sx={{
          py: 2,
          px: 4,
          backgroundColor: "#FAFAFA",
        }}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1842.000000 1378.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(0.000000,1378.000000) scale(0.100000,-0.100000)">
            {Object.entries(bodyParts).map(([key, part]) => (
              <path
                key={key}
                className={`&:hover: { fill: "#10386B",}`}
                d={bodyPaths[key].path}
                fill={getPainColor(part.id, data.body_map)}
                style={{ cursor: "not-allowed" }}
              />
            ))}
          </g>
        </svg>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" my={2}>
          Tipos de Dolor
        </Typography>
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          {labelColum.map((column, index) => (
            <Stack key={index} direction="column" spacing={1} alignItems="center">
              {column.map((label, index) => (
                <Stack key={`${label}-${index}`} direction="row" spacing={0.5} alignItems="center">
                  <Box height="14px" width="14px" borderRadius="50%" bgcolor={colorOptions[label]} />
                  <Typography variant="body1">{label}</Typography>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PainZonesCard;

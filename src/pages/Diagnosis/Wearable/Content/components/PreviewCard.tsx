import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getWearableDataByPatientIdRequest } from "../../../../../api/wearable/get";

const userTz = "America/Santiago";

function PreviewCard({ patientId }: { patientId: number }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["last-sync-wearable-data", patientId],
    queryFn: () => getWearableDataByPatientIdRequest(patientId, "last-week"),
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
        title="Reloj"
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
          py: 2,
          px: 4,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="img"
            src="/src/assets/images/wearable.png"
            alt={`wearable`}
            sx={{
              marginBottom: 1,
              width: "95px",
              height: "85px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant="subtitle2" fontWeight="bold">
              Dispositivo Wearable
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Conectado el {data.lastSync ? moment(data.lastSync).tz(userTz).format("DD-MM-YYYY") : "N/A"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PreviewCard;

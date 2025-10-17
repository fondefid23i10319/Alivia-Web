import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getUserRequest } from "../../../../../api/user/get";

const userTz = "America/Santiago";

function PersonalCard({ patientId }: { patientId: number }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patient-info", patientId],
    queryFn: () => getUserRequest(patientId),
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
          <IconButton>
            <EditSquareIcon color="primary" />
          </IconButton>
        }
        title="Información Personal"
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
        <Stack direction="row" spacing={5} alignItems="center">
          <Stack direction="column" spacing={2}>
            <Typography variant="body1">Nombre</Typography>
            <Typography variant="body1">Rut</Typography>
            <Typography variant="body1">Fecha de Nacimiento</Typography>
            <Typography variant="body1">Correo</Typography>
            <Typography variant="body1">Dirección</Typography>
            <Typography variant="body1">Diagnósitco</Typography>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" fontWeight="bold">
              {`${data.first_name} ${data.last_name}`}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {data.rut}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {moment.utc(data.dob).tz(userTz).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {data.email}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {data.address}
            </Typography>
            {data.diagnosis ? (
              <Stack direction="row" spacing={0.5} alignItems="center" display="flex" flexWrap="wrap">
                {data.diagnosis.map((currentDiagniosis: string, index: number) => (
                  <Typography key={index} variant="body1" fontWeight="bold">
                    {currentDiagniosis}
                  </Typography>
                ))}
              </Stack>
            ) : (
              <Typography variant="body1">Sin diagnósticos</Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PersonalCard;

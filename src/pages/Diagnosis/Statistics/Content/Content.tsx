import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import GeneralChart from "./components/GeneralChart";
import PainChart from "./components/PainChart";
import SleepChart from "./components/SleepChart";

function Content({ patientId }: { patientId: number }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack direction="column" spacing={2}>
          <PainChart patientId={patientId} />
          <SleepChart patientId={patientId} />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <GeneralChart patientId={patientId} />
      </Grid>
    </Grid>
  );
}

export default Content;

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import ActivityLevelChart from "./components/ActivityLevelChart";
import HearthRateChart from "./components/HearthRateChart";
import PreviewCard from "./components/PreviewCard";
import SleepChart from "./components/SleepChart";

function Content({ patientId }: { patientId: number }) {
  return (
    <Stack direction="column" spacing={2}>
      <Box display="flex" justifyContent="start">
        <PreviewCard patientId={patientId} />
      </Box>
      <Grid container spacing={1}>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <SleepChart patientId={patientId} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <HearthRateChart patientId={patientId} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <ActivityLevelChart patientId={patientId} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Content;

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import EvaLevelCard from "./components/EvaLevelCard";
import PainZonesCard from "./components/PainZonesCard";
import PersonalCard from "./components/PersonalCard";
import TagsCard from "./components/TagsCard";

function Content({ patientId }: { patientId: number }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack direction="column" spacing={2}>
          <PersonalCard patientId={patientId} />
          <TagsCard patientId={patientId} />
          <EvaLevelCard patientId={patientId} />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <PainZonesCard patientId={patientId} />
      </Grid>
    </Grid>
  );
}

export default Content;

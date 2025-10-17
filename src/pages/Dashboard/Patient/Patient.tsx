import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import {
  Calendar,
  Doctors,
  Fatigue,
  Goals,
  MedicineSOS,
  Mood,
  Pain,
  SelfReports,
  Sleep,
  Weight,
} from "./components/Cards";
import Header from "./components/Header";
import SelfReportFormDialog from "./components/SelfReportFormDialog";
import SimpleCollapseAccordion from "./components/SimpleCollapseAccordion";

import { useAppSelector } from "../../../hooks/redux";
import { selectId } from "../../../features/auth/selectors";

import { getPatientGeneralInfoRequest } from "../../../api/patient/get";

function Patient() {
  const id = useAppSelector(selectId);
  const {
    data: generalInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["general-info", id],
    queryFn: () => getPatientGeneralInfoRequest(id),
  });
  const [openSelfReportDialog, setOpenSelfReportDialog] = useState(false);

  const handleClickOpenSelfReportDialog = () => {
    setOpenSelfReportDialog(true);
  };

  const handleCloseSelfReportDialog = () => {
    setOpenSelfReportDialog(false);
  };

  useEffect(() => {
    if (generalInfo && !generalInfo.selfReportIsAnswered) {
      handleClickOpenSelfReportDialog();
    }
  }, [generalInfo]);

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
    <React.Fragment>
      <Grid container spacing={2} mb={2} p={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Header
            selfReportIsAnswered={generalInfo.selfReportIsAnswered}
            crisisAlertIsActivated={generalInfo.crisisAlertIsActivated}
            onClickOpenSelfReportDialog={handleClickOpenSelfReportDialog}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Mood moodByDay={generalInfo.moodByDay} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Pain
            painByDayCurrentWeek={generalInfo.painByDay}
            painByDayLastWeek={generalInfo.previousWeek.painByDay}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Sleep sleepByDay={generalInfo.sleepByDay} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelfReports
            selfReportByDay={generalInfo.selfReportByDay}
            monthlyReportStats={generalInfo.monthlyReportStats}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Calendar calendarMedication={generalInfo.medicationSummaryToday} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Doctors />
        </Grid>
      </Grid>
      <SimpleCollapseAccordion title="Métricas adicionales" id="additionalMetrics">
        <Grid container spacing={2} mb={2} p={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Goals goals={generalInfo.goals} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Weight weight={generalInfo.weight} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Fatigue fatigue={generalInfo.fatigue} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <MedicineSOS medicineSOS={generalInfo.medicineSOS} />
          </Grid>
        </Grid>
      </SimpleCollapseAccordion>
      <SelfReportFormDialog open={openSelfReportDialog} onClose={handleCloseSelfReportDialog} />
    </React.Fragment>
  );
}

export default Patient;

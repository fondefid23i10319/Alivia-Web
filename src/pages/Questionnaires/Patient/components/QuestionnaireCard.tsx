import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpIcon from "@mui/icons-material/Help";

import type { PatientQuestionnaireProps } from "../../interface";

function QuestionnaireCard({ questionnaire }: { questionnaire: PatientQuestionnaireProps }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: theme.shadows[1],
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[3],
        },
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center" component="div">
            <HelpIcon />
            <Typography variant="body1" fontWeight="bold">
              {questionnaire.name}
            </Typography>
          </Stack>
        }
      />
      <CardContent
        sx={{
          backgroundColor: "#FAFAFA",
          px: theme.spacing(2),
          pt: theme.spacing(2),
          pb: 0,
        }}
      >
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              Médico tratante:
            </Typography>
            <Typography variant="body1">Nombre médico tratante</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              Fecha:
            </Typography>
            <Typography variant="body1">
              {new Date(questionnaire.createdAt).toLocaleDateString("es-CL", {
                timeZone: "America/Santiago",
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ backgroundColor: "#FAFAFA", py: theme.spacing(2), px: theme.spacing(2) }}>
        <Button
          sx={{
            backgroundColor: "#ECF1F8",
            "&:hover": {
              backgroundColor: "#D8E1F0",
            },
            borderRadius: "4px",
          }}
          color="primary"
          endIcon={<ArrowForwardIcon color="primary" />}
          variant="contained"
        >
          <Typography variant="button" color="primary" fontWeight="bold">
            Responder
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

export default QuestionnaireCard;

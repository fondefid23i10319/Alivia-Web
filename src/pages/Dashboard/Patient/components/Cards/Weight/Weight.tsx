import moment from "moment-timezone";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BalanceIcon from "@mui/icons-material/Balance";

import Label from "./components/Label";

const userTz = "America/Santiago";

interface WeightProps {
  lastAnswer: {
    createdAt: string;
    content: string;
  } | null;
}

function Weight({ weight }: { weight: WeightProps }) {
  const theme = useTheme();
  let lastUseMoment = null;
  if (weight.lastAnswer) {
    try {
      if (moment.tz) {
        lastUseMoment = moment.tz(weight.lastAnswer.createdAt, userTz);
      } else {
        lastUseMoment = moment(weight.lastAnswer.createdAt);
      }
    } catch (e) {
      console.error("error", e);
      lastUseMoment = moment(weight.lastAnswer.createdAt);
    }
  }

  const formattedAbsolute = lastUseMoment ? lastUseMoment.format("DD[/]MM[/]YYYY HH:mm") : null;

  const formattedRelative = lastUseMoment ? lastUseMoment.fromNow() : null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor={`${theme.palette.background.paper}`}
      borderRadius="24px"
      p={2}
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      border={`1px solid ${theme.palette.divider}`}
      width="100%"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <BalanceIcon
          sx={{
            color: "#008B52",
            fontSize: "1.2rem",
          }}
        />
        <Typography variant="subtitle2">Peso corporal</Typography>
      </Stack>

      <Stack p={1} direction="column" spacing={2}>
        <Label value={Number(weight.lastAnswer?.content)} />
        <Typography variant="body2" textAlign="center">
          {lastUseMoment ? (
            <>
              Última respuesta: {formattedAbsolute}
              {"\n"}
              <Typography variant="body2" textAlign="center" color="gray">
                ({formattedRelative})
              </Typography>
            </>
          ) : (
            "Sin registros esta semana"
          )}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Weight;

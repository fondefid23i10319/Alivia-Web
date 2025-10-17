import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";

const maximumFatigue = 10;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#F9052B" : "#F9052B33",
  },
}));

interface FatigueProps {
  avgUntilNow: number;
}

function Fatigue({ fatigue }: { fatigue: FatigueProps }) {
  const theme = useTheme();
  const avgProgress = (Number(fatigue.avgUntilNow) / maximumFatigue) * 100;
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
        <Battery0BarIcon
          sx={{
            color: "#F9052B",
            fontSize: "1.2rem",
          }}
        />
        <Typography variant="subtitle2">Nivel de Fátiga</Typography>
      </Stack>

      <Stack p={1} direction="column" spacing={2}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="h4" color="#F9052B">
            {Number(fatigue.avgUntilNow)}
          </Typography>
          <Typography variant="h6">/</Typography>
          <Typography variant="h6" color="grey">
            {maximumFatigue}
          </Typography>
        </Stack>

        <BorderLinearProgress variant="determinate" value={avgProgress} />

        <Typography variant="body2" color="textSecondary" textAlign="center">
          Promedio semanal
        </Typography>
      </Stack>
    </Box>
  );
}

export default Fatigue;

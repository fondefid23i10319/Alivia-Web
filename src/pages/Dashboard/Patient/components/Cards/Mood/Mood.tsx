import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import MoodFace from "./components/MoodFace";

import renderLabel from "./utils/renderLabel";
import renderMoodFaceStyle from "./utils/renderMoodFaceStyle";

interface MoodProps {
  moodByDay: Array<{
    avg: number | null;
    day: string;
  }>;
}

function Mood({ moodByDay }: MoodProps) {
  const theme = useTheme();
  const positiveDays = moodByDay.filter((day) => day.avg && day.avg >= 2);
  const percentageComplete = positiveDays
    ? Number(Number((positiveDays.length / 7).toFixed(3)) * 100).toFixed(1)
    : 0;
  const label = renderLabel(Number(percentageComplete));

  const normalizeIndex = (avg: number | null) => {
    if (avg === null) return null;
    const rounded = Math.round(avg);
    if (Number.isNaN(rounded)) return null;
    return Math.max(0, Math.min(4, rounded));
  };

  const initial = (label: string | null) => (label ? label.charAt(0).toUpperCase() : "?");

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={5}
      mb={3}
      borderRadius="24px"
      p={2.5}
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      border={`1px solid ${theme.palette.divider}`}
      bgcolor={`${theme.palette.background.paper}`}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <FavoriteBorderIcon
            sx={{
              color: "#008B52",
              fontSize: "1.2rem",
            }}
          />
          <Typography variant="subtitle2">Estado de Ánimo</Typography>
        </Stack>

        <Typography variant="body2" color={label.color} bgcolor={label.bgColor} borderRadius="14px" p={0.5}>
          {percentageComplete}% {label.text}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        {moodByDay.map((d, index) => {
          const idx = normalizeIndex(d.avg);
          const moodStyle =
            idx !== null
              ? renderMoodFaceStyle(Math.round(idx), theme)
              : { backgroundColor: "transparent", color: theme.palette.grey[400] };
          return (
            <Stack key={index} alignItems="center" direction="column" spacing={2}>
              {idx !== null ? (
                <Box
                  display="flex"
                  width="35px"
                  height="35px"
                  borderRadius="50%"
                  sx={{
                    transition: "all 0.2s ease",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    backgroundColor: moodStyle.backgroundColor,
                  }}
                >
                  <MoodFace value={Math.round(idx)} color={moodStyle.color} />
                </Box>
              ) : (
                <Box
                  display="flex"
                  width="35px"
                  height="35px"
                  border={`2px dashed ${theme.palette.grey[400]}`}
                  borderRadius="50%"
                  sx={{
                    transition: "all 0.2s ease",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    backgroundColor: "transparent",
                  }}
                />
              )}

              <Typography variant="subtitle2">{initial(d.day)}</Typography>
            </Stack>
          );
        })}
      </Stack>
      <Box
        display="flex"
        justifyContent="center"
        alignSelf="center"
        borderRadius="24px"
        bgcolor="#F0FDF4"
        p={0.5}
        width="80%"
      >
        <Typography variant="body2" fontSize="10px" fontWeight="bold" color="#008236">
          {positiveDays.length} de 7 días con buen ánimo
        </Typography>
      </Box>
    </Box>
  );
}

export default Mood;

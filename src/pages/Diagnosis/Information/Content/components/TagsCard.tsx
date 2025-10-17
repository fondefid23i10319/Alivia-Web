import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { getTagsByPatientIdRequest } from "../../../../../api/tag/get";

function TagsCard({ patientId }: { patientId: number }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patient-tags", patientId],
    queryFn: () => getTagsByPatientIdRequest(patientId),
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
        title="Etiquestas actuales"
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
        <Stack direction="row" spacing={1} alignItems="center" display="flex" flexWrap="wrap">
          {data.map((tag: { id: number; tag_name: string }) => (
            <Stack
              key={tag.id}
              direction="row"
              spacing={0.5}
              alignItems="center"
              borderRadius="5px"
              p={1}
              bgcolor="#9D00AE1A"
            >
              <Typography variant="body1" fontWeight={500} color="#9D00AE">
                {tag.tag_name}
              </Typography>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: "#9D00AE",
                }}
              />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TagsCard;

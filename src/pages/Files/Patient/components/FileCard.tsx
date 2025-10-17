import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import type { PatientFileProps } from "../../interface";

const pdfExtensions = ["pdf", "jpg", "png", "jpeg"];

function FileCard({ file }: { file: PatientFileProps }) {
  const theme = useTheme();
  const isPdf = pdfExtensions.includes(file.file_type);
  const handleDownloadFile = async (file: PatientFileProps) => {
    try {
      const res = await fetch(file.document);
      if (!res.ok) throw new Error(`Error ${res.status} al descargar el archivo`);

      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");

      const safeName = `${file.article_name}`.replace(/[/\\?%*:|"<>]/g, "-");
      const extension = file.file_type ? `.${file.file_type}` : "";
      a.href = blobUrl;
      a.download = `${safeName}${extension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Descarga fallida:", err);
      window.open(file.document, "_blank", "noopener,noreferrer");
    }
  };

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
        action={
          <Tooltip title="Añadir a favoritos" arrow>
            <IconButton>
              <StarOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        }
        title={
          <Stack direction="row" spacing={1} alignItems="center" component="div">
            <InsertDriveFileIcon />
            <Typography variant="body1" fontWeight="bold">
              {file.article_name}
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
              Tipo de archivo:
            </Typography>
            <Typography variant="body1">{isPdf ? "Guía" : "Vídeo"}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              Médico tratante:
            </Typography>
            <Typography variant="body1">
              {`${file.UserArticle.doctor.first_name} ${file.UserArticle.doctor.last_name}`}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              Fecha:
            </Typography>
            <Typography variant="body1">
              {new Date(file.createdAt).toLocaleDateString("es-CL", {
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
          startIcon={<DownloadIcon color="primary" />}
          variant="contained"
          onClick={() => handleDownloadFile(file)}
        >
          <Typography variant="button" color="primary" fontWeight="bold">
            Descargar
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

export default FileCard;

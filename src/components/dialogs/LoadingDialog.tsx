import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface LoadingDialogProps {
  typeElement: string;
  open: boolean;
  onClose: () => void;
}

function LoadingDialog({ typeElement, open, onClose }: LoadingDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle m={0}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            sx={{
              "&:hover": {
                borderRadius: "50%",
                backgroundColor: "#3D3D3D33",
              },
              color: "#3D3D3D",
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" p={1}>
          <Typography variant="h6" mb={0}>
            Por favor, espere un momento ...
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 2,
        }}
      >
        <Stack display="flex" justifyContent="center" direction="row" spacing={1} alignItems="center">
          <CircularProgress />
          <Typography variant="subtitle2">Subiendo {typeElement} ...</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingDialog;

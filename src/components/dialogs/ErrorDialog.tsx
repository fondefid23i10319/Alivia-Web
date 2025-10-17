import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorDialogProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
}

function ErrorDialog({ title, content, open, onClose }: ErrorDialogProps) {
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
        <Stack direction="column" spacing={1} alignItems="center">
          <Box display="flex" justifyContent="center" bgcolor="#9506001A" p={1} borderRadius="4px">
            <ErrorOutlineIcon
              sx={{
                color: "#950600",
                fontSize: 35,
              }}
            />
          </Box>

          <Typography variant="h6">{title}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 2,
        }}
      >
        {" "}
        <DialogContentText textAlign="center">{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ py: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#950600",
            borderRadius: "4px",
          }}
          onClick={onClose}
        >
          <Typography variant="button" color="white" fontWeight="bold">
            Aceptar
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;

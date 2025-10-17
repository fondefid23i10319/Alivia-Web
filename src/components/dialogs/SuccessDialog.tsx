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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

interface SuccessDialogProps {
  title: string;
  content: string;
  buttonLabel: string;
  open: boolean;
  onClose: () => void;
  onClick: () => void;
}

function SuccessDialog({ title, content, buttonLabel, open, onClose, onClick }: SuccessDialogProps) {
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
        <Stack direction="column" spacing={2} alignItems="center">
          <Box display="flex" justifyContent="center" bgcolor="#4476B51A" p={1} borderRadius="4px">
            <CheckCircleIcon
              color="primary"
              sx={{
                fontSize: 40,
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
            borderRadius: "4px",
          }}
          color="primary"
          onClick={onClick}
        >
          <Typography variant="button" color="white" fontWeight="bold">
            {buttonLabel}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessDialog;

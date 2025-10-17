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
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteDialogProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  onClick: () => void;
}

function DeleteDialog({ title, content, open, onClose, onClick }: DeleteDialogProps) {
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
        <Box display="flex" justifyContent="center">
          <Stack direction="column" spacing={3} alignItems="center">
            <Box bgcolor="#9506001A" p={1} borderRadius="4px">
              <DeleteIcon
                color="primary"
                sx={{
                  color: "#950600",
                  fontSize: 35,
                }}
              />
            </Box>
            <Typography display="flex" flexWrap="wrap" variant="h6">
              {title}
            </Typography>
          </Stack>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 2,
        }}
      >
        <DialogContentText textAlign="center">{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ py: 2, justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "4px",
          }}
          color="inherit"
          onClick={onClose}
        >
          <Typography variant="button" color="inherit" fontWeight="bold">
            Cancelar
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "4px",
          }}
          color="primary"
          onClick={onClick}
        >
          <Typography variant="button" color="white" fontWeight="bold">
            Eliminar
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;

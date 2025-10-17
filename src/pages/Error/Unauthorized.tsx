import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";

import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <Box display="flex" p={2} justifyContent="center" alignItems="center" flexDirection="column" gap={1}>
      <Box
        component="img"
        src="/src/assets/images/unauthorized.png"
        alt={`unauthorized`}
        sx={{
          marginBottom: 1,
          width: "250px",
          height: "auto",
          objectFit: "contain",
          borderRadius: "16px",
        }}
      />
      <Typography variant="h5" gutterBottom fontWeight="bold">
        No tienes permiso para ver esta página
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        Si crees que esto es un error, inicia sesión con la cuenta correcta o contacta soporte.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        endIcon={<CallMissedOutgoingIcon />}
        onClick={() => navigate("/dashboard", { replace: true })}
      >
        <Typography variant="button" color="white" fontWeight="bold">
          Ir al Inicio
        </Typography>
      </Button>
    </Box>
  );
}

export default Unauthorized;

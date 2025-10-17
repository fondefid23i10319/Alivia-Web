import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      color: "#2E2E2E",
    },
    button: {
      fontSize: "0.75rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
  },
  palette: {
    primary: {
      main: "#4476B5",
      light: "#4476B51A",
    },
    success: {
      main: "#35A000",
      light: "#35A0001A",
    },
    error: {
      main: "#D82821",
      light: "#D828211A",
    },
  },
});

export default theme;

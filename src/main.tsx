import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import store from "./app/store";
import DialogProvider from "./providers/DailogProvider";
import Routing from "./Routing";
import theme from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <DialogProvider>
            <Routing />
          </DialogProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

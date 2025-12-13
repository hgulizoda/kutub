import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import theme from "./styles/theme.js";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

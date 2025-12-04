import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

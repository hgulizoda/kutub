import { useState } from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import App from "../App";
import theme from "../styles/theme";

export function ThemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleTheme = () =>
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <>
      <ColorSchemeScript defaultColorScheme="light" />

      <MantineProvider colorScheme={colorScheme} theme={theme}>
        <App toggleTheme={toggleTheme}>{children}</App>
      </MantineProvider>
    </>
  );
}

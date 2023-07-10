import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./pages/search_schedules/components/header";
import ThemeContextProvider from "./contexts/themeContext/themeContext";
import { AppRouter } from "./router";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#facd29",
    },
    secondary: {
      main: "#37b24c",
    },
    info: {
      main: "#c3273d",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <ThemeContextProvider>
          <CssBaseline />
          {/* TODO make header dynamic after gpa calculator migration */}
          <Header />
          <AppRouter />
        </ThemeContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

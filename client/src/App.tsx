import "./App.css";
import { Route, Routes } from "react-router-dom";
import ModelSelectionsPage from "./pages/ModelSelections";
import FixturesPage from "./pages/Fixtures";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#ededed",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index path="/" element={<FixturesPage />} />
          <Route index path="/:fixtureId" element={<ModelSelectionsPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

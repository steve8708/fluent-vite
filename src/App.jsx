import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import { FluentThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

function App() {
  return (
    <FluentThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </FluentThemeProvider>
  );
}

export default App;

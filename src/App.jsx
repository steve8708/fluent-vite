import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Components from "./pages/Components";
import Settings from "./pages/Settings";
import Navigation from "./components/Navigation";

import { FluentThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

function App() {
  return (
    <FluentThemeProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/components" element={<Components />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </FluentThemeProvider>
  );
}

export default App;

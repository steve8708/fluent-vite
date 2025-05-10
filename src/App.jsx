import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import Dashboard from "./components/Dashboard";
import "./App.css";

// Initialize the Fluent UI icons
initializeIcons();

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;

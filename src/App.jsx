import { Routes, Route } from "react-router-dom";

import CardDemo from "./pages/CardDemo";
import MyApps from "./pages/MyApps";
import MyAccount from "./pages/MyAccount";
import Users from "./pages/Users";
import { FluentThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

function App() {
  return (
    <FluentThemeProvider>
      <Routes>
        <Route path="/myapps" element={<MyApps />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/card-demo" element={<CardDemo />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<MyApps />} />
      </Routes>
    </FluentThemeProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import YourApps from './pages/YourApps';
import MyApps from './pages/MyApps';
import MyAccount from './pages/MyAccount';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="yourapps" element={<YourApps />} />
          <Route path="myapps" element={<MyApps />} />
          <Route path="myaccount" element={<MyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App; 
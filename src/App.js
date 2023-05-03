import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RecoverPassword from "./pages/RecoverPassword";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

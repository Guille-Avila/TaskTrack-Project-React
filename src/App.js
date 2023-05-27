import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RecoverPassword from "./pages/RecoverPassword";
import Home from "./pages/Home";
import Today from "./pages/Today";
import DueTasks from "./pages/DueTasks";
import Done from "./pages/Done";
import Account from "./pages/Account";
import AddEditTask from "./pages/AddEditTask";
import AddEditGroup from "./pages/AddEditGroup";
import Group from "./pages/Group";
import List from "./pages/List";
import RestartPassword from "./pages/RestartPassword";
import { DropListProvider } from './components/DropListContext';
import axios from 'axios';

function AppWithContext() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:8000/api/check-login/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          // Process API response
          if (response.status === 200) {
            setIsLoggedIn(true);
            setIsCheckingLogin(false);
          }
        } else {
          setIsCheckingLogin(false);
        }
      } catch (error) {
        console.error('Error Check Login:', error);
        setIsCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);

  if (isCheckingLogin) {
    return <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10px 20px',
          color: '#fff',
          borderRadius: '10px'
        }}>Loading...</div>
    </div>;
  }

  return (
    <DropListProvider>
      {isLoggedIn ?
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/due-tasks" element={<DueTasks />} />
          <Route path="/done" element={<Done />} />
          <Route path="/account" element={<Account />} />
          <Route path="/add-edit-task/:id?" element={<AddEditTask />} />
          <Route path="/add-edit-group/:id?" element={<AddEditGroup />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/list/:listId" element={<List />} />
        </Routes> :
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      }
    </DropListProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/restart-password" element={<RestartPassword />} />
        <Route path="/*" element={<AppWithContext />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

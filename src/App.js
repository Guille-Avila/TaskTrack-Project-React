import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/today" element={<Today />} />
        <Route path="/due-tasks" element={<DueTasks />} />
        <Route path="/done" element={<Done />} />
        <Route path="/account" element={<Account />} />
        <Route path="/add-edit-task" element={<AddEditTask />} />
        <Route path="/add-edit-group" element={<AddEditGroup />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/list/:id" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
import { DropListProvider } from './components/DropListContext';

function AppWithContext() {
  return (
    <DropListProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/today" element={<Today />} />
        <Route path="/due-tasks" element={<DueTasks />} />
        <Route path="/done" element={<Done />} />
        <Route path="/account" element={<Account />} />
        <Route path="/add-edit-task/:id?" element={<AddEditTask />} />
        <Route path="/add-edit-group/:id?" element={<AddEditGroup />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/list/:listId" element={<List />} />
      </Routes>
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
        <Route path="/*" element={<AppWithContext />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

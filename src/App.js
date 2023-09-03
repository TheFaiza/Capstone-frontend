import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Students from "./components/Dashboard/Students";
import Courses from "./components/Dashboard/Courses";
import Grades from "./components/Dashboard/Grades";
import { useState } from "react";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import AdminSideBar from "./pages/Admin/AdminSideBar";
import SideBar from "./pages/Student/SideBar";

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/';
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const isStudentRoute = location.pathname === '/student';

  return (
    <div className="App">
        <Header />
        <div className="dashboard-holder flex">
          {!isLoginRoute && isAdminRoute && <AdminSideBar />}
          {!isLoginRoute && isStudentRoute && <SideBar />}
          <div className="content-holder">
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/admin' element={<Admin />} />

              <Route path='/admin/students' element={<Students />} />
              <Route path='/admin/courses' element={<Courses />} />
              <Route path='/admin/grades' element={<Grades />} />

              <Route path='/student' element={<Student />} />
              
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>

    </div>
  );
}

export default App;

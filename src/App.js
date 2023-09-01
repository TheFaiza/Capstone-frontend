import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


import "./App.scss";
  import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Students from "./components/Dashboard/Students";
import SideBar from "./components/SideBar/SideBar";
import Courses from "./components/Dashboard/Courses";
// import Footer from "./components/Footer/Footer";

function App() {
  //const location = useLocation();
  const shouldShowSidebar = !window.location.pathname.startsWith('/login');


  return (
    <div className="App">
      <BrowserRouter>
        <Header />

    <div className="dashboard-holder flex">
      
      {shouldShowSidebar && <SideBar />}
      
      <div className="content-holder">
      <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard/students' element={<Students />} />
          <Route path='/dashboard/courses' element={<Courses />} />
          
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />



        </Routes>
      </div>
    </div>
        
       
      </BrowserRouter>
    </div>
  );
}

export default App;

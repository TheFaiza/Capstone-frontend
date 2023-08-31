import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./App.scss";
  import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />


        <Routes>
          <Route path='/' element={<Navigate to="/dashboard"/>}/> 

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

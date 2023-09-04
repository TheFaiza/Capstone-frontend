import React, { useEffect } from "react";
import './Login.scss';
import { Link, useNavigate  } from "react-router-dom";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";


const Login = () => {

    localStorage.clear();

      const formik = useFormik({
        initialValues: {
          userEmail: "",
          password: "",
          user_type: "",
        },
        validationSchema: Yup.object({
            userEmail: Yup.string()
            .required('Required'),
          password: Yup.string()
            .required('Required'),
          user_type: Yup.string()
            .required('Required'),
        }),
        onSubmit: ((values) => {
            handleLogin();
        })  
      });

      const navigate = useNavigate();
      const [errorMsg, setErrorMsg] = useState("");

      const handleLogin = async() => {
        if(formik.values.user_type === "Admin"){
            try {
                const response = await axios.get(`http://localhost:4000/loginRoutes/login?email=${formik.values.userEmail}&password=${formik.values.password}&user_type=${formik.values.user_type}`);
                
console.log('response ------', JSON.stringify(response.data));


                if(response.data) {

                    const userInfo = JSON.stringify(response.data);
                    localStorage.setItem('user', userInfo);
                    navigate('/admin');
                }
                else {
                    setErrorMsg("User Email or password is not correct");
                    localStorage.removeItem('user');
                    setInterval(() => {
                        setErrorMsg(""); 
                    }, 2000);
                };
                
            } catch (error) {
                console.log(error)
            }
        }
        if(formik.values.user_type === "Student") {
            try {
                const response = await axios.get(`http://localhost:4000/loginRoutes/login?email=${formik.values.userEmail}&password=${formik.values.password}&user_type=${formik.values.user_type}`);
                
                if(response.data) {

                    const userInfo = JSON.stringify(response.data);
                    const headerClass = "studentHeader";
                    localStorage.setItem('user', userInfo);
                    localStorage.setItem('headerClass', headerClass);
                    navigate('/student');
                }
                else {
                    setErrorMsg("User Email or password is not correct");
                    localStorage.removeItem('user');
                    setInterval(() => {
                        setErrorMsg(""); 
                    }, 2000);
                };
                
            } catch (error) {
                console.log(error)
            }
        }
        
      };
    
    useEffect(() => {
        handleLogin();
    }, [])

    return(
        <div className="login-holder">
            <div className="form-holder">

                <form onSubmit={formik.handleSubmit}>
                    <h2>Please provide login information!</h2>
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="User Email" 
                            className="input-field"
                            name="userEmail"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userEmail}
                        />
                        {formik.touched.userEmail && formik.errors.userEmail ? (
                            <div className="error">{formik.errors.userEmail}</div>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input-field"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <div className="error">
                            <h2>{errorMsg}</h2>
                        </div>
                    </div>
                    <div className="form-row links">
                    <label className="radios">
                        Student
                        <input
                            type="radio"
                            name="user_type"
                            value="Student"
                            checked={formik.values.user_type === 'Student'}
                            onChange={formik.handleChange}
                            /> {''}
                         <span className="checkmark"></span>
                    
                    </label>
                    <label className="radios">
                    Admin
                    <input
                        type="radio"
                        name="user_type"
                        value="Admin"
                        checked={formik.values.user_type === 'Admin'}
                        onChange={formik.handleChange}
                        /> 
                        <span className="checkmark"></span>
                    </label>
                    {formik.touched.user_type && formik.errors.user_type ? (
                        <div className="error">{formik.errors.user_type}</div>
                    ) : null}
                    </div>
                    <div className="form-row">
                        <ul className="login-links">
                            <li><Link to="/forgot-password">Forgot Password?</Link></li>
                            <li><span>Don't have an account?</span><Link to="/register">Register Here</Link></li>
                            
                        </ul>
                        
                    </div>
                    
                    <div className="form-row">
                        <input type="submit" className="submit-btn" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;

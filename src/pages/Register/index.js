import React from "react";
import './Register.scss';
import { Link, useNavigate  } from "react-router-dom";
import { useState } from 'react';
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
    
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            mobile: "",
            user_type: "",
            address: "",
            country: "",
            city: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
            .required(`Required`),
            email: Yup.string()
            .email(`Invalid email address`)
            .required(`Required`),
            password: Yup.string()
            .required(`Required`)
        }),
        onSubmit: async (values, { setSubmitting  }) => {
            if(values.user_type === "Student") {
                try {
                const response =  await axios.post(`http://localhost:4000/studentRoutes`, values);
                setSuccessMsg(true);
                setTimeout(() => {
                    setSuccessMsg(false);
                    navigate('/');
                }, 1500);
                
                } catch (error) {
                    console.error(`Error posting students data`, values);
                } finally {
                    setSubmitting(false);
                }
            }
            
        }
    })
  
    return(
        <div className="register-holder">
            <div className="form-holder">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please provide register information!</h2>
                    {successMsg && (
                        <div className="success">You have been registered successfully as a student. Please login now.</div>
                    )}
                    <div className="flex">
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="input-field"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            value={formik.values.name} 
                        />
                        {formik.errors.name && formik.touched.name &&  
                            <div className="error">{formik.errors.name}</div>
                        }
                        
                    </div>
                    <div className="form-row">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="input-field"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} 
                    />
                    {formik.errors.email && formik.touched.email && 
                        <div className="error">{formik.errors.email}</div>
                    }
                </div>
                </div>
                <div className="flex">
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="Password" 
                            className="input-field"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password} 
                        />
                        {formik.errors.password && formik.touched.password && 
                            <div className="error">{formik.errors.password}</div>
                        }
                    </div>
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="Mobile" 
                            className="input-field"
                            name="mobile" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobile}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="Country" 
                            className="input-field"
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country} 
                        />
                    </div>
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="City" 
                            className="input-field"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <textarea
                    className="text-area"
                    placeholder="Address"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    ></textarea>
                </div>
                <div className="form-row">
                    <input 
                        type="hidden"
                        name="user_type" 
                        value={formik.values.user_type}
                    />
                </div>
                    <div className="form-row links">
                    <label className="radios">
                        Student
                        <input
                            type="radio"
                            name="user_type"
                            value="Student"
                            checked={formik.values.user_type === "Student"}
                            onChange={formik.handleChange}
                            />
                         <span className="checkmark"></span>
                    
                    </label>
                    <label className="radios">
                    Admin
                    <input
                    type="radio"
                    name="user_type"
                    value="Admin"
                    checked={formik.values.user_type === "Admin"}
                    onChange={formik.handleChange}
                    />
                        <span className="checkmark"></span>
                    </label>
                    </div>
                    <div className="form-row">
                        <ul className="login-links">
                            <li><span>Already have an account?</span><Link to="/">Login</Link></li>
                        </ul>
                        
                    </div>
                    <div className="form-row">
                        <button className="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;

import React from "react";
import './Login.scss';
import { Link } from "react-router-dom";
import { useState } from 'react';


const Login = () => {

  const [selectedOption, setSelectedOption] = useState('student'); 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    return(
        <div className="pageHolder">
            <div className="form-holder">
                <form action="" method="">
                    <h2>Please provide login information!</h2>
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="User Name" 
                            className="input-field" 
                        />
                    </div>
                    <div className="form-row">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input-field" 
                        />
                    </div>
                    <div className="form-row links">
                    <label className="radios">
                        Student
                        <input
                            type="radio"
                            name="userType"
                            value="student"
                            checked={selectedOption === 'student'}
                            onChange={handleOptionChange}
                            /> {''}
                         <span className="checkmark"></span>
                    
                    </label>
                    <label className="radios">
                    Admin
                    <input
                        type="radio"
                        name="userType"
                        value="admin"
                        checked={selectedOption === 'admin'}
                        onChange={handleOptionChange}
                        /> 
                        <span className="checkmark"></span>
                    </label>
                    </div>
                    <div className="form-row">
                        <ul className="login-links">
                            <li><Link to="/forgot-password">Forgot Password?</Link></li>
                            <li><span>Don't have an account?</span><Link to="/register">Register Here</Link></li>
                            
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

export default Login;

import React from "react";
import './forgotPassword.scss';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return(
        <div className="pageHolder">
            <div className="form-holder">
                <form action="" method="">
                    <h2>Please provide your registered email address!</h2>
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="Email Address" 
                            className="input-field" 
                        />
                    </div>
                    
                    <div className="form-row">
                        <ul className="login-links">
                            <li><span>Back to login screen!</span><Link to="/login">Login</Link></li>
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

export default ForgotPassword;

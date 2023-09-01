import React from "react";
import "./Students.scss";



const CrudComponent = () => {

    return(
        <div className="form-holder">
            <form action="" method="">
                <h2>Please provide student information!</h2>
                <div className="form-row">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="input-field" 
                    />
                </div>
                <div className="form-row">
                    <input 
                        type="email" 
                        placeholder="Last Name" 
                        className="input-field" 
                    />
                </div>
                <div className="form-row">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="input-field" 
                    />
                </div>
                
                
                <div className="form-row">
                    <button className="submit-btn">Submit</button>
                </div>
            </form>       
         </div>
    )
}

export default CrudComponent;
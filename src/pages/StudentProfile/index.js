import React, { useEffect, useState } from "react";
import "./Student.scss";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Student = (props) => {

    const [successMsg, setSuccessMsg] = useState(false);
    const [editCrud, setEditCrud] = useState("");

    const getEditData = async() => {

        let userStorageData = localStorage.getItem('user');
        let loginUserData = JSON.parse(userStorageData);
        let loginUserId = loginUserData.id;

        try {
            const response = await axios.get(`http://localhost:4000/studentRoutes/${loginUserId}`);
            formik.setValues(response.data);
            setEditCrud("update");
        } catch (e) {
            console.log(`Data was not fetched properly${e}`);
        }
    }


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
        onSubmit: async (values) => {

            values.user_type = "Student";

            console.log('values -----', values);

            let userStorageData = localStorage.getItem('user');
            let loginUserData = JSON.parse(userStorageData);
            let loginUserId = loginUserData.id;

            if(values.user_type === "Student") {
                try {
                    await axios.patch(`http://localhost:4000/studentRoutes/${loginUserId}`, values);
                    setSuccessMsg(true);
                
                } catch (error) {
                    console.error(`Error posting students data`, values);
                }
            }
            
        }
    })

    useEffect(() => {

        let userStorageData = localStorage.getItem('user');
        let loginUserData = JSON.parse(userStorageData);
        let loginUserId = loginUserData.id;

        if(loginUserId) {
            getEditData();
        }
    }, [])
   
    return(
        <div className="students-holder">

            <div className="form-holder">
                <form onSubmit={formik.handleSubmit}>
                <h2>Please provide student information! </h2>
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
                <div className="form-row">
                    <input type="submit" value={'Submit'} className="submit-btn" />
                </div>
           </form>   
            </div>
          </div>
    )
}

export default Student;
import React, { useEffect, useState } from "react";
import "./Courses.scss";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";




const CrudComponent = (props) => {
    
    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
              .required(`Required`),
            code: Yup.string()
              .required(`Required`),
        }),
        onSubmit: async (values, { setSubmitting  }) => {
            if(editCrud === "update") {
                try {
                    await axios.patch(`http://localhost:4000/courseRoutes/${props.idToEdit}`, values)
                    .then((response) => {
                        props.closeCrud();
                    })
                } catch (error) {
                    console.error(`Error posting courses data`, values);
                } finally {
                    setSubmitting(false);
                }
            }
            else {
                try {
                    await axios.post(`http://localhost:4000/courseRoutes`, values)
                    .then((response) => {
                        props.closeCrud();
                    })
                } catch (error) {
                    console.error(`Error posting courses data`, values);
                } finally {
                    setSubmitting(false);
                }
            }
            
        }
    })

    const [editCrud, setEditCrud] = useState("");
    const getEditData = async() => {
        try {
            const update = await axios.get(`http://localhost:4000/courseRoutes/${props.idToEdit}`);
            formik.setValues(update.data);
            setEditCrud("update");
        } catch (e) {
            console.log(`Data was not fetched properly${e}`);
        }
    }

    useEffect(() => {
        if(props.idToEdit) {
            getEditData();
        }
    }, [])
   
    return(
        <div className="courses-holder">

            <div className="form-holder">
                <form onSubmit={formik.handleSubmit}>
                <h2>Please provide course information!</h2>
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
                        type="text" 
                        placeholder="Code" 
                        className="input-field"
                        name="code"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.code} 
                    />
                    {formik.errors.code && formik.touched.code && 
                        <div className="error">{formik.errors.code}</div>
                    }
                </div>
                </div>
                <div className="form-row">
                    <textarea
                    className="text-area"
                    placeholder="Description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    ></textarea>
                </div>
                
                <div className="form-row">
                    <input type="submit" value={'Submit'} className="submit-btn" />
                </div>
           </form>   
            </div>
          </div>
    )
}

export default CrudComponent;
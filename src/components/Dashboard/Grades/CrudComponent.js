import React, { useEffect, useState } from "react";
import "./Grades.scss";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";




const CrudComponent = (props) => {
    
    const formik = useFormik({
        initialValues: {
            name: "",
            min_val: "",
            max_val: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
              .required(`Required`),
            min_val: Yup.string()
              .required(`Required`),
            max_val: Yup.string()
                .required(`Required`)
        }),
        onSubmit: async (values, { setSubmitting  }) => {
            if(editCrud === "update") {
                try {
                    await axios.put(`http://localhost:4000/gradeRoutes/${props.idToEdit}`, values)
                    .then((response) => {
                        props.closeCrud();
                    })
                } catch (error) {
                    console.error(`Error posting grades data`, values);
                } finally {
                    setSubmitting(false);
                }
            }
            else {
                try {
                    await axios.post(`http://localhost:4000/gradeRoutes`, values)
                    .then((response) => {
                        props.closeCrud();
                    })
                } catch (error) {
                    console.error(`Error posting grades data`, values);
                } finally {
                    setSubmitting(false);
                }
            }
            
        }
    })

    const [editCrud, setEditCrud] = useState("");
    const getEditData = async() => {
        try {
            const update = await axios.get(`http://localhost:4000/gradeRoutes?id=${props.idToEdit}`);
            formik.setValues(update.data[0]);
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
                <h2>Please provide grade information!</h2>
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
                        placeholder="Min Value" 
                        className="input-field"
                        name="min_val"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.min_val} 
                    />
                    {formik.errors.min_val && formik.touched.min_val && 
                        <div className="error">{formik.errors.min_val}</div>
                    }
                </div>
                </div>
                <div className="form-row">
                <input 
                        type="text" 
                        placeholder="Max Value" 
                        className="input-field"
                        name="max_val"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.max_val} 
                    />
                    {formik.errors.max_val && formik.touched.max_val && 
                        <div className="error">{formik.errors.max_val}</div>
                    }
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
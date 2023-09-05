import React, { useEffect, useState } from "react";
import "./Students.scss";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";




const CrudComponent = (props) => {
    
    const formik = useFormik({
        initialValues: {
            student_id: "",
            course_id: "",
            grade_id: ""
        },
        // validationSchema: Yup.object().shape({
        //     student_id: Yup.string()
        //       .required(`Required`),
        //       course_id: Yup.string()
        //       .required(`Required`),
        //       grade_id: Yup.string()
        //       .required(`Required`)
        // }),
        onSubmit: async (values, { setSubmitting  }) => {

            console.log('values ----', values);
            
                try {
                    await axios.post(`http://localhost:4000/studentGradeListRoutes`, values)
                    .then((response) => {
                        props.closeCrud();
                    })
                } catch (error) {
                    console.error(`Error posting students data`, values);
                }
            }
            
        
    })

    const [studentList, setStudentList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [gradeList, setGradeList] = useState([]);


    const getStudentList = async() => {
        try {
            const response = await axios.get(`http://localhost:4000/studentRoutes`);
            setStudentList(response.data);
        } catch (e) {
            console.log(`Data was not fetched properly${e}`);
        }
    }

    const getCourseList = async() => {
        try {
            const response = await axios.get(`http://localhost:4000/courseRoutes`);
            setCourseList(response.data);
        } catch (e) {
            console.log(`Data was not fetched properly${e}`);
        }
    }

    const getGradeList = async() => {
        try {
            const response = await axios.get(`http://localhost:4000/gradeRoutes`);
            setGradeList(response.data);
        } catch (e) {
            console.log(`Data was not fetched properly${e}`);
        }
    }

    useEffect(() => {

         getStudentList();
         getCourseList();
         getGradeList();
        
    }, [])
   
    return(
        <div className="students-holder">

            <div className="form-holder">
                <form onSubmit={formik.handleSubmit}>
                <div className="flex">

                <div className="form-row"> 
                <label><h4>Select Student</h4></label>
                </div>
                    <div className="form-row">   
                    
                        <select
                            id="student_id"
                            name="student_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.selectedOption}
                        >
                            <option>
                            Select a Student
                            </option>

                            {studentList.map((st) => {
                     
                     return (

                            <option key={st.id} value={st.id}>{st.name}</option>

                            )
                        })}
                            
                        </select>
                        
                    </div>
                    
                </div>

                <div className="flex">

                <div className="form-row"> 
                <label><h4>Select Course</h4></label>
                </div>
                    <div className="form-row">   
                    
                        <select
                            id="course_id"
                            name="course_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.selectedOption}
                        >
                            <option>
                            Select a Course
                            </option>

                            {courseList.map((cl) => {
                     
                     return (

                            <option key={cl.id} value={cl.id}>{cl.name}</option>

                            )
                        })}
                            
                        </select>
                        
                    </div>
                    
                </div>

                <div className="flex">

                <div className="form-row"> 
                <label><h4>Select Grade</h4></label>
                </div>
                    <div className="form-row">   
                    
                        <select
                            id="grade_id"
                            name="grade_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.selectedOption}
                        >
                            <option>
                            Select a grade
                            </option>

                            {gradeList.map((gl) => {
                     
                     return (

                            <option key={gl.id} value={gl.id}>{gl.name}</option>

                            )
                        })}
                            
                        </select>
                        
                    </div>
                    
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
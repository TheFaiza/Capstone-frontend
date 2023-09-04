import React, { useEffect, useState } from "react";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Student = () => {

    const userInfoString = localStorage.getItem('user');
    const userInfo = JSON.parse(userInfoString);
    const [studentId, setStudentId] = useState(userInfo.id);

    const [firstTimeSelected, setFirstTimeSelected] = useState(false);
    const [updatedCourseList, setUpdatedCourseList] = useState(false);
    
    const [isSelected, setIsSelected] = useState();
    const [courses, setCourses] = useState([]);

    const initialValues = {
        student_id: studentId,
        course_ids: [],
      };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, { setSubmitting  }) => {
            try {
                const checkCourses = await axios.get(`http://localhost:4000/courseRoutes/assignedCourses?student_id=${studentId}`);
                if(checkCourses.data.length > 0) {
                    const courseToUpdate = checkCourses.data[0].id;
                    try {
                        const response = await axios.put(`http://localhost:4000/courseRoutes/assignedCourses/${courseToUpdate}`, values);
                        setUpdatedCourseList(true);
                        setTimeout(() => {
                            setUpdatedCourseList(false);
                        }, 1500);
                    } catch (error) {
                        console.log(error);
                    }
                }
                else {
                    try {
                        const addCourses = await axios.post(`http://localhost:4000/courseRoutes/assignedCourses`, values);
                        setFirstTimeSelected(true);
                        setTimeout(() => {
                            setFirstTimeSelected(false)
                        }, 1500);

                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                
            } finally {
                setSubmitting(false);
            }
        }
      });
    
    const handleCheckboxChange = (courseId) => {
        setIsSelected(formik.values.course_ids.includes(courseId));
        if (isSelected) {
            formik.setValues({
            ...formik.values,
            course_ids: formik.values.course_ids.filter((id) => id !== courseId),
            });
        } else {
            formik.setValues({
            ...formik.values,
            course_ids: [...formik.values.course_ids, courseId],
            });
        }
      };
      
    const getCourses = async () => {
        try {
            const response =  await axios.get(`http://localhost:4000/courseRoutes`);
            setCourses(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getAlreadySelected = async() => {
        try {
            const response = await axios.get(`http://localhost:4000/courseRoutes/assignedCourses`);
            const filteredData = response.data.filter(item => item.student_id === studentId);
            initialValues.course_ids.push(...filteredData[0].course_ids);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCourses();
        setStudentId(userInfo.id);
        getAlreadySelected();
    }, [])
    
    return (
        <div className="single-stdent">
        <h2>Student Dashboard</h2>
        <form onSubmit={formik.handleSubmit}>
        <div className="student-dashboard">
            
            <div className="courses-col">
                <div className="form-row">
                 <h3>Please select courses</h3>
                 {firstTimeSelected && (
                    <div className="success">Your courses are added.</div>
                 )}
                 {updatedCourseList && (
                    <div className="success">Your courses are updated.</div>
                 )}
                </div>
                {courses.map((course) => {
                     
                    return (
                        <div className="form-row" key={course.id}>
                            <label className="custom-label">
                            <input
                            type="checkbox"
                            name={`courses.${course.id}`}
                            checked={formik.values.course_ids.includes(course.id)}
                            onChange={() => handleCheckboxChange(course.id)}
                            />
                                <span className="custom-checkbox"></span> 
                                {course.name}
                            </label>
                        </div>
                    )
                })}
                
            </div>
            <div className="form-row">
                <input type="submit" value="Save" className="submit-btn" />
            </div>
            
        </div>
        </form>
        </div>
    )
}

export default Student;
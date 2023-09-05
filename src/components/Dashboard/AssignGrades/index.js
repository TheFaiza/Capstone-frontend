import React, { useState, useEffect } from "react";
import "./Students.scss";
import DataTable from "../../DataTable/DataTable";
import TableHeader from "../../TableHeader/TableHeader";
import CrudComponent from "./CrudComponent";
import axios from "axios";
import DeleteModal from "../../DeleteModal";
import CoursesList from "./CoursesList";


const AssignGrade = () => {
    const columns = [
        {
            Header: "Student Name",
            accessor: "student_name"
        },
        {
            Header: "Course Name",
            accessor: "course_name"
        },
        {
            Header: "Course Code",
            accessor: "course_code"
        },
        {
            Header: "Grade",
            accessor: "student_grade"
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
              <div>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row)}>Delete</button>
              </div>
            ),
          },
    ]
    
    const [settings, setSettings] = useState({
        crudMode: "",
        isCrudStart: false,
        btnText: "Add Student Grade",
        showBtn: true,
    });
    const [dataList, setDataList] = useState([]);
    const [idToEdit, setIdToEdit] = useState();
    const [idToDelete, setIdToDelete] = useState();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [courseListId, setCourseListId] = useState();
    const [openCourseList, setOpenCourseList] = useState(false);

    const crudStart = () => {
        setSettings({
            ...settings,
            crudMode: "create",
            isCrudStart: true,
            showBtn: false
        })
    }
    const closeCrud = () => {
        setSettings({
            ...settings,
            crudMode: "",
            isCrudStart: false,
            showBtn: true,
        })
        studentGradeList();
        setIdToEdit("");
        setIdToDelete("");
        setOpenCourseList(false);
        setCourseListId("");
    }

    const studentGradeList = async () => {
        try {
           const response = await axios.get(`http://localhost:4000/studentGradeListRoutes`);
           setDataList(response.data);
        } catch (e) {
           console.log(`problem refreshing list`+e); 
        }
    }

    useEffect(()=> {
        studentGradeList();
    }, []);

    const handleEdit = (row) => {
        setSettings({
            ...settings,
            crudMode: "update",
            isCrudStart: true,
            showBtn: false
        });
        setIdToEdit(row.original.id)
    }

    const handleDelete = (row) => {
        setIsDeleteModalVisible(true);
        setIdToDelete(row.original.id);
    }
    const onDelete = (confirm)=> {
        setIsDeleteModalVisible(confirm);
    }
    const handleCancel = () => {
        setIsDeleteModalVisible(false);
    };
    const handleCourses = (row) => {
        setSettings({
            ...settings,
            crudMode: "view",
            showBtn: false
        });
        setCourseListId(row.original.id);
        setOpenCourseList(true);
    }
   
   
    return(
        <div className="students-holder">
            <TableHeader 
                HeadingTxt={
                    settings.crudMode === "create" 
                    ? 'Add Student Grade'
                    : settings.crudMode === "update"
                    ? 'Update Student Grade'
                    : settings.crudMode === "view"
                    ? 'Assigned Courses'
                    : 'Student Grades' 
                }
                showAddBtn={settings.showBtn}
                crudStart={crudStart}
                closeCrud={closeCrud}
                btnText={settings.btnText}
            />
            {settings.isCrudStart ? (
                <>
                    <CrudComponent 
                      closeCrud={closeCrud}
                      idToEdit={idToEdit}  
                    />
                </>
            ) : openCourseList ? (
                <>
                    <CoursesList 
                    courseListId={courseListId}
                    />
                </>
            ) : (
                <div className="listing-holder">
                    <DataTable
                        data={dataList}
                        columns={columns}
                    />
                </div>
            )}
            {isDeleteModalVisible && (
                <DeleteModal 
                    handleCancel={handleCancel}
                    handleDelete={handleDelete}
                    itemToDelete={idToDelete}
                    onDelete={onDelete}
                    closeCrud={closeCrud}
                    api_endpoint={`students`}
                />
            )}
           
            
        </div>
    )


}

export default AssignGrade;
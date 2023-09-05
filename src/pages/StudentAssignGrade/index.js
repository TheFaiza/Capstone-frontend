import React, { useState, useEffect } from "react";
import "./Students.scss";
import DataTable from "../../components/DataTable/DataTable";
import TableHeader from "../../components/TableHeader/TableHeader";
import axios from "axios";


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
        let userStorageData = localStorage.getItem('user');
        let loginUserData = JSON.parse(userStorageData);
        let loginUserId = loginUserData.id;

        try {
           const response = await axios.get(`http://localhost:4000/studentGradeListRoutes/${loginUserId}`);
          
         //  const filteredData = response.data.filter(item => item.id === 2);
          
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
                HeadingTxt={'Student Grades'
                }
                />
            
                <div className="listing-holder">
                    <DataTable
                        data={dataList}
                        columns={columns}
                    />
                </div>
            
            
           
            
        </div>
    )


}

export default AssignGrade;
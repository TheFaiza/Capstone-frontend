import React, { useState } from "react";
import "./Students.scss";
import DataTable from "../../DataTable/DataTable";
import TableHeader from "../../TableHeader/TableHeader";
import CrudComponent from "./CrudComponent";

const data = [
    {
        id: 1,
        firstName: "Saba",
        lastName: "Anjum",
        courses: ["cooking", "reading books"],
        grade: "A"
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        courses: ["mathematics", "history"],
        grade: "B"
      },
      {
        id: 3,
        firstName: "Alice",
        lastName: "Smith",
        courses: ["chemistry", "music"],
        grade: "A+"
      },
      {
        id: 4,
        firstName: "Bob",
        lastName: "Johnson",
        courses: ["physics", "programming"],
        grade: "B+"
      },
      {
        id: 5,
        firstName: "Emily",
        lastName: "Davis",
        courses: ["art", "biology"],
        grade: "A-"
      }
]
const columns = [
    {
        Header: "ID",
        accessor: "id"
    },
    {
        Header: "First Name",
        accessor: "firstName"
    },
    {
        Header: "Last Name",
        accessor: "lastName"
    },
    {
        Header: "Courses",
        accessor: "courses"
    },
    {
        Header: "Grade",
        accessor: "grade"
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


const handleEdit = (row) => {
    console.log(row.values)   
}
const handleDelete = (row) => {
    console.log(row)
}




const Students = () => {

    const [settings, setSettings] = useState({
        crudMode: "",
        isCrudStart: false,
        btnText: "Add Student",
        showBtn: true,
    });
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
            showBtn: true
        })
    }

    return(
        <div className="students-holder">
            <TableHeader 
                HeadingTxt={
                    settings.crudMode === "create" 
                    ? 'Add Student'
                    : settings.crudMode === "update"
                    ? 'Update Student'
                    : 'Students' 
                }
                showAddBtn={settings.showBtn}
                crudStart={crudStart}
                closeCrud={closeCrud}
                btnText={settings.btnText}
            />
            {settings.isCrudStart ? (
                <>
                    <CrudComponent />
                </>
            ) : (
                <div className="listing-holder">
                    <DataTable
                        data={data}
                        columns={columns}
                    />
                </div>
            )}
            
        </div>
    )


}

export default Students;
import React, { useState, useEffect } from "react";
import "./Students.scss";
import DataTable from "../../DataTable/DataTable";
import TableHeader from "../../TableHeader/TableHeader";
import CrudComponent from "./CrudComponent";
import axios from "axios";



const Students = () => {
    const columns = [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Mobile",
            accessor: "mobile"
        },
        {
            Header: "Country",
            accessor: "country"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "Address",
            accessor: "address"
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
    const [dataList, setDataList] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:4200/students`)
        .then((response) => {
            setDataList(response.data) 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    const updateSettings = (newSettings) => {
        setSettings({
          ...settings,
          ...newSettings,
        });
    };

    const refreshList = (newStudent) => {
        setDataList([...dataList, newStudent]); 
    };
    const [idToEdit, setIdToEdit] = useState();
    const handleEdit = (row) => {
        setSettings({
            ...settings,
            crudMode: "update",
            isCrudStart: true,
            showBtn: false
        });
        setIdToEdit(row.values.id);
    }
    const handleDelete = (row) => {
        console.log(row)
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
                    <CrudComponent 
                        updateSettings={updateSettings}
                        refreshList={refreshList}
                        idToEdit={idToEdit}
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
            
        </div>
    )


}

export default Students;
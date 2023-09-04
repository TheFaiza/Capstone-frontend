import React, { useState, useEffect } from "react";
import "./Grades.scss";
import DataTable from "../../DataTable/DataTable";
import TableHeader from "../../TableHeader/TableHeader";
import CrudComponent from "./CrudComponent";
import axios from "axios";
import DeleteModal from "../../DeleteModal";

const Grades = () => {

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
            Header: "Min Value",
            accessor: "min_val"
        },
        {
            Header: "Max Value",
            accessor: "max_val"
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
        btnText: "Add Grade",
        showBtn: true,
    });
    const [dataList, setDataList] = useState([]);
    const [idToEdit, setIdToEdit] = useState();
    const [idToDelete, setIdToDelete] = useState();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const crudStart = () => {
        setSettings({
            ...settings,
            crudMode: "create",
            isCrudStart: true,
            showBtn: false
        });
    }
    const closeCrud = () => {
        setSettings({
            ...settings,
            crudMode: "",
            isCrudStart: false,
            showBtn: true
        });
        refreshList();
        setIdToEdit("");
        setIdToDelete("");
    }

    const refreshList = async () => {
        try {
           const response = await axios.get(`http://localhost:4000/gradeRoutes`);
           setDataList(response.data);
        } catch (e) {
           console.log(`problem refreshing list`+e); 
        }
    }

    useEffect(()=> {
        refreshList();
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

    return(
        <div className="courses-holder">
            <TableHeader 
                HeadingTxt={
                    settings.crudMode === "create" 
                    ? 'Add Grade'
                    : settings.crudMode === "update"
                    ? 'Update Grade'
                    : 'Grades' 
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
                    api_endpoint={`grades`}
                />
            )}
        </div>
    )


}

export default Grades;
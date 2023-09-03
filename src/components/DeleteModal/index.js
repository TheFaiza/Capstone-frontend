import React, { useState } from 'react';
import "./Delete.scss";
import axios from 'axios';

function DeleteModal(props) {
  
  const handleDelete = async() => {
    try {
        await axios.delete(`http://localhost:4200/${props.api_endpoint}/${props.itemToDelete}`)
        .then(()=> {
            props.closeCrud();
        })
    } catch (error) {
        
    }
    props.onDelete(false);
  };

  const handleCancel = () => {
    props.handleCancel();
  };

  return (
    <div className="delete-confirmation">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this item?</p>
            <div className="confirmation-buttons">
              <button className="delete-button" onClick={handleDelete}>Yes</button>
              <button className="cancel-button" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
  );
}

export default DeleteModal;

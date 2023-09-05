import React from "react";
import "./TableHeader.scss";

const TableHeader = ({
    HeadingTxt, 
    showAddBtn, 
    btnText, 
    crudStart, 
    closeCrud
}) =>{
    return (
        <div className="TableHeader">
            <h2>{HeadingTxt}</h2>
            {showAddBtn ? (
                 <button onClick={crudStart} className="primary-btn">{btnText}</button>
            ) : (
                <button onClick={closeCrud} className="primary-btn">Back</button>
            )}
        </div>
    )
}

export default TableHeader;
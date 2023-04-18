import React from "react";
import "./index.scss";

export default function IconButton({ value, onClick, icon }) {
    return (
        <button className="icon-button" onClick={onClick} value={value}>
            {icon}
        </button>
    );
}

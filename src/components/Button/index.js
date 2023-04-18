import React from "react";
import "./index.scss";

export default function Button({ value, onClick }) {
    return (
        <button className="button" onClick={onClick} id="projectionBtn" value={value}>
            {value}
        </button>
    );
}

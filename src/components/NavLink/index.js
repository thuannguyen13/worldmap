import React from "react";
import "./index.scss";

export default function NavLink({ value, onClick }) {
    return (
        <button className="nav-link" onClick={onClick} id="projectionBtn" value={value}>
            {value ? value : "Link"}
        </button>
    );
}

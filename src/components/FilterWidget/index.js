import React, { useState } from "react";
import "./index.scss";

export default function FilterWidget({ label, children }) {
    return (
        <div className="filter-sidebar">
            <div className="header-content">
                <h5>{label ? label : "Critical Infrastructure"}</h5>
            </div>
            <div className="body-content">{children ? children : <SidebarItem />}</div>
        </div>
    );
}

export function SidebarItem({ label, icon, onClick }) {
    const [checked, setChecked] = useState(true);
    return (
        <label className="sidebar-item">
            <input
                type="checkbox"
                onClick={onClick}
                onChange={() => {
                    setChecked(!checked);
                }}
                defaultChecked={checked}
            />
            {label || "checkbox"}
        </label>
    );
}

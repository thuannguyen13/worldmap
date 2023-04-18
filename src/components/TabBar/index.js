import React from "react";
import "./index.scss";
import IcoMap from "../../assets/IcoMap";
import IcoPlaceholder from "../../assets/IcoPlaceholder";

export default function TabBar() {
    return (
        <div className="tab-bar">
            <Tab label="Integrated Ops" icon={<IcoMap />} isActive={true} />
            <Tab label="CISA" />
            <Tab label="FEMA" />
            <Tab label="DHS" />
            <Tab label="NORTHCOM" />
        </div>
    );
}

function Tab({ label, icon, isActive }) {
    return (
        <div className={`tab ${isActive ? "active" : ""}`}>
            {icon ? icon : <IcoPlaceholder />}
            {label}
        </div>
    );
}

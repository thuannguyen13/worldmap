import React from "react";
import "./index.scss";

export default function PageHeader({ children }) {
    return (
        <div className="page-header">
            <div className="left-content">
                <h2>Integrated Operations</h2>
            </div>
            <div className="right-content">{children}</div>
        </div>
    );
}

import React from "react";
import "./index.scss";
import IcoMagnifier from "../../assets/IcoMagnifier";

export default function SearchField() {
    return (
        <div className="search-field">
            <IcoMagnifier />
            <input type="text" placeholder="Type to search" />
        </div>
    );
}

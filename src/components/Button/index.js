import React from "react";
import "./index.scss";

export default function Button({ value, onClick, leadingIcon, traillingIcon }) {
    return (
        <button className="button" onClick={onClick} id="projectionBtn" value={value}>
            {leadingIcon ? leadingIcon : ""}
            {value}
            {traillingIcon ? traillingIcon : ""}
        </button>
    );
}

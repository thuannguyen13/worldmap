import React, { useState } from "react";
import "./index.scss";

export default function Checkbox({ id, label, onClick }) {
    const [checked, setChecked] = useState(true);

    return (
        <label className="checkbox">
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

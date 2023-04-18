import React from "react";
import "./index.scss";
import IcoMap from "../../assets/IcoMap";
import IcoPlaceholder from "../../assets/IcoPlaceholder";

export default function TabBar() {
    return (
        <>
            <div className="tab-bar">
                <div className="tab active">
                    <IcoMap />
                    Integrated Ops
                </div>
                <div className="tab">
                    <IcoPlaceholder />
                    CISA
                </div>
                <div className="tab">
                    <IcoPlaceholder />
                    FEMA
                </div>
                <div className="tab">
                    <IcoPlaceholder />
                    DHS
                </div>
                <div className="tab">
                    <IcoPlaceholder />
                    NORTHCOM
                </div>
            </div>
        </>
    );
}

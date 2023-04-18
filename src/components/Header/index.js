import React from "react";
import "./index.scss";
import IconButton from "../IconButton";
import Logo from "../../assets/Logo";
import IcoBurger from "../../assets/IcoBurger";

export default function Header() {
    return (
        <div className="header">
            <div className="global-nav">
                <IconButton icon={<IcoBurger />}></IconButton>
                <Logo />
            </div>
            <div className="tab-bar"></div>
            <div className="page-header"></div>
        </div>
    );
}

import React from "react";
import "./index.scss";
import Logo from "../../assets/Logo";
import SearchField from "../SearchField";

import IcoBurger from "../../assets/IcoBurger";
import IconButton from "../IconButton";
import IcoBell from "../../assets/IcoBell";
import Avatar from "../Avatar";
import NavLink from "../NavLink";

export default function Header() {
    return (
        <div className="header">
            <div className="left-content">
                <IconButton icon={<IcoBurger />}></IconButton>
                <Logo />
                <SearchField />
            </div>
            <div className="right-content">
                <div className="nav-links">
                    <NavLink value="Integrated Operations" />
                    <NavLink value="Alert Management" />
                    <NavLink value="Logs" />
                    <NavLink value="Configuration" />
                </div>
                <IconButton icon={<IcoBell />}></IconButton>
                <Avatar label={"TW"} />
            </div>
        </div>
    );
}

import React from "react";
import EastIcon from "@mui/icons-material/East";
import { AvatarDropdown } from "../index";
import s from "./Navbar.module.scss";

const SearchInput = () => (
  <div className={s.container}>
    <input className={s.container_input} placeholder="Search" />
    <button className={s.container_button}>
      <EastIcon />
    </button>
  </div>
);

const Navbar = () => {
  return (
    <nav className={s.container_navbar}>
      <div className={s.container_navbar_btnContainer}>
        <SearchInput />
      </div>
      <div className={s.container_navbar_btnContainer}>
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;

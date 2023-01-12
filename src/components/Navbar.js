import React from "react";
import { Link } from "react-router-dom";
import Styles from "../css/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={Styles.navbar}>
      <div className={Styles.nav_center}>
        <ul className={Styles.nav_links}>
          <li>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/admin">
              Admin
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

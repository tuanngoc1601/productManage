import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, name }) => {
  const location = useLocation();
  const css =
    "after:absolute after:w-full after:h-[2px] after:bg-black after:bottom-0 after:left-0 text-blue-700";
  return (
    <div
      className={`h-full mr-8 flex items-center relative ${
        location.pathname === to ||
        (to !== "/" && location.pathname.includes(to))
          ? css
          : ""
      }`}
    >
      <Link className="text-lg" to={to}>
        {name}
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="h-16 shadow-md">
      <div className="h-full px-20 flex">
        <NavItem to="/" name="Dashboard" />
        <NavItem to="/admin" name="Admin" />
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Nav, NavLink, NavMenu } from "./navbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/add">Add</NavLink>
          <NavLink to="/">Recipes</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

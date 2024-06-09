import React from "react";
import { Nav, NavLink, NavMenu } from "./navbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/recipes/add" activeStyle>
            Add
          </NavLink>
          <NavLink to="/recipes" activeStyle>
            Recipes
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

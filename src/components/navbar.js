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
        </NavMenu>
        <NavMenu>
          <NavLink to="/add" activeStyle>
            Add
          </NavLink>
          <NavLink to="/recipes" activeStyle>
            Recipes
          </NavLink>
          <NavLink to="/search" activeStyle>
            Search
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

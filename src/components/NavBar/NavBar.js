import React from "react";

import { Navbar, NavbarBrand } from "reactstrap"

import "./NavBar.css";

const NavBar = props => (
    <div>
       <Navbar className="nav-bar">
           <NavbarBrand href="/">Peruse for Brews</NavbarBrand>
       </Navbar>
    </div>
);

export default NavBar;
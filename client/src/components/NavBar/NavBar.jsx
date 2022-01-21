import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <header className="NavBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/actions">Actions</Link>
      </nav>
    </header>
  );
}

export default NavBar;

import React from "react";
import "./header.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Nav from "./Nav";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/* logo */}
      <Logo />
      {/* search bar */}
      <div className="flex-grow-1">
        {" "}
        {/* Ensures the SearchBar takes remaining space */}
        <SearchBar />
      </div>
      {/* nav */}
      <Nav />
    </header>
  );
}

export default Header;

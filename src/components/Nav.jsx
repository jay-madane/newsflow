import React from "react";
import NavNotice from "./NavNotice";
import NavAvatar from "./NavAvatar";

function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center ms-2">
        <NavNotice />
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;

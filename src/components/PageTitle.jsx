import React from "react";
import "./pageTitle.css";

function PageTitle({ page, icon }) {
  return (
    <div className="pagetitle">
      <div className="title-container">
        <h1>{page}</h1>
      </div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <i className={icon}></i>
            </a>
          </li>
          <li className="breadcrumb-item active">{page}</li>
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;

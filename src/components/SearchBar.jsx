import React from "react";
import "./searchBar.css";

function SearchBar() {
  return (
    <div className="search-bar">
      <form
        className="search-form d-flex align-items-center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter search keyword"
          className="form-control" // Bootstrap class for form control
        />
        <button type="submit" title="Search" className="btn ms-2">
          {" "}
          {/* Bootstrap class for button and margin */}
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

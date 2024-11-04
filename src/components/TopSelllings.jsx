import React, { useEffect, useState } from "react";
import "./topSellings.css";
import CardFilter from "./CardFilter";
import TopSellingsTable from "./TopSellingsTable";

function TopSelllings() {
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  const [items, setItems] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/topselling")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card top-sellings overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Top Sellings <span>/{filter}</span>
        </h5>
        <TopSellingsTable items={items} />
      </div>
    </div>
  );
}

export default TopSelllings;

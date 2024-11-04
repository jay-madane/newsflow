import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Reports from "./Reports";
import RecentSales from "./RecentSales";
import TopSelllings from "./TopSelllings";
import RecentActivity from "./RecentActivity";
import BudgetReport from "./BudgetReport";
import WebTraffic from "./WebTraffic";
import News from "./News";
import Cards from "./Cards";

function Dashboard() {
  return (
    <section className="dashboard section">
      <div className="row">
        {/* Bootstrap has total 12 cols  */}
        <div className="col-lg-8">
          <div className="row">
            <Cards />
            <div className="col-12">
              <Reports />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
            <div className="col-12">
              <TopSelllings />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <RecentActivity />
          <BudgetReport />
          <WebTraffic />
          <News />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

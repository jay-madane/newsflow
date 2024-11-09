import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./budgetchart.css";

function BudgetChart() {
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Sales",
        "Administration",
        "Information Technology",
        "Customer Support",
        "Development",
        "Marketing",
      ],
    },
    yaxis: {
      title: {
        text: "Budget",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `$${val}`;
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      floating: true,
    },
    theme: {
      mode: "light", // This will apply a dark theme
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Allocated Budget",
      data: [4200, 3000, 2000, 35000, 50000, 18000],
    },
    {
      name: "Actual Spending",
      data: [5000, 14000, 28000, 26000, 42000, 21000],
    },
  ]);

  return (
    <div id="budgetChart" className="echart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default BudgetChart;

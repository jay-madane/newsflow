import React from "react";
import Chart from "react-apexcharts";

function WebTrafficChart() {
  // Data for the pie chart
  const chartData = [
    {
      name: "Search Engine",
      data: 1048,
    },
    {
      name: "Direct",
      data: 735,
    },
    {
      name: "Email",
      data: 580,
    },
    {
      name: "Union Ads",
      data: 484,
    },
    {
      name: "Video Ads",
      data: 300,
    },
  ];

  // ApexCharts options for dark theme
  const chartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
      // foreColor: "#B1B5C9", // Text color for labels and tooltips
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    labels: chartData.map((item) => item.name),
    legend: {
      position: "bottom",
      labels: {
        colors: "#B1B5C9", // Legend label color
      },
    },
    theme: {
      mode: "light", // This will apply a dark theme
    },
  };

  return (
    <div className="traffic-chart">
      <Chart
        options={chartOptions}
        series={chartData.map((item) => item.data)}
        type="pie"
        height="350"
      />
    </div>
  );
}

export default WebTrafficChart;

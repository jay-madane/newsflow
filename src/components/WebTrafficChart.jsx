import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Cookies from "js-cookie";

function WebTrafficChart() {
  const [chartData, setChartData] = useState([]);

  // Define a color map for the departments
  const colorMap = {
    healthcare: "#008FFB",
    education: "#00E396",
    technology: "#FEB019",
    politics: "#FF4560",
    sports: "#775DD0",
    business: "#D3D300",
    law: "#FF8C00",
    weather: "#6A5ACD",
    entertainment: "#FF1493",
  };

  useEffect(() => {
    const fetchChartData = async () => {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        console.error("Access token not found in cookies.");
        return;
      }

      try {
        const response = await fetch(
          "https://newsflowservices.vercel.app/api/v1/news/getPieChartData",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Include the access token in the request header
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          const uniqueDepartments = new Map();

          // Populate the map with unique department names and their combined counts
          result.data.forEach((item) => {
            const departmentName = item.name.trim(); // Trim whitespace and newlines
            const count = item.count;

            // Check if the department name already exists in the map
            if (uniqueDepartments.has(departmentName)) {
              // If it exists, combine the counts
              uniqueDepartments.set(
                departmentName,
                uniqueDepartments.get(departmentName) + count
              );
            } else {
              // If it doesn't exist, add it to the map
              uniqueDepartments.set(departmentName, count);
            }
          });

          // Transform the map back to an array format
          const formattedData = Array.from(
            uniqueDepartments,
            ([name, data]) => ({
              name,
              data,
              color: colorMap[name.toLowerCase().trim()] || "#808080", // Default to gray if not found
            })
          );

          setChartData(formattedData);
        } else {
          console.error("Failed to fetch chart data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  // Prepare data and colors for the pie chart
  const series = chartData.map((item) => item.data);
  const labels = chartData.map((item) => item.name);
  const colors = chartData.map((item) => item.color);

  // ApexCharts options for the pie chart
  const chartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    colors, // Use the unique colors from the formatted data
    labels, // Use the unique labels
    legend: {
      position: "bottom",
      labels: {
        colors: "#B1B5C9", // Legend label color
      },
    },
    theme: {
      mode: "light", // Apply light theme
    },
  };

  return (
    <div className="traffic-chart">
      <Chart options={chartOptions} series={series} type="pie" height="350" />
    </div>
  );
}

export default WebTrafficChart;

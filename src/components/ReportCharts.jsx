import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Cookies from "js-cookie";

function ReportCharts() {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        height: 400,
        type: "area",
        toolbar: {
          show: true,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#00FF00", "#FF0000", "#0000FF"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      theme: {
        mode: "light",
      },
    },
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const accessToken = Cookies.get("accessToken"); // Retrieve access token from cookies

      if (!accessToken) {
        console.error("Access token not found in cookies.");
        return;
      }

      try {
        const response = await fetch(
          "https://newsflowservices.vercel.app/api/v1/news/getAreaChartData",
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
          const formattedSeries = result.data.map((item) => ({
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize name
            data: item.data.map((value) => parseFloat(value).toFixed(3)), // Limit to 3 decimal places
          }));

          setData((prevData) => ({
            ...prevData,
            series: formattedSeries,
          }));
        } else {
          console.error("Failed to fetch chart data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <Chart
        options={data.options}
        series={data.series}
        type={data.options.chart.type}
        height={data.options.chart.height}
      />
    </div>
  );
}

export default ReportCharts;

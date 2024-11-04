import React, { useState } from "react";
import Chart from "react-apexcharts";

function ReportCharts() {
  const [data, setData] = useState({
    series: [
      {
        name: "Positive",
        data: [31, 40, 28, 51, 42, 82, 56],
      },
      {
        name: "Negative",
        data: [11, 14, 38, 57, 35, 62, 86],
      },
      {
        name: "Neutral",
        data: [11, 30, 68, 41, 32, 12, 16],
      },
    ],
    options: {
      chart: {
        // Corrected key
        height: 400,
        type: "area",
        toolbar: {
          show: true, //toolbar settings
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
        // Corrected key
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [
          // Corrected to array
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
        mode: "light", // This will apply a dark theme
      },
    },
  });

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

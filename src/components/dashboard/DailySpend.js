//jshint esversion:6
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "./DailySpend.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DailySpend(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  let monthNumber = date.getMonth();
  let currentMonth = monthNames[date.getMonth()];
  let currentYear = date.getFullYear();

  const data = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];

  // filter data to get the current month data only if exist.
  let monthData = props.total.filter((e) => e.month === monthNumber);
  let currentMonthData = monthData.filter((e) => e.year === currentYear);

  // check if it's new month will set all data to zero.
  // if not will fetch all data from backend and show spend money.
  if (currentMonthData.length === 0) {
    data.fill(0);
  }

  currentMonthData?.forEach((doc) => {
    let day = parseInt(doc.day) - 1;
    let value = parseInt(doc.dailySpend);

    data[day] = data[day] + value;
  });

  return (
    <div className="dailySpend">
      <Line
        id="canvasOne"
        data={{
          labels: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          datasets: [
            {
              label: `DAILY SPEND ${currentMonth.toUpperCase()}`,
              data: data,

              backgroundColor: [
                "rgba(54, 162, 235, 0.9)",
                "rgba(153, 102, 255, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(75, 192, 192, 0.9)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#d3d3d3",
              },
            },
            x: {
              ticks: {
                color: "#d3d3d3",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DailySpend;

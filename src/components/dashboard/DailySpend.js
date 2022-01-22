//jshint esversion:6

import React from 'react';
import { Line } from "react-chartjs-2";
import "./DailySpend.css";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function DailySpend(props) {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    let monthNumber = date.getMonth();
    let currentMonth = monthNames[date.getMonth()];

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // filter data to get the current month data only if exist.
    let currentMonthData = props.total.filter ((e) => {return e.month === monthNumber;});

    // console.log(monthNumber);
    // console.log(currentMonthData);

    // check if it's new month will set all data to zero.
    // if not will fetch all data from backend and show spend money.
    if (currentMonthData.length === 0) {
        data.fill(0);
    } else {
        currentMonthData.forEach((doc) => {
            let day = parseInt(doc.day) - 1;
            let value = parseInt(doc.dailySpend);
    
            if (day === 0) {
                data.fill(0);
            }
            if (data[day] === 0) { 
                data[day] = value;
            }else {
                let addingValues = value + data[day];
                data[day] = addingValues;
            }
    
        });
    }

             
    // console.log(data);

    return (
        <div className="dailySpend">
            <Line
                data={{
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                    datasets: [
                        {
                            label: `DAILY SPEND ${currentMonth.toUpperCase()}`,
                            data: data,

                            backgroundColor: [
                                'rgba(54, 162, 235, 0.9)',
                                'rgba(153, 102, 255, 0.9)',
                                'rgba(255, 206, 86, 0.9)',
                                'rgba(75, 192, 192, 0.9)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        },
                    ]
                }} 
                height={350}
                width={400}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}    
            />
        </div>
    )
}

export default DailySpend;

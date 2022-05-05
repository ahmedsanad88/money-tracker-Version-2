//jshint esversion:6

import React from 'react';
import { Bar } from "react-chartjs-2";
import "./ChartShow.css";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function ChartShow(props) {

    const date = new Date();
    let year = date.getFullYear();


    let spendData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let earnData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // console.log(props.total);

    props.total.forEach((doc) => {
        // console.log(doc);
        let month = parseInt(doc.month);
        let spendValue = parseInt(doc.dailySpend);
        let earnValue = parseInt(doc.dailyEarn);
        let dataYear = parseInt(doc.year);

        // console.log(dataYear);

        if (year > dataYear) {
            spendData[month] = 0;
            earnData[month] = 0;
        }else {
            // handle spend money
            spendData[month] = spendData[month] + spendValue;
            // handle earn money.
            earnData[month] = earnData[month] + earnValue;
        }

    });    

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
            type: 'bar',
            label: `MONTHLY SPEND ${year}`,
            backgroundColor: 'rgba(255, 99, 132,0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: spendData,
            },
            {
            type: 'bar',
            label: `MONTHLY EARN ${year}`,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: earnData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            },
            
        ],
    };

    return (
        <div className="chartShow">
            <Bar
                data={data} 
                // height={350}
                // width={400}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#d3d3d3'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#d3d3d3'
                            }
                        }
                    }
                }}    
            />
        </div>    
    )
}

export default ChartShow;

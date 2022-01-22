//jshint esversion:6

import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import "./Percentage.css";


function Percentage() {

    const [usage, setUsage] = useState(0);
    
    const user = useSelector(state => state.user.user);

    let earnMoney = parseInt(user.totalEarn);
    let SpentMoney = parseInt(user.totalSpend);
    
    let percentageOfUse = (Math.max((SpentMoney / earnMoney) * 100)).toFixed(1);

    
    // window.addEventListener('DOMContentLoaded', () => {
    //     // const percent = document.getElementById("percentage");
    //     const fill = document.getElementById("fillMode");

    //     const HandleFill = (num) => {
    //         if(num) {
    //             // percent.innerHTML=`${num}%`;
    //             setUsage(num);
    //             fill.style.clipPath=`inset(${num}% 0 0 0)`;
    //         }
    //     };        
    //     HandleFill(73);
    //     console.log('DOM fully loaded and parsed');
    // });

    useEffect(() => {
        const fill = document.getElementById("fillMode");

        const HandleFill = () => {
                // percent.innerHTML=`${num}%`;
            if (isNaN(percentageOfUse)) {
                setUsage(0);
                fill.style.clipPath=`inset(${0}% 0 0 0)`;
            }else {
                setUsage(percentageOfUse);
                fill.style.clipPath=`inset(${percentageOfUse}% 0 0 0)`;
            }    
        };        
        HandleFill();
    }, [percentageOfUse]);

    


    return (
        <div className="percentage">
            <div className="percentage__main">
                <div className="circle1" data-tip={`You have consumed ${usage}% <br /> of your balance`}>
                </div>
                <div className="circle2">
                    <h2 id="percentage">{usage}%</h2>
                </div>
                {/* using react tooltip  https://github.com/wwayne/react-tooltip*/}
                <div id="fillMode" className="circle3" data-tip={`You have consumed ${usage}% <br /> of your balance`}>
                    
                </div>
                
                <ReactTooltip place="top" type="warning" effect="float" multiline={true}/>
                <div className="text">
                    <small>Percentage Of Use</small>
                </div>
            </div>
        </div>
    )
}

export default Percentage;

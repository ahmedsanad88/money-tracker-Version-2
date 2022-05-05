import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


import Pie from './Pie/Pie';
import './CirclePercentage.css';

const CirclePercentage = () => {
    const [random, setRandom] = useState({
        percentage: 0,
        colour: "hsl(210, 100%, 49%)"
    });

    const user = useSelector(state => state.user.user);

        let earnMoney = parseInt(user.totalEarn);
        let SpentMoney = parseInt(user.totalSpend);
        
        let percentageOfUse = (Math.max((SpentMoney / earnMoney) * 100)).toFixed(1);

    useEffect(() => {

        const HandleFill = () => {
                // percent.innerHTML=`${num}%`;
            if (isNaN(percentageOfUse)) {
                setRandom({
                    percentage: 0,
                    colour: "hsl(210, 100%, 49%)"
                })
                
            }else {
                setRandom({
                    percentage: (100 - percentageOfUse),
                    colour: "hsl(210, 100%, 49%)"
                })
            }    
        };        
        HandleFill();
    }, [percentageOfUse]);


  return (
    <div className='percentage__container'>
        <h3>Percentage of Use</h3>
        <Pie percentage={random.percentage} colour={random.colour} />
    </div>
  )
}

export default CirclePercentage;
//jshint esversion:6

import React, { useEffect } from 'react';
import NormalCalculator from "./calculators/NormalCalculator";
import LoanCalculator from "./calculators/LoanCalculator";
import "./Calculator.css";
import Aos from "aos";
import "aos/dist/aos.css";


function Calculator() {

    // Contorl AOS animation..
    useEffect(() => {
        // initailize Aos
        Aos.init({
            duration: 2000
        });
        // make sure it's applying only one
        Aos.init({
            once: true,
            disable: 'phone'
        });
    }, []);

    return (
        <div className="calculator">
            <div data-aos="fade-up" className="calculator__main">
                <NormalCalculator />
                <LoanCalculator />
            </div>
        </div>
    )
}

export default Calculator;

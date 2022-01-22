//jshint esversion:6

import React, { useState } from 'react';
import "./LoanCalculator.css";

function LoanCalculator() {

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    const [results, setResults] = useState({
        installment: 0,
        totalInterest: 0,
        totalPayment: 0,
    });

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let installment = 0, totalInterest = 0, totalPayment = 0;

        if (value1 && value2 && value3) {
            if (parseInt(value1) > 0 && parseInt(value2) > 0 && parseInt(value3) > 0) {
                let interestPerYear = parseInt((value1 * value2) / 100);
                totalInterest = (interestPerYear * value3 / 12).toFixed(3);
                totalPayment = (parseInt(value1) + parseFloat(totalInterest)).toFixed(3);
                installment = (totalPayment / parseInt(value3)).toFixed(3);
                setResults({installment, totalInterest, totalPayment});
            } else {
                setResults({installment, totalInterest, totalPayment});
                alert('Please set ALL fields with ONLY Positive Values');
            }
        } else {
            setResults({installment, totalInterest, totalPayment});
            alert('Please fill Missing fields below');
        }
    };
    // console.log(results.totalInterest);
    // console.log(results.totalPayment);
    // console.log(results.installment);

    const resetCalculation = () => {
        let installment = 0, totalInterest = 0, totalPayment = 0;
        setResults({installment, totalInterest, totalPayment});
    };
        

    return (
        <div className="loanCalculator">
            <div className="tag"><h3>Loan Calculator</h3></div>
            <div className="loanCalculator_main">
                <div className="loanCalculator_input">
                    <form>
                        <input id="one" type="number" name="amount" placeholder="Total Loan" min="1" max="10000000" autoFocus required onChange={(e) => setValue1(e.target.value)}/>
                        <input id="two" type="number" name="rate" placeholder="Interest Rate / Year(Max=40)" min="1" max="40" required onChange={(e) => setValue2(e.target.value)}/>
                        <input id="three" type="number" name="tenor" placeholder="Tenor / Months(Max=300)" min="1" max="300" required onChange={(e) => setValue3(e.target.value)}/>
                        <input id="submit" type="submit" value="CALCULATE" onClick={handleSubmit}/>
                        <input id="resetForm" type="reset" value="RESET" onClick={resetCalculation}/>
                    </form>
                </div>
                <div className="loanCalculator_result">
                    <p>Monthly Installment = <strong className="result">{results.installment}</strong>$</p>
                    <p>Total Interest Amount = <strong className="result">{results.totalInterest}</strong>$</p>
                    <p>Total Payment After Majority = <strong className="result">{results.totalPayment}</strong>$</p>
                </div>
            </div>
        </div>
    )
}

export default LoanCalculator;

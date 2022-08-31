//jshint esversion:6

import React, { useState } from "react";
import "./NormalCalculator.css";

function NormalCalculator() {
  const Parser = require("expr-eval").Parser;
  const [operand, setOperand] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  const handleOperand = (id) => {
    switch (id) {
      case "del":
        operand.pop();
        setOperand([...operand]);
        break;
      case "point":
        operand.push(".");
        setOperand([...operand]);
        break;
      case "addNumbers":
        operand.push("+");
        setOperand([...operand]);
        break;

      case "deductNumbers":
        operand.push("-");
        setOperand([...operand]);
        break;

      case "multiply":
        operand.push("*");
        setOperand([...operand]);
        break;

      case "divide":
        operand.push("/");
        setOperand([...operand]);
        break;

      case "deleteData":
        operand.length = 0;
        setOperand([...operand]);
        setTotalResult(0);
        break;

      default:
        let element = document.getElementById(id);
        let value = parseInt(element.innerText);
        setOperand([...operand, value]);
    }
  };
  // console.log(operand);

  const handleResult = () => {
    // how to transfer string mathimatical string equation to any real one and calculate ckeck https://github.com/silentmatt/expr-eval#operator-precedence.

    if (operand.length > 0) {
      if (
        operand[0] === "+" ||
        operand[0] === "-" ||
        operand[0] === "/" ||
        operand[0] === "*"
      ) {
        alert(
          "Don't start your your calculation with operators like [+ & - & / & *]"
        );
      } else {
        if (checkDoubleSign()) {
          alert(
            "Please check your equation did you added two signs Frequently?"
          );
        } else {
          if (checkPoints()) {
            alert(
              "Please check your equation did you added two dots Frequently or on the same group?"
            );
          } else {
            // console.log("not found");
            let joinNumbers = operand.join("");
            // converting the string into normal Math. calculation.
            let parseNumber = Parser.parse(joinNumbers);
            let evalutedNum = parseNumber.evaluate();
            if (isInt(evalutedNum)) {
              setTotalResult(evalutedNum);
            } else {
              setTotalResult(Number.parseFloat(evalutedNum).toFixed(8));
            }
          }
        }
      }
    } else {
      alert("please add your required equation");
    }
  };

  // function to handle any double operator came after each other.
  // by checking once meet sign the previous character if it was sign also them return TRUE not will return FALSE..
  const checkDoubleSign = () => {
    for (let i = 0; i < operand.length; i++) {
      if (
        operand[i] === "+" ||
        operand[i] === "-" ||
        operand[i] === "/" ||
        operand[i] === "*"
      ) {
        if (
          operand[i - 1] === "+" ||
          operand[i - 1] === "-" ||
          operand[i - 1] === "/" ||
          operand[i - 1] === "*"
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // function to handle points
  const checkPoints = () => {
    let testArray = [];
    for (let i = 0; i < operand.length; i++) {
      if (operand[i] === ".") {
        if (operand[i - 1] === ".") {
          return true;
        }
        if (i > 0) {
          for (let j = i - 1; j >= 0; j--) {
            if (
              operand[j] === "+" ||
              operand[j] === "-" ||
              operand[j] === "/" ||
              operand[j] === "*"
            ) {
              break;
            }
            testArray.push(operand[j]);
          }
        }
        if (i < operand.length - 1) {
          for (let k = i + 1; k < operand.length; k++) {
            if (
              operand[k] === "+" ||
              operand[k] === "-" ||
              operand[k] === "/" ||
              operand[k] === "*"
            ) {
              break;
            }
            testArray.push(operand[k]);
          }
        }

        // console.log(testArray);
        if (testArray.includes(".")) {
          return true;
        }
      }
    }
    return false;
  };

  // Function to check if the number is Integer or not
  function isInt(n) {
    return Number(n) === n && n % 1 === 0;
  }

  return (
    <div className="normalCalculator">
      <section>
        {/* will show calc and result */}
        <header>
          <div id="operation">
            <span>{operand}</span>
          </div>
          <div id="total">
            <span>{totalResult}</span>
          </div>
        </header>
        {/* will have the main functionality for calculator */}
        <main>
          <div className="calculator_left">
            <div
              className="left_numbers"
              onClick={() => handleOperand("seven")}
            >
              <span id="seven">7</span>
            </div>
            <div
              className="left_numbers"
              onClick={() => handleOperand("eight")}
            >
              <span id="eight">8</span>
            </div>
            <div className="left_numbers" onClick={() => handleOperand("nine")}>
              <span id="nine">9</span>
            </div>
            <div className="left_numbers" onClick={() => handleOperand("four")}>
              <span id="four">4</span>
            </div>
            <div className="left_numbers" onClick={() => handleOperand("five")}>
              <span id="five">5</span>
            </div>
            <div className="left_numbers" onClick={() => handleOperand("six")}>
              <span id="six">6</span>
            </div>
            <div className="left_numbers" onClick={() => handleOperand("one")}>
              <span id="one">1</span>
            </div>
            <div className="left_numbers" onClick={() => handleOperand("two")}>
              <span id="two">2</span>
            </div>
            <div
              className="left_numbers"
              onClick={() => handleOperand("three")}
            >
              <span id="three">3</span>
            </div>
            <div
              className="left_numbers number_zero"
              onClick={() => handleOperand("zero")}
            >
              <span id="zero">0</span>
            </div>
            <div
              className="left_numbers"
              onClick={() => handleOperand("point")}
            >
              <span id="point">.</span>
            </div>
            <div
              id="DeleteNumber"
              className="left_numbers"
              onClick={() => handleOperand("del")}
            >
              <span id="del">Del</span>
            </div>
          </div>
          <div className="calculator_right">
            <div
              className="right_operator"
              onClick={() => handleOperand("addNumbers")}
            >
              <span id="addNumbers">+</span>
            </div>
            <div
              className="right_operator"
              onClick={() => handleOperand("deductNumbers")}
            >
              <span id="deductNumbers">-</span>
            </div>
            <div
              className="right_operator"
              onClick={() => handleOperand("multiply")}
            >
              <span id="multiply">*</span>
            </div>
            <div
              className="right_operator"
              onClick={() => handleOperand("divide")}
            >
              <span id="divide">/</span>
            </div>
            <div
              id="resetSign"
              className="right_operator"
              onClick={() => handleOperand("deleteData")}
            >
              <span id="deleteData">AC</span>
            </div>
            <div
              id="equalSign"
              className="right_operator"
              onClick={handleResult}
            >
              <span id="getResult">=</span>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default NormalCalculator;

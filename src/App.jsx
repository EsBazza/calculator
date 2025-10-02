import React, { useState } from "react";
import "./App.css";

function Display({ value }) {
  return <div className="display">{value}</div>;
}

function Button({ label, className = "", onClick }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      aria-label={label}
      type="button"
    >
      {label}
    </button>
  );
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [firstOperand, setFirstOperand] = useState("");
  const [surnameDisplayed, setSurnameDisplayed] = useState(false);

  const fullname = "Amaro Juno Alonzo";
  const surname = "Alonzo";
  const section = "IT3A";

  const resetAll = () => {
    setOperand("");
    setOperator("");
    setFirstOperand("");
    setDisplay("0");
    setSurnameDisplayed(false);
  };

  const handleNumberClick = (digit) => {
    setOperand((prev) => {
      let next;

      if (surnameDisplayed) {
        // Replace surname with the new digit
        next = digit;
        setSurnameDisplayed(false);
      } else if (prev === "" && digit === "0") {
        next = "0";
      } else if (prev === "0") {
        next = digit;
      } else {
        next = prev + digit;
      }

      setDisplay(next);
      return next;
    });
  };

  const handleOperatorClick = (op) => {
    // Ignore if surname currently displayed
    if (surnameDisplayed) return;

    if (operand !== "") {
      if (firstOperand !== "" && operator && operand) {
        computeResult(op);
        return;
      }
      setFirstOperand(operand);
      setOperator(op);
      setOperand("");
      setDisplay(op);
    } else if (firstOperand !== "") {
      setOperator(op);
      setDisplay(op);
    }
  };

  const computeResult = (nextOp = "") => {
    if (surnameDisplayed) return;

    if (firstOperand !== "" && operator !== "" && operand !== "") {
      const a = parseFloat(firstOperand);
      const b = parseFloat(operand);
      let result = 0;

      switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
          if (b === 0) {
            setDisplay("Error");
            resetAll();
            return;
          }
          result = a / b;
          break;
        default:
          result = b;
      }

      const str = result.toString();
      setDisplay(str);
      setOperand(nextOp ? "" : str);
      setFirstOperand(nextOp ? str : "");
      setOperator(nextOp);
    }
  };

  const handleEqualsClick = () => computeResult("");

  const handleClearClick = () => resetAll();

  const handleSurnameClick = () => {
    setOperand(fullname);
    setDisplay(fullname);
    setOperator("");
    setFirstOperand("");
    setSurnameDisplayed(true);
  };

  return (
    <div className="page">
      <h1 className="title">
        Calculator of {fullname} - {section}
      </h1>
      <div className="calc-wrapper">
        <Display value={display} />
        <div className="grid">
          <Button label="7" className="num" onClick={() => handleNumberClick("7")} />
          <Button label="8" className="num" onClick={() => handleNumberClick("8")} />
          <Button label="9" className="num" onClick={() => handleNumberClick("9")} />
          <Button label="÷" className="op" onClick={() => handleOperatorClick("/")} />

          <Button label="4" className="num" onClick={() => handleNumberClick("4")} />
          <Button label="5" className="num" onClick={() => handleNumberClick("5")} />
          <Button label="6" className="num" onClick={() => handleNumberClick("6")} />
          <Button label="*" className="op" onClick={() => handleOperatorClick("*")} />

            <Button label="1" className="num" onClick={() => handleNumberClick("1")} />
            <Button label="2" className="num" onClick={() => handleNumberClick("2")} />
            <Button label="3" className="num" onClick={() => handleNumberClick("3")} />
            <Button label="-" className="op" onClick={() => handleOperatorClick("-")} />

            <Button label="C" className="clear" onClick={handleClearClick} />
            <Button label="0" className="num" onClick={() => handleNumberClick("0")} />
            <Button label="=" className="equal" onClick={handleEqualsClick} />
            <Button label="+" className="op" onClick={() => handleOperatorClick("+")} />
        </div>
        <button
          type="button"
          className="surname-bar"
          onClick={handleSurnameClick}
          aria-label="Surname"
        >
          {surname.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
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
  const [justEvaluated, setJustEvaluated] = useState(false);

  const fullname = "Amaro Juno Alonzo";
  const surname = "Alonzo";
  const section = "IT3A";

  const resetAll = () => {
    setOperand("");
    setOperator("");
    setFirstOperand("");
    setDisplay("0");
    setSurnameDisplayed(false);
    setJustEvaluated(false);
  };

  const startFreshWithDigit = (digit) => {
    setOperand(digit);
    setDisplay(digit);
    setOperator("");
    setFirstOperand("");
    setSurnameDisplayed(false);
    setJustEvaluated(false);
  };

  const handleNumberClick = (digit) => {
    if (surnameDisplayed || justEvaluated) {
      startFreshWithDigit(digit);
      return;
    }

    setOperand((prev) => {
      let next;
      if (prev === "" && digit === "0") {
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
    if (surnameDisplayed) return;

    if (justEvaluated) {
      setFirstOperand(operand || display);
      setOperator(op);
      setOperand("");
      setDisplay(op);
      setJustEvaluated(false);
      return;
    }

    if (operand !== "") {
      if (firstOperand !== "" && operator && operand) {
        const computed = computeResult(op);
        if (computed) {
          setJustEvaluated(false);
        }
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
    if (surnameDisplayed) return false;

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
            return false;
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
      return true;
    }
    return false;
  };

  const handleEqualsClick = () => {
    const didCompute = computeResult("");
    if (didCompute) {
      setJustEvaluated(true);
    }
  };

  const handleClearClick = () => resetAll();

  const handleSurnameClick = () => {
    setOperand(fullname);
    setDisplay(fullname);
    setOperator("");
    setFirstOperand("");
    setSurnameDisplayed(true);
    setJustEvaluated(false);
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

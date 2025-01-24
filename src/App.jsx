import React, { useState, useCallback } from 'react';
import './App.css';

function Display({ input }) {
  return (
    <div className="display">
      <input type="text" value={input} readOnly />
    </div>
  );
}

function Button({ value, onClick, className }) {
  return (
    <button className={`button ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
}

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = useCallback((value) => {
    setInput((prevInput) => prevInput + value);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      const result = eval(input.replace('x', '*'));
      setInput(result.toString());
    } catch {
      setInput('Erro');
    }
  }, [input]);

  const handlePercentage = useCallback(() => {
    try {
      const result = eval(input) / 100;
      setInput(result.toString());
    } catch {
      setInput('Erro');
    }
  }, [input]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display input={input} />
        <div className="buttons">
          <Button value="AC" onClick={handleClear} className="button-gray" />
          <Button value="%" onClick={handlePercentage} className="button-gray" />
          <Button value="+/-" onClick={() => handleClick('-')} className="button-gray" />
          <Button value="÷" onClick={handleClick} className="button-orange" />

          <Button value="7" onClick={handleClick} />
          <Button value="8" onClick={handleClick} />
          <Button value="9" onClick={handleClick} />
          <Button value="x" onClick={() => handleClick('*')} className="button-orange" />

          <Button value="4" onClick={handleClick} />
          <Button value="5" onClick={handleClick} />
          <Button value="6" onClick={handleClick} />
          <Button value="-" onClick={handleClick} className="button-orange" />

          <Button value="1" onClick={handleClick} />
          <Button value="2" onClick={handleClick} />
          <Button value="3" onClick={handleClick} />
          <Button value="+" onClick={handleClick} className="button-orange" />

          <Button value="0" onClick={handleClick} className="button-zero" />
          <Button value="." onClick={handleClick} />
          <Button value="=" onClick={handleCalculate} className="button-orange" />
        </div>
      </div>
    </div>
  );
}

export default Calculator;

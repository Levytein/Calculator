import { useState } from 'react';
import { evaluate, format } from 'mathjs';

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleClick = (value) => {
    if (isEvaluated) {
      if (/[\+\-\*\/]/.test(value)) {
        setInput(result + value);
      } else {
        setInput(value);
      }
      setIsEvaluated(false);
      setResult('');
      return;
    }

    if (input === '0' && value !== '.') {
      setInput(value);
      return;
    }

    if (value === '.') {
      const segments = input.split(/[\+\-\*\/]/);
      const currentSegment = segments[segments.length - 1];
      if (currentSegment.includes('.')) {
        return;
      }
    }

    if (/[\+\-\*\/]/.test(value)) {
      const lastChar = input[input.length - 1];

      if (/[\+\-\*\/]/.test(lastChar)) {
        // Handle the scenario where a negative sign is being used to indicate a negative number
        if (value === '-' && /[\+\*\/]/.test(lastChar)) {
          setInput(input + value);
          return;
        } else {
          setInput(input.slice(0, -1) + value);
          return;
        }
      }
    }

    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('0');
    setResult('');
    setIsEvaluated(false);
  };

  const handleCalculate = () => {
    try {
      let moldableInput = input;

      
      if (moldableInput.length >= 3) {
        const secondLastChar = moldableInput[moldableInput.length - 2];
        const thirdLastChar = moldableInput[moldableInput.length - 3];
        if (secondLastChar === '+' && thirdLastChar === '*') {
            moldableInput = moldableInput.slice(0, -3) + `+` + moldableInput.slice(-1);
        }
      }

      const evaluationResult = evaluate(moldableInput);
      setResult(format(evaluationResult, { precision: 4 }));
      setInput(format(evaluationResult, { precision: 4 })); 
      setIsEvaluated(true);
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className='font-mono text-7xl'>Calculator App</h2>
        <h4 className='font-sans text-2xl text-cyan-400'>Designed and Coded by Giho Ju</h4>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg ">
        <div className="mb-4">
          <input
            type="text"
            value={isEvaluated ? result : input}
            readOnly
            id="display"
            className="w-64 p-4 mb-2 text-right border border-gray-700 rounded bg-gray-900 text-white text-3xl"
          />
          <button
            onClick={handleClear}
            className="ml-2 p-4 px-6 bg-red-600 hover:bg-red-700 text-white rounded text-3xl" 
            id="clear"
          >
            C
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => handleClick('1')} id="one" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">1</button>
          <button onClick={() => handleClick('2')} id="two" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">2</button>
          <button onClick={() => handleClick('3')} id="three" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">3</button>
          <button onClick={() => handleClick('+')} id="add" className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded">+</button>
          <button onClick={() => handleClick('4')} id="four" className="p-6 bg-gray-600  hover:bg-gray-700 rounded">4</button>
          <button onClick={() => handleClick('5')} id="five" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">5</button>
          <button onClick={() => handleClick('6')} id="six" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">6</button>
          <button onClick={() => handleClick('-')} id="subtract" className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded">-</button>
          <button onClick={() => handleClick('7')} id="seven" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">7</button>
          <button onClick={() => handleClick('8')} id="eight" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">8</button>
          <button onClick={() => handleClick('9')} id="nine" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">9</button>
          <button onClick={() => handleClick('*')} id="multiply" className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded">*</button>
          <button onClick={() => handleClick('0')} id="zero" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">0</button>
          <button onClick={() => handleClick('.')} id="decimal" className="p-6 bg-gray-600 hover:bg-gray-700 rounded">.</button>
          <button onClick={handleCalculate} id="equals" className="p-6 bg-green-600 hover:bg-gray-700 text-white rounded">=</button>
          <button onClick={() => handleClick('/')} id="divide" className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded">/</button>
        </div>
        
      </div>
    </div>
  );
};

export default Calculator;

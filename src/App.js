import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');

  // Function to generate digits
  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          key={i}
          onClick={() => setInput(input + i)}
          className="p-4 bg-gray-900 text-white"
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  // Function to handle operator clicks
  const handleOperatorClick = (operator) => {
    if (!input || /[+\-*/.]$/.test(input)) {
      toast.error('You cannot add two consecutive operators.');
      return;
    }
    setInput(input + operator);
  };

  // Calculate the result when "=" is pressed
  const handleEqualClick = () => {
    if (!input) {
      toast.error('There is nothing to calculate.');
      return;
    }

    // Check that the input does not end with an operator
    if (/[+\-*/.]$/.test(input[input.length - 1])) {
      toast.error('The operation cannot end with an operator.');
      return;
    }

    try {
      setInput(eval(input).toString());
      setResult(eval(input).toString());
      toast.success('Calculation completed successfully.');
    } catch {
      toast.error('Error in the calculation.');
      setInput('Error');
    }
  };

  // Call the calculation function each time the input changes
  React.useEffect(() => {
    if (input && !/[+\-*/.]$/.test(input)) {
      try {
        setResult(eval(input).toString());
      } catch {
        setResult('Error');
      }
    }
  }, [input]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 text-gray-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Display */}
        <div className="p-4 bg-gray-900 text-gray-100 text-right text-2xl font-light">
          <span className="text-sm text-gray-400">({result})</span> {input || '0'}
        </div>

        {/* Operators (Top Row) */}
        <div className="flex bg-blue-600">
          <button
            onClick={() => handleOperatorClick('/')}
            className="flex-1 p-4 text-white font-bold"
          >
            /
          </button>
          <button
            onClick={() => handleOperatorClick('*')}
            className="flex-1 p-4 text-white font-bold"
          >
            *
          </button>
          <button
            onClick={() => handleOperatorClick('-')}
            className="flex-1 p-4 text-white font-bold"
          >
            -
          </button>
          <button
            onClick={() => handleOperatorClick('+')}
            className="flex-1 p-4 text-white font-bold"
          >
            +
          </button>
          <button
            onClick={() => {
              if (input) {
                setInput(input.slice(0, -1));
              } else {
                toast.info('Nothing to delete.');
              }
            }}
            className="flex-1 p-4 text-white font-bold"
          >
            DEL
          </button>
        </div>

        {/* Digits */}
        <div className="grid grid-cols-3">
          {createDigits()}
          <button
            onClick={() => setInput(input + '0')}
            className="p-4 bg-gray-900 text-white"
          >
            0
          </button>
          <button
            onClick={() => setInput(input + '.')}
            className="p-4 bg-gray-900 text-white"
          >
            .
          </button>
          <button
            onClick={handleEqualClick}
            className="p-4 bg-blue-600 text-white"
          >
            =
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;

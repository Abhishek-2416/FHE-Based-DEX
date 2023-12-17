"use client";

import React, { useState } from 'react';

type Props = {};

const Swap = (props: Props) => {
  const [inputValue1, setInputValue1] = useState<number | string>('');
  const [inputValue2, setInputValue2] = useState<number | string>('');

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(event.target.value);
  };

  const handleSwap = () => {
    // Implement your swap logic here using the input values
    console.log('Swapping:', inputValue1, inputValue2);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 w-full space-y-2 my-6">
        <div className="relative sm:mb-0 flex-grow w-full">
          <input
            type="number"
            placeholder="0.00"
            id="number1"
            value={inputValue1}
            onChange={handleInputChange1}
            className="w-full bg-[#0a0a0a20] bg-opacity-40 rounded-lg border border-gray-700 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative sm:mb-0 flex-grow w-full">
          <input
            type="number"
            placeholder="0.00"
            id="number2"
            value={inputValue2}
            onChange={handleInputChange2}
            className="w-full bg-[#0a0a0a20] bg-opacity-40 rounded-lg border border-gray-700 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          onClick={handleSwap}
          className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded-lg text-lg"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default Swap;

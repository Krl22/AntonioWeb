import React from "react";

const Question = ({ question, options, onAnswer }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">{question}</p>
      <div className="flex space-x-4">
        {options.map((option, index) => (
          <button
            key={index}
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={() => onAnswer(option.isCorrect)}
          >
            {option.answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;

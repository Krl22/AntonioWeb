import React from "react";

const AttributeSelector = ({ attribute, options, onChange }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-lg font-medium">
        {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
      </h3>
      <div className="flex space-x-2 overflow-x-scroll">
        {options.map((option, index) => (
          <button
            key={index}
            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full"
            onClick={() => onChange(attribute, option)}
          >
            <img
              src={option}
              alt={attribute}
              className="object-cover w-full h-full rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttributeSelector;

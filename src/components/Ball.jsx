import React from "react";

const Ball = ({ position }) => {
  return (
    <div
      className="absolute w-8 h-8 bg-red-500 rounded-full"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    ></div>
  );
};

export default Ball;

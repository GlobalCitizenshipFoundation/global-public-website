import React from "react";

interface LineProps {
  className?: string;
}

const BreakLine: React.FC<LineProps> = ( {className} ) => {
  return (
    <hr className={`w-full h-[1px] outline-none border-none bg-line ${className}`}/>
  );
};

export default BreakLine;

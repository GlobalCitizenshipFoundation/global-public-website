import React from 'react';

interface LineProps {
  className?: string;
}

const BreakLine: React.FC<LineProps> = ({ className }) => {
  return <hr className={`bg-line h-[1px] w-full border-none outline-none ${className}`} />;
};

export default BreakLine;

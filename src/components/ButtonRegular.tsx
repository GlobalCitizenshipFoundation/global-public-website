import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonRegular: React.FC<ButtonProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`w-ful bg-gray flex h-11 cursor-pointer items-center justify-center rounded-lg transition-all duration-300 hover:bg-purple-400 ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonRegular;

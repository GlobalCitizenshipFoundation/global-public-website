import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonRegular: React.FC<ButtonProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-center items-center w-ful h-11 rounded-lg bg-gray ${className}`}>
      {children}
    </div>
  );
};

export default ButtonRegular;

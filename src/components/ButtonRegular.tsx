import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonRegular: React.FC<ButtonProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-center items-center w-ful h-11 cursor-pointer rounded-lg bg-gray hover:bg-purple-400 duration-300 transition-all ${className}`}>
      {children}
    </div>
  );
};

export default ButtonRegular;

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonRegular: React.FC<ButtonProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-gray flex h-11 w-full cursor-pointer items-center justify-center rounded-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonRegular;

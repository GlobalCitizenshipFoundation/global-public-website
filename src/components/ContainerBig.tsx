import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerBig: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`lg:max-w-[1149.5px] mx-auto px-[50px] ${className}`}>
      {children}
    </div>
  );
};

export default ContainerBig;

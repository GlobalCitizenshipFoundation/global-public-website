import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`lg:max-w-[1612.62px] mx-auto px-[50px] ${className}`}>
      {children}
    </div>
  );
};

export default Container;

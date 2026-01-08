import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerBig: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={`mx-auto px-[50px] lg:max-w-[1199.5px] ${className}`}>{children}</div>;
};

export default ContainerBig;

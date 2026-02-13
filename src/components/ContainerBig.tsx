import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerBig: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-[50px] lg:max-w-[1199.5px] min-w-0 ${className}`}>
      {children}
    </div>
  );
};


export default ContainerBig;

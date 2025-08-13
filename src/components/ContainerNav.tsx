import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerNav: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto px-[50px] lg:max-w-[1770px] lg:px-[20px] ${className}`}>
      {children}
    </div>
  );
};

export default ContainerNav;

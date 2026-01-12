import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerRegular: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto px-12.5 lg:max-w-[1612.62px] lg:px-0 ${className}`}>{children}</div>
  );
};

export default ContainerRegular;

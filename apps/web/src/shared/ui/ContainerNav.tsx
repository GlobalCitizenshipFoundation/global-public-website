import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerNav: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto px-12.5 lg:max-w-442.5 lg:px-5 ${className}`}>
      {children}
    </div>
  );
};

export default ContainerNav;

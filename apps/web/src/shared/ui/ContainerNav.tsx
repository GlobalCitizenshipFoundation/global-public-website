import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerNav: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={['w-full px-[clamp(20px,6vw,100px)]', className].join(' ')}>
      <div className="mx-auto w-full max-w-432.5">{children}</div>
    </div>
  );
};

export default ContainerNav;

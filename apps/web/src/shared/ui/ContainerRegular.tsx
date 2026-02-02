import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerRegular: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={[
        'mx-auto w-full max-w-[1600px]',
        // < 479px: płynnie maleje, max 50px
        'px-[clamp(16px,11vw,50px)]',
        // >= 479px: zawsze 50px
        '[@media(min-width:479px)]:px-[50px]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default ContainerRegular;

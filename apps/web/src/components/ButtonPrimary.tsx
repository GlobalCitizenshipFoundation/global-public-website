import Link from 'next/link';
import React from 'react';

interface ContainerProps {
  width: number;
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonPrimary: React.FC<ContainerProps> = ({ children, className = '', width, href }) => {
  return (
    <Link
      href={href}
      style={{ width: `${width}px` }}
      className={`flex h-[59px] cursor-pointer ${className}`}
    >
      <div
        style={{ width: `${width - 70}px` }}
        className={`bg-primary flex items-center justify-center rounded-tl-[10px] rounded-bl-[10px] text-xl text-white`}
      >
        {children}
      </div>
      <div className="border-frames solid flex h-full grow items-center justify-center rounded-tr-[10px] rounded-br-[10px] border-[1.5px] bg-white">
        <img src="/images/arrow.svg" alt="" className="" />
      </div>
    </Link>
  );
};

export default ButtonPrimary;

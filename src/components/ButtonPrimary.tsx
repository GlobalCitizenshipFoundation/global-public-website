import Link from "next/link";
import React from "react";

interface ContainerProps {
    width: number;
    href: string;
    children: React.ReactNode;
    className?: string;
}

const ButtonPrimary: React.FC<ContainerProps> = ({ children, className = "", width, href }) => {
    return (
        <Link href={href} style={{width: `${width}px`}} className={`h-[59px] cursor-pointer flex ${className}`}>
            <div style={{width: `${width - 70}px`}} className={`flex justify-center items-center bg-primary rounded-tl-[10px] rounded-bl-[10px] text-white text-xl`}>{children}</div>
            <div className='h-full grow bg-white flex justify-center items-center border-[1.5px] border-frames solid rounded-tr-[10px] rounded-br-[10px]'>
                <img src="/images/arrow.svg" alt="" className=''/>
            </div>
        </Link>
    );
};

export default ButtonPrimary;
            
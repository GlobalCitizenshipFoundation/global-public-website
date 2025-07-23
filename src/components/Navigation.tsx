import React from "react";
import Link from "next/link";
import { navigation } from "../../data/navigation";
import ContainerNav from "./ContainerNav";
import ButtonPrimary from "./ButtonPrimary";

const Navigation: React.FC = () => {
  return (
    <ContainerNav>
        <nav className="flex justify-between items-center py-[23px] h-[52px] lg:h-[99px] lg:py-[36px] box-content">
            <img src="/images/logo.png" alt="global-citizenship-fundation-logo" className="w-auto h-full object-cover mr-5"/>
            <div className="hidden lg:flex h-auto lg:ml-auto items-center gap-x-[46px]">
                {navigation.map((item) =>
                    item.type === 'button' ? (
                    <Link
                        key={item.label}
                        href={item.href}
                        className=""
                    >
                        <ButtonPrimary width={187}>
                            Contact
                        </ButtonPrimary>
                    </Link>
                    ) : (
                    <Link href={item.href} key={item.label} className="flex items-center flex-row h-[50%] justify-between">
                        <span className="text-lg font-medium font-inter text-gray mr-[6px] whitespace-nowrap">
                            {item.label}
                        </span>
                        <img
                            src="/images/arrow-down.png"
                            alt=""
                            className="object-cover"
                        />
                    </Link>
                    )
                )}
            </div>

            <div className="flex items-center lg:hidden gap-2.5 h-11">
                <button className="h-full w-[99px] bg-primary rounded-md flex justify-center items-center">
                    <p className="text-[16px] text-white font-medium">
                        Contact
                    </p>
                    </button>
                <button className="w-11 h-full flex justify-center items-center bg-gray rounded-md">
                    <img src="/images/burger.svg" alt="burger" />
                </button>
            </div>
        </nav>
    </ContainerNav>
  );
};

export default Navigation;

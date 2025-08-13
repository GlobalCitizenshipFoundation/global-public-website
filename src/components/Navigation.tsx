import React from 'react';
import Link from 'next/link';
import { navigation } from '../../data/navigation';
import ContainerNav from './ContainerNav';
import ButtonPrimary from './ButtonPrimary';

const Navigation: React.FC = () => {
  return (
    <ContainerNav>
      <nav className="box-content flex h-[52px] items-center justify-between py-[23px] lg:h-[99px] lg:py-[36px]">
        <Link href={'/'} className="h-full">
          <img
            src="/images/logo.png"
            alt="global-citizenship-fundation-logo"
            className="mr-5 h-full w-auto object-cover"
          />
        </Link>
        <div className="hidden h-auto items-center gap-x-[46px] lg:ml-auto lg:flex">
          {navigation.map((item) =>
            item.type === 'button' ? (
              <ButtonPrimary href={item.href} width={187} key={item.label}>
                Contact
              </ButtonPrimary>
            ) : (
              <Link
                href={item.href}
                key={item.label}
                className="flex h-[50%] flex-row items-center justify-between"
              >
                <span className="font-inter text-gray mr-[6px] text-lg font-medium whitespace-nowrap">
                  {item.label}
                </span>
                <img src="/images/arrow-down.png" alt="" className="object-cover" />
              </Link>
            )
          )}
        </div>

        <div className="flex h-11 items-center gap-2.5 lg:hidden">
          <button className="bg-primary flex h-full w-[99px] items-center justify-center rounded-md">
            <p className="text-[16px] font-medium text-white">Contact</p>
          </button>
          <button className="bg-gray flex h-full w-11 items-center justify-center rounded-md">
            <img src="/images/burger.svg" alt="burger" />
          </button>
        </div>
      </nav>
    </ContainerNav>
  );
};

export default Navigation;

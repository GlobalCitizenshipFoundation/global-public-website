'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { navigation } from '../../data/navigation';
import ContainerNav from './ContainerNav';
import ButtonPrimary from './ButtonPrimary';

const Navigation: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === label ? null : label);
  };

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
            ) : item.dropdown ? (
              // Element z rozwijaną listą
              <div key={item.label} className="relative">
                <div className="flex h-[50%] flex-row items-center justify-between gap-2">
                  <Link
                    href={item.href}
                    className="font-inter text-gray text-lg font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                  <button
                    onClick={(e) => toggleDropdown(item.label, e)}
                    className="flex items-center justify-center p-1"
                  >
                    <img
                      src="/images/arrow-down.png"
                      alt="toggle dropdown"
                      className={`object-cover transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Rozwijana lista */}
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-lg bg-white shadow-xl border border-gray-100">
                    <ul className="py-2">
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="block px-6 py-3 text-gray hover:bg-gray-50 transition-colors font-inter text-base"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              // Zwykły link bez dropdown
              <Link
                href={item.href}
                key={item.label}
                className="flex h-[50%] flex-row items-center justify-between"
              >
                <span className="font-inter text-gray text-lg font-medium whitespace-nowrap">
                  {item.label}
                </span>
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
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  ariaDisabled?: boolean;
};

const ButtonPrimary: React.FC<Props> = ({
  href,
  children,
  className = '',
  ariaLabel,
  onClick,
  ariaDisabled = false,
}) => {
  const linkProps: React.ComponentProps<typeof Link> = {
    href,
    className: [
      'group inline-grid h-14.75 w-full grid-cols-[1fr_64px] overflow-hidden rounded-[10px]',
      'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      ariaDisabled ? 'pointer-events-none opacity-60' : '',
      className,
    ].join(' '),
    ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
    ...(ariaDisabled ? { 'aria-disabled': true, tabIndex: -1 } : {}),
    ...(onClick ? { onClick } : {}),
  };

  return (
    <Link {...linkProps}>
      <span className="bg-primary flex items-center justify-center px-6 text-xl font-semibold text-white">
        {children}
      </span>

      <span className="border-frames flex items-center justify-center border-[1.5px] bg-white">
        <Image
          src="/images/arrow.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
};

export default ButtonPrimary;

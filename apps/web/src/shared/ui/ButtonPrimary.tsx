import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string; // wrapper
  labelClassName?: string; // lewy span (tekst)
  iconClassName?: string; // prawy span (ikona)
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  ariaDisabled?: boolean;
};

const ButtonPrimary: React.FC<Props> = ({
  href,
  children,
  className = '',
  labelClassName = '',
  iconClassName = '',
  ariaLabel,
  onClick,
  ariaDisabled = false,
}) => {
  const linkClassName = [
    // shrink-safe
    'group inline-grid w-full max-w-full min-w-0 overflow-hidden rounded-[10px]',

    // jeden suwak na rozmiar buttona
    '[--btn-h:56px] h-[var(--btn-h)]',

    // prawa kolumna też nie może być betonem 64px
    '[grid-template-columns:1fr_clamp(40px,calc(var(--btn-h)*1.0),64px)]',

    'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
    ariaDisabled ? 'pointer-events-none opacity-60' : '',
    className,
  ].join(' ');

  const linkProps: React.ComponentProps<typeof Link> = {
    href,
    className: linkClassName,
    ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
    ...(ariaDisabled ? { 'aria-disabled': true, tabIndex: -1 } : {}),
    ...(onClick ? { onClick } : {}),
  };

  return (
    <Link {...linkProps}>
      <span
        className={[
          // ważne: min-w-0 + truncate, żeby nigdy nie wypychało layoutu
          'bg-primary flex min-w-0 items-center justify-center truncate font-semibold text-white',

          // padding bardziej “schodzi” w dół na małych rozmiarach
          // X: 8..20, Y: 6..12
          'px-[clamp(8px,calc(var(--btn-h)*0.34),20px)]',
          'py-[clamp(6px,calc(var(--btn-h)*0.18),12px)]',

          // font: 12..18 (dla 56px zwykle wyląduje ~16-18)
          'text-[clamp(12px,calc(var(--btn-h)*0.30),18px)]',

          labelClassName,
        ].join(' ')}
        title={typeof children === 'string' ? children : undefined}
      >
        {children}
      </span>

      <span
        className={[
          'border-frames flex items-center justify-center rounded-r-xl border-[1.5px] bg-white',
          iconClassName,
        ].join(' ')}
      >
        <Image
          src="/images/arrow.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="[height:clamp(16px,calc(var(--btn-h)*0.40),24px)] [width:clamp(16px,calc(var(--btn-h)*0.40),24px)] transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
};

export default ButtonPrimary;

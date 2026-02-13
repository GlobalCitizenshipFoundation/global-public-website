import Link from 'next/link';
import React, { ComponentType, ReactNode } from 'react';

export interface SocialLinkProps {
  label?: string;
  icon: ReactNode | ComponentType<any>;
  href: string;
  variant?: 'button' | 'inline' | 'vertical' | 'horizontal';
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  label,
  icon,
  href,
  variant = 'button',
  hoverColor = 'bg-primary',
  bgColor = 'bg-white',
  textColor = 'text-gray',
  className = '',
}) => {
  const baseClasses = 'transition-all duration-300 ease-in-out';

  const variants = {
    button: `flex items-center justify-center w-[52px] h-[52px] rounded-md ${bgColor} hover:bg-primary`,
    inline: `flex items-center gap-[7px]`,
    vertical: `flex flex-col items-center gap-1`,
    horizontal: `flex items-center gap-1`,
  };

  const labelClasses = {
    inline: `text-[16px] text-borders group-hover:text-primary`,
    vertical: `text-[14px] text-borders group-hover:text-primary`,
    horizontal: `hidden sm:inline text-[14px] text-borders group-hover:text-primary`, // <-- ukryte na mobile
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${variants[variant]} ${baseClasses} ${className}`}
    >
      <span
        className={`text-xl text-current ${baseClasses} ${
          variant === 'button'
            ? 'group-hover:text-[#FFF]'
            : variant === 'inline' || variant === 'horizontal'
            ? 'group-hover:text-primary'
            : ''
        }`}
      >
        {typeof icon === 'function' ? React.createElement(icon) : icon}
      </span>

      {(variant === 'inline' || variant === 'vertical' || variant === 'horizontal') && label && (
        <span className={labelClasses[variant]}>{label}</span>
      )}
    </Link>
  );
};

export default SocialLink;

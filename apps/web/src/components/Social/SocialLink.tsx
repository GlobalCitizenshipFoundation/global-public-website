import Link from 'next/link';
import React, { type ComponentType, type ReactNode, type SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface SocialLinkProps {
  label?: string;
  icon: ReactNode | IconComponent;
  href: string;
  variant?: 'button' | 'inline' | 'vertical';
  hoverColor?: string; // tailwind class e.g. "hover:bg-primary"
  bgColor?: string; // tailwind class e.g. "bg-white"
  textColor?: string; // tailwind class e.g. "text-gray-700"
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  label,
  icon,
  href,
  variant = 'button',
  hoverColor = 'hover:bg-primary',
  bgColor = 'bg-white',
  textColor = 'text-gray',
  className = '',
}) => {
  const baseClasses = 'transition-all duration-300 ease-in-out';

  const variants: Record<NonNullable<SocialLinkProps['variant']>, string> = {
    button: `flex items-center justify-center w-[52px] h-[52px] rounded-md ${bgColor} ${hoverColor}`,
    inline: 'flex items-center gap-[7px]',
    vertical: 'flex flex-col items-center gap-1',
  };

  const labelClasses: Record<'inline' | 'vertical', string> = {
    inline: 'text-[16px] text-borders group-hover:text-primary',
    vertical: 'text-[14px] text-borders group-hover:text-primary',
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${variants[variant]} ${baseClasses} ${textColor} ${className}`}
    >
      <span
        className={`text-xl text-current ${baseClasses} ${
          variant === 'button'
            ? 'group-hover:text-[#FFF]'
            : variant === 'inline'
              ? 'group-hover:text-primary'
              : ''
        }`}
      >
        {typeof icon === 'function' ? React.createElement(icon) : icon}
      </span>

      {(variant === 'inline' || variant === 'vertical') && label && (
        <span className={labelClasses[variant]}>{label}</span>
      )}
    </Link>
  );
};

export default SocialLink;

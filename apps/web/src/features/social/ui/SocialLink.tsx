"use client";

import type { SocialName } from "@/shared/config/social";
import { socialIcons } from "@/shared/config/social-icons";

interface SocialLinkProps {
  label?: string;
  kind: SocialName; // <-- zamiast icon
  href: string;
  variant?: "button" | "inline" | "vertical";
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  label,
  kind,
  href,
  variant = "button",
  hoverColor = "hover:bg-primary",
  bgColor = "bg-white",
  textColor = "text-gray",
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  const baseClasses = "transition-all duration-300 ease-in-out";

  const variants: Record<NonNullable<SocialLinkProps["variant"]>, string> = {
    button: `flex items-center justify-center w-[52px] h-[52px] rounded-md ${bgColor} ${hoverColor}`,
    inline: "flex items-center gap-[7px]",
    vertical: "flex flex-col items-center gap-1",
  };

  const labelClasses: Record<"inline" | "vertical", string> = {
    inline: "text-[16px] text-borders group-hover:text-primary",
    vertical: "text-[14px] text-borders group-hover:text-primary",
  };

  const Icon = socialIcons[kind];

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group ${variants[variant]} ${baseClasses} ${textColor} ${className}`}
      aria-label={label ?? kind}
      title={label ?? kind}
    >
      <span
        className={`text-xl text-current ${baseClasses} ${
          variant === "button"
            ? "group-hover:text-[#FFF]"
            : variant === "inline"
              ? "group-hover:text-primary"
              : ""
        }`}
      >
        <Icon aria-hidden={true} />
      </span>

      {(variant === "inline" || variant === "vertical") && label && (
        <span className={labelClasses[variant]}>{label}</span>
      )}
    </a>
  );
};

export default SocialLink;

import React from "react";
import { cn } from "@/shared/lib/cn";

type ContainerVariant = "regular" | "big" | "header" | "footer";

type CommonProps = {
  children: React.ReactNode;
  className?: string; // klasa na OUTER wrapperze
  as?: React.ElementType;
  variant?: ContainerVariant;
};

type HeaderProps = CommonProps & {
  variant: "header";
  innerClassName?: string; // klasa na INNER
};

type NonHeaderProps = CommonProps & {
  variant?: Exclude<ContainerVariant, "header">;
  innerClassName?: never;
};

type Props = HeaderProps | NonHeaderProps;

const defaultTagByVariant: Partial<Record<ContainerVariant, React.ElementType>> = {
  header: "header",
  footer: "footer",
};

const Container: React.FC<Props> = (props) => {
  const { children, className, as } = props;
  const variant: ContainerVariant = props.variant ?? "regular";

  const Tag: React.ElementType = as ?? defaultTagByVariant[variant] ?? "div";

  if (variant === "header") {
    const { innerClassName } = props;
    return (
      <Tag className={cn("w-full px-[clamp(20px,6vw,100px)]", className)}>
        <div className={cn("mx-auto w-full max-w-432.5", innerClassName)}>{children}</div>
      </Tag>
    );
  }

  if (variant === "footer" || variant === "regular") {
    return (
      <Tag className={cn("w-full px-12.5", className)}>
        <div className="mx-auto w-full lg:max-w-[1110px]">{children}</div>
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "w-full",
        "px-[clamp(16px,11vw,50px)]",
        "[@media(min-width:479px)]:px-12.5",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-400">{children}</div>
    </Tag>
  );
};

export default Container;

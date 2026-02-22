import * as React from "react";
import { cn } from "@/shared/lib/cn";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingTag;
};

export function Heading({ as = "h2", className, ...rest }: HeadingProps) {
  return React.createElement(as, {
    ...rest,
    className: cn("text-titles font-semibold", className),
  });
}

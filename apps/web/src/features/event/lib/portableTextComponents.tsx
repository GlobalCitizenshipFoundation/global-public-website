import React from "react";
import type { PortableTextComponents } from "@portabletext/react";
import { cn } from "@/shared/lib/cn";

type Options = {
  pClassName?: string;
  h2ClassName?: string;
  h3ClassName?: string;
};

export function createPortableTextComponents({
  pClassName,
  h2ClassName,
  h3ClassName,
}: Options = {}): PortableTextComponents {
  return {
    block: {
      h2: ({ children }) => (
        <h2 className={cn("text-titles text-2xl lg:text-[42px]", h2ClassName)}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={cn("text-titles text-xl font-semibold lg:text-3xl", h3ClassName)}>
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className={cn("text-body text-sm lg:text-2xl", pClassName)}>{children}</p>
      ),
    },
  };
}

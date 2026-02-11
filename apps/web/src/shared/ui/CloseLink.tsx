// src/shared/ui/CloseLink.tsx
"use client";

import Link from "next/link";
import React from "react";

type Props = React.ComponentProps<typeof Link> & {
  onBeforeNavigate?: () => void;
};

export default function CloseLink({ onBeforeNavigate, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        onBeforeNavigate?.();
        onClick?.(e);
      }}
    />
  );
}

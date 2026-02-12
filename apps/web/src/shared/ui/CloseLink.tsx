"use client";

import Link from "next/link";

type Props = React.ComponentProps<typeof Link> & {
  onBeforeNavigate?: () => void;
};

export function CloseLink({ onBeforeNavigate, onClick, ...props }: Props) {
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

import React from "react";

type Props = { children: React.ReactNode };

export default function SectionHeading({ children }: Props) {
  return <h2 className="text-titles text-2xl lg:text-[42px]">{children}</h2>;
}

"use client";

import { useState } from "react";
import { cn } from "../lib/cn";
import Image from "next/image";

type Faq = {
  title: string;
  answer: string;
};

type Props = {
  faq: Faq;
};

export function FaqItem({ faq }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={cn("border-2 rounded-xl border-[#DFDFDF] mb-4 transition-all duration-400", {
        "border-[#ffffff] bg-[#ffffff]": isOpen,
      })}
    >
      <div
        className="flex justify-between gap-4 px-6 py-4 lg:px-12 lg:py-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg md:text-xl text-black">{faq.title}</h3>
        <Image
          width={12}
          height={21}
          src="/images/TriangleArrow-left.svg"
          alt="prev-slide"
          className={cn(
            "brightness-0 transition-all duration-400",
            isOpen ? "rotate-270" : "rotate-180",
          )}
        />
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-400",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 lg:px-12 pb-6 pt-2 lg:pb-10 pt-2">
          <p className="">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

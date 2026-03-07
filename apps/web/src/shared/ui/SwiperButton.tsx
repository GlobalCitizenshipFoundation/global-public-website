import { cn } from "../lib/cn";
import { forwardRef } from "react";
import Image from "next/image";

type Props = {
  direction: "prev" | "next";
  className?: string;
  isDisabled?: boolean;
  name?: string;
};

export const SwiperButton = forwardRef<HTMLDivElement, Props>(
  ({ direction, isDisabled, className, name }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-13.75 h-13.75 rounded-full flex justify-center items-center cursor-pointer bg-[#EE435C]",
          direction === "prev" ? `${name}-prev` : `${name}-next`,
          isDisabled ? "bg-[#222222]" : "",
          "[&.swiper-button-disabled]:bg-[#222222]",
          className,
        )}
      >
        {direction === "prev" && (
          <Image
            width={12}
            height={21}
            src="/images/TriangleArrow-left.svg"
            alt="prev-slide"
            className="translate-x-[-2px]"
          />
        )}
        {direction === "next" && (
          <Image
            width={12}
            height={21}
            src="/images/TriangleArrow-right.svg"
            alt="next-slide"
            className="translate-x-[2px]"
          />
        )}
      </div>
    );
  },
);

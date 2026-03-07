import { cn } from "../lib/cn";
import { forwardRef } from "react";

type Props = {
  direction: "prev" | "next";
  className?: string;
  isDisabled?: boolean;
};

export const SwiperButton = forwardRef<HTMLDivElement, Props>(
  ({ direction, isDisabled, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-13.75 h-13.75 rounded-full flex justify-center items-center cursor-pointer bg-[#EE435C]",
          direction === "prev" ? `${className}-prev` : `${className}-next`,
          isDisabled ? "bg-[#222222]" : "",
          "[&.swiper-button-disabled]:bg-[#222222]",
        )}
      >
        {direction === "prev" && (
          <img
            src="/images/TriangleArrow-left.svg"
            alt="prev-slide"
            className="translate-x-[-2px]"
          />
        )}
        {direction === "next" && (
          <img
            src="/images/TriangleArrow-right.svg"
            alt="next-slide"
            className="translate-x-[2px]"
          />
        )}
      </div>
    );
  },
);

"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
  children: React.ReactNode;
  step?: number;
};

const BUTTON_SIZE = 60;
const SOLID_WIDTH = 68;
const OVERLAY_WIDTH = 112;

export default function HorizontalScroller({ children, step = 220 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = ref.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scrollByAmount = (left: number) => {
    ref.current?.scrollBy({
      left,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState);

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    resizeObserver.observe(el);

    const content = el.firstElementChild;
    if (content instanceof HTMLElement) {
      resizeObserver.observe(content);
    }

    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <div className="relative w-full">
      {canScrollLeft && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-[1] h-full"
            style={{
              width: `${OVERLAY_WIDTH}px`,
              background: `linear-gradient(
                to right,
                var(--color-background-darker) 0,
                var(--color-background-darker) ${SOLID_WIDTH}px,
                transparent 100%
              )`,
            }}
          />

          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-step)}
            className="
              absolute left-0 top-1/2 z-[2] -translate-y-1/2
              grid cursor-pointer place-items-center rounded-full
              border border-secondary-borders bg-[var(--color-background-darker)] shadow-sm
              transition-colors hover:brightness-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
            "
            style={{
              width: `${BUTTON_SIZE}px`,
              height: `${BUTTON_SIZE}px`,
            }}
          >
            <FaChevronLeft className="text-lg" aria-hidden="true" />
          </button>
        </>
      )}

      <div
        ref={ref}
        className="
          overflow-x-auto
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="w-max">{children}</div>
      </div>

      {canScrollRight && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-[1] h-full"
            style={{
              width: `${OVERLAY_WIDTH}px`,
              background: `linear-gradient(
                to left,
                var(--color-background-darker) 0,
                var(--color-background-darker) ${SOLID_WIDTH}px,
                transparent 100%
              )`,
            }}
          />

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(step)}
            className="
              absolute right-0 top-1/2 z-[2] -translate-y-1/2
              grid cursor-pointer place-items-center rounded-full
              border border-secondary-borders bg-[var(--color-background-darker)] shadow-sm
              transition-colors hover:brightness-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
            "
            style={{
              width: `${BUTTON_SIZE}px`,
              height: `${BUTTON_SIZE}px`,
            }}
          >
            <FaChevronRight className="text-lg" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

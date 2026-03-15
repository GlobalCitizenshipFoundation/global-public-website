"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { RelatedContributorsType } from "@gcf/types";

// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Contributor } from "./Contributor";
import { cn } from "@/shared/lib/cn";

type Props = {
  contributors: RelatedContributorsType[];
  color: string;
};

export function ContributorSwiper({ contributors, color }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slidesPerView = 4;
  const slidesWidth = 340;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (swiperRef.current) {
        setContainerWidth(swiperRef.current.el.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const spaceBetween = Math.max(
    20,
    (containerWidth - slidesPerView * slidesWidth) / (slidesPerView - 1),
  );

  return (
    <Swiper
      style={
        {
          "--swiper-pagination-color": color,
          "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-inactive-opacity": "1",
        } as React.CSSProperties
      }
      slidesPerView="auto"
      slidesPerGroup={1}
      spaceBetween={spaceBetween}
      modules={[Navigation, Pagination]}
      breakpoints={{
        1540: {
          slidesPerGroup: 4,
        },
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper: SwiperType) => {
        swiperRef.current = swiper;
        if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }

        if (swiper.params.pagination && typeof swiper.params.pagination !== "boolean") {
          swiper.params.pagination.el = paginationRef.current;
        }
      }}
    >
      {contributors.map((contributor) => {
        return (
          <SwiperSlide
            // key={`${index}-${contributor.name}`}
            key={contributor.id}
            className="!h-auto flex"
            style={{
              width: "auto",
              flexShrink: 0,
            }}
          >
            <Contributor style={{ width: slidesWidth }} contributor={contributor} />
          </SwiperSlide>
        );
      })}
      <div className="mt-10 flex justify-center gap-33 max-[1540px]:gap-56 relative">
        <div
          ref={paginationRef}
          className="swiper-pagination"
          // style={{ "--bullet-color": "#000" } as React.CSSProperties}
        />
        <button
          type="button"
          ref={prevRef}
          className={cn(
            "cursor-pointer z-200 -translate-y-[6px]",
            "[&.swiper-button-disabled]:cursor-default",
            "[&.swiper-button-disabled]:opacity-20",
          )}
        >
          <Image
            width={10}
            height={21}
            src="/images/TriangleArrow-left.svg"
            alt="prev-slide"
            className="brightness-0"
          />
        </button>
        <button
          type="button"
          ref={nextRef}
          className={cn(
            "cursor-pointer z-200 -translate-y-[6px] ",
            "[&.swiper-button-disabled]:cursor-default",
            "[&.swiper-button-disabled]:opacity-20",
          )}
        >
          <Image
            width={10}
            height={21}
            src="/images/TriangleArrow-right.svg"
            alt="next-slide"
            className="brightness-0"
          />
        </button>
      </div>
    </Swiper>
  );
}

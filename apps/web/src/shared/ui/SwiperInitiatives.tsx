"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// import swiper
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { SwiperButton } from "./SwiperButton";

interface ExampleSwiperCard {
  src: string;
  title: string;
}

interface Props {
  slidesPerView: number;
  slidesWidth: number;
}

export function SwiperInitiatives({ slidesPerView, slidesWidth }: Props) {
  const containerRef = useRef<SwiperRef | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
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

  // swiper example
  const exampleSwiperCard: ExampleSwiperCard = {
    src: "/images/swiper-image.png",
    title: "Global Citizenship",
  };
  const exampleSwiperArr: ExampleSwiperCard[] = Array(12).fill(exampleSwiperCard);

  return (
    <Swiper
      ref={containerRef}
      modules={[Navigation]}
      slidesPerView="auto"
      spaceBetween={spaceBetween}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper) => {
        if (swiper.params.navigation) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }
      }}
    >
      {exampleSwiperArr.map((item, index) => {
        return (
          <SwiperSlide
            key={`${index}-${item.title}`}
            style={{
              width: "auto",
              flexShrink: 0,
            }}
          >
            <div
              style={{ "--my-width": `${slidesWidth}px` } as React.CSSProperties}
              className="mb-5 rounded-[10px] w-[var(--my-width)] h-[240px]"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={slidesWidth}
                height={240}
                style={{ objectFit: "cover" }}
                className="rounded-[10px] h-[100%]"
              />
            </div>
            <p className="text-black font-bold text-1xl/[103%]">{item.title}</p>
          </SwiperSlide>
        );
      })}

      <div className="flex justify-between mt-10">
        <SwiperButton ref={prevRef} direction="prev" className="swiper-initiatives" />
        <SwiperButton ref={nextRef} direction="next" className="swiper-initiatives" />
      </div>
    </Swiper>
  );
}

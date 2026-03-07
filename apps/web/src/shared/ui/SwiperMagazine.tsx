"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { SwiperButton } from "./SwiperButton";
import { ButtonPrimary } from "./ButtonPrimary";

interface ExampleSwiperCard {
  src: string;
  title: string;
  href: string;
}

export function SwiperMagazine() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current;

      if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;

        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);

  // swiper example
  const exampleSwiperCard: ExampleSwiperCard = {
    src: "/images/swiper-image.png",
    title: "Embracing Digital Learning in the COVID-19 Era",
    href: "#",
  };
  const exampleSwiperArr: ExampleSwiperCard[] = Array(6).fill(exampleSwiperCard);

  return (
    <div className="relative min-[1025px]:pr-50">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;

          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;

            swiper.navigation.init();
            swiper.navigation.update();
          }

          setCurrentSlide(swiper.realIndex + 1);
        }}
        onSlideChange={(swiper: SwiperType) => {
          setCurrentSlide(swiper.activeIndex + 1);
        }}
      >
        {exampleSwiperArr.map((item, index) => {
          return (
            <SwiperSlide key={`${index}-${item.title}`}>
              <div className="flex gap-x-20 gap-y-5 max-[768px]:flex-col">
                <div className="h-120 w-80 max-[768px]:h-60 max-[768px]:w-auto flex-shrink-0">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={320}
                    height={460}
                    style={{ objectFit: "cover" }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-80 flex flex-col gap-y-5">
                  <p className="text-[30px]/[125%] text-gray font-semibold">{item.title}</p>
                  <div className="mt-auto min-[769px]:mb-12">
                    <ButtonPrimary href={item.href}>View the Magazine</ButtonPrimary>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="relative max-[1024px]:mt-10 min-[1025px]:absolute top-0 right-0 flex justify-between items-center h-[100%] gap-2">
        <SwiperButton ref={prevRef} direction="prev" name="swiper-magazine" className="mt-auto" />
        <span
          className="
          [-webkit-text-stroke:1px_#CFCFCF]
          text-transparent font-semibold text-[70px]/[50%]
           min-[1025px]:absolute min-[1025px]:top-0 min-[1025px]:right-0
           min-[1025px]:text-[223px]/[75%]"
        >
          {currentSlide}
        </span>
        <SwiperButton ref={nextRef} direction="next" name="swiper-magazine" className="mt-auto" />
      </div>
    </div>
  );
}

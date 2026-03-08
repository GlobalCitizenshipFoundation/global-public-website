"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperTypeOriginal } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { SwiperButton } from "./SwiperButton";

interface SwiperTypeExtended extends SwiperTypeOriginal {
  loopFix: () => void;
  params: SwiperTypeOriginal["params"] & {
    loopedSlides?: number;
    navigation?: { prevEl: HTMLElement | null; nextEl: HTMLElement | null } | boolean;
  };
}

interface ExampleSwiperCard {
  photo: string;
  name: string;
  profession: string;
  country: string;
  text: string;
}

export function SwiperCustomers() {
  const swiperRef = useRef<SwiperTypeExtended | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation &&
      typeof swiperRef.current.params.navigation !== "boolean"
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation?.destroy();
      swiperRef.current.navigation?.init();
      swiperRef.current.navigation?.update();
    }
  }, []);

  const exampleSwiperCard: ExampleSwiperCard = {
    photo: "/images/swiper-image.png",
    name: "Jessica E.",
    profession: "Project Design",
    country: "Kenya",
    text: "",
  };
  const exampleSwiperArr: ExampleSwiperCard[] = Array.from({ length: 9 }, (_, index) => ({
    ...exampleSwiperCard,
    text: `This is slide number ${index + 1}`,
  }));

  return (
    <div className="relative">
      <div className="relative">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          loop
          loopAdditionalSlides={2}
          style={{ overflow: "visible" }}
          modules={[Navigation]}
          navigation={false}
          onSwiper={(swiper) => {
            const s = swiper as SwiperTypeExtended;
            s.params.loopedSlides = exampleSwiperArr.length;
            s.loopFix();
            swiperRef.current = s;
          }}
        >
          {exampleSwiperArr.map((item, index) => {
            return (
              <SwiperSlide
                key={`${index}-${item.name}`}
                style={{
                  maxWidth: "480px",
                  width: "100%",
                }}
              >
                <div className="rounded-lg px-12 py-10 bg-background-panel">
                  <div className="flex flex-wrap gap-x-6">
                    <div className="w-27 h-27 flex-shrink-0">
                      <Image
                        src={item.photo}
                        alt={item.name}
                        width={320}
                        height={460}
                        style={{ objectFit: "cover" }}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="pt-6">
                      <h3>{item.name}</h3>
                      <p className="pt-2">
                        {item.profession} - {item.country}
                      </p>
                    </div>
                  </div>
                  <p className="pt-6">{item.text}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="max-[768px]:mt-10 min-[769px]:absolute min-[769px]:-top-32 min-[769px]:right-0 relative flex justify-between items-center gap-2">
          <SwiperButton ref={prevRef} direction="prev" name="swiper-customers" />
          <SwiperButton ref={nextRef} direction="next" name="swiper-customers" />
        </div>
      </div>
    </div>
  );
}

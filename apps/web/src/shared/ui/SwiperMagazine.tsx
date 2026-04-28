"use client";

import type { MagazinSingleType } from "@gcf/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { path, paths } from "@/shared/config/paths";
import { ButtonPrimary } from "./ButtonPrimary";
import { SwiperButton } from "./SwiperButton";

type Props = {
  items?: MagazinSingleType[];
};

function getMagazineHref(magazine: MagazinSingleType) {
  const slug = magazine.slug?.current;
  return slug ? path.magazinePost(slug) : paths.magazine;
}

export function SwiperMagazine({ items = [] }: Props) {
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

  if (!items.length) {
    return <p className="text-gray text-lg">No magazine editions available right now.</p>;
  }

  return (
    <div className="relative min-[1025px]:pr-50">
      <Swiper
        spaceBetween={30}
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
        {items.map((magazine) => {
          const href = getMagazineHref(magazine);
          const imageUrl = magazine.magazinImage?.asset?.url;

          return (
            <SwiperSlide key={magazine._id}>
              <article className="flex gap-x-20 gap-y-5 max-[768px]:flex-col">
                <div className="h-120 w-80 flex-shrink-0 max-[768px]:h-60 max-[768px]:w-auto">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={magazine.title || "Magazine cover"}
                      width={320}
                      height={460}
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#F2F2F2] px-6 text-center">
                      <span className="text-gray text-sm font-medium">No magazine image</span>
                    </div>
                  )}
                </div>

                <div className="flex w-80 flex-col gap-y-5">
                  <h3 className="text-gray text-[30px]/[125%] font-semibold">{magazine.title}</h3>
                  {magazine.shortIntro ? (
                    <p className="text-gray text-base/[150%]">{magazine.shortIntro}</p>
                  ) : null}
                  <div className="mt-auto min-[769px]:mb-12">
                    <ButtonPrimary href={href}>View the Magazine</ButtonPrimary>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="relative top-0 right-0 flex h-[100%] items-center justify-between gap-2 max-[1024px]:mt-10 min-[1025px]:absolute">
        <SwiperButton ref={prevRef} direction="prev" name="swiper-magazine" className="mt-auto" />
        <span
          className="
          [-webkit-text-stroke:1px_#CFCFCF]
          text-[70px]/[50%] font-semibold text-transparent
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

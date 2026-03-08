"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { SwiperButton } from "./SwiperButton";
import { formatEventDate } from "../lib/datetime/formatters";
import { ButtonPrimary } from "./ButtonPrimary";
import { Container } from "./Container";

interface Props {
  slidesPerView: number;
  slidesWidth: number;
}

interface ExampleSwiperCard {
  src: string;
  kind: string;
  data: string;
  title: string;
  buttonTitle: string;
}

export function SwiperEvents({ slidesPerView, slidesWidth }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation?.init();
      swiperRef.current.navigation?.update();
    }
  }, [containerWidth]);

  console.log(spaceBetween, containerWidth);
  const exampleSwiperCard: ExampleSwiperCard = {
    src: "/images/swiper-image.png",
    kind: "Event",
    data: "2023-09-15",
    title:
      "International Conference on Transformative Education for Human and Planetary Flourishing 2023",
    buttonTitle: "Register to Participate",
  };

  const exampleArray: ExampleSwiperCard[] = Array(6).fill(exampleSwiperCard);

  return (
    <div className="relative overflow-hidden w-full px-12.5">
      <Swiper
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        modules={[Navigation]}
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
        }}
      >
        {exampleArray.map((item, index) => {
          const formattedStartDate = formatEventDate(item.data);

          return (
            <SwiperSlide
              key={`${index}-${item.title}`}
              style={{
                maxWidth: slidesWidth,
                width: "100%",
                flexShrink: 0,
              }}
            >
              <div className="flex w-full flex-col">
                <Image
                  src={item.src}
                  alt="Home-image"
                  width={506}
                  height={325}
                  style={{ objectFit: "contain" }}
                  className="mb-5 rounded-[10px]"
                />
                <div className="mb-6 flex justify-between">
                  <span className="text-gray bg-background-beige flex rounded-[33px] px-5 py-2.5 text-l/[142%] font-medium">
                    {item.kind}
                  </span>
                  <span className="text-gray flex text-l/[142%] font-medium">
                    {formattedStartDate}
                  </span>
                </div>
                <h3 className="text-gray mb-8 text-xl/[125%] font-medium">{item.title}</h3>
                <ButtonPrimary className="!w-[310px]" href="">
                  {item.buttonTitle}
                </ButtonPrimary>
              </div>
            </SwiperSlide>
          );
        })}
        <Container className="p-0">
          <div className="mt-10 flex justify-between">
            <SwiperButton ref={prevRef} direction="prev" name="swiper-events" />
            <SwiperButton ref={nextRef} direction="next" name="swiper-events" />
          </div>
        </Container>
      </Swiper>
    </div>
  );
}

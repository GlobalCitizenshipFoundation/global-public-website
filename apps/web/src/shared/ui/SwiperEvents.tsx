"use client";

import type { EventCard } from "@gcf/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { path, paths } from "@/shared/config/paths";
import { formatEventDate } from "@/shared/lib/datetime/formatters";
import { ButtonPrimary } from "./ButtonPrimary";
import { Container } from "./Container";
import { SwiperButton } from "./SwiperButton";

type Props = {
  items?: EventCard[];
  slidesPerView?: number;
  slidesWidth?: number;
};

const EVENT_TYPE_LABEL: Partial<Record<string, string>> = {
  conference: "Conference",
  consultation: "Consultation",
  panel_discussion: "Panel Discussion",
  forum: "Forum",
};

function getEventHref(event: EventCard) {
  const slug = event.slug?.current;
  return slug ? path.event(slug) : paths.events;
}

function getEventTypeLabel(event: EventCard) {
  return event.eventType ? (EVENT_TYPE_LABEL[event.eventType] ?? "Event") : "Event";
}

export function SwiperEvents({ items = [], slidesPerView = 4, slidesWidth = 420 }: Props) {
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

  const gapsCount = Math.max(slidesPerView - 1, 1);
  const spaceBetween = Math.max(20, (containerWidth - slidesPerView * slidesWidth) / gapsCount);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation?.init();
      swiperRef.current.navigation?.update();
    }
  }, [containerWidth]);

  if (!items.length) {
    return (
      <Container variant="regular">
        <p className="text-gray text-lg">No events available right now.</p>
      </Container>
    );
  }

  return (
    <div className="relative w-full overflow-hidden px-12.5">
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
        {items.map((event) => {
          const href = getEventHref(event);
          const imageUrl = event.eventImage?.asset?.url;
          const formattedStartDate = event.startDateTime
            ? formatEventDate(event.startDateTime)
            : "Date to be announced";

          return (
            <SwiperSlide
              key={event._id}
              style={{
                maxWidth: slidesWidth,
                width: "100%",
                flexShrink: 0,
              }}
            >
              <article className="flex h-full w-full flex-col">
                <div className="relative mb-5 aspect-[506/325] w-full overflow-hidden rounded-[10px] bg-[#F2F2F2]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={event.eventHeading || "Event image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-6 text-center">
                      <span className="text-gray text-sm font-medium">No event image</span>
                    </div>
                  )}
                </div>

                <div className="mb-6 flex justify-between gap-4">
                  <span className="text-gray bg-background-beige flex rounded-[33px] px-5 py-2.5 text-l/[142%] font-medium">
                    {getEventTypeLabel(event)}
                  </span>
                  <time
                    className="text-gray flex text-l/[142%] font-medium"
                    dateTime={event.startDateTime}
                  >
                    {formattedStartDate}
                  </time>
                </div>

                <h3 className="text-gray mb-8 line-clamp-3 text-xl/[125%] font-medium">
                  {event.eventHeading}
                </h3>

                <div className="mt-auto">
                  <ButtonPrimary className="!w-[310px]" href={href}>
                    Register to Participate
                  </ButtonPrimary>
                </div>
              </article>
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

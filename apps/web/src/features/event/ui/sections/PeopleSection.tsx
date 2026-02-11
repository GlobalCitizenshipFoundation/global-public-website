"use client";

import type { EventSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

import ContributorFrame from "@/features/contributors/ui/ContributorFrame";
import { createPortableTextComponents } from "../../lib/portableTextComponents";
import SectionHeading from "../components/SectionHeading";

type Props = {
  heading: string;
  text?: EventSingleType["speakersText"] | EventSingleType["steeringCommitteeText"];
  people: Array<{ _id: string }>;
};

function getIsLocked(s: SwiperInstance): boolean {
  const rec = s as unknown as Record<string, unknown>;
  return rec["isLocked"] === true;
}

export default function PeopleSection({ heading, text, people }: Props) {
  const slides = people ?? [];
  const hasText = Boolean(text?.length);
  const hasPeople = slides.length > 0;

  const [swiper, setSwiper] = React.useState<SwiperInstance | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const updateNavState = React.useCallback((s: SwiperInstance | null) => {
    if (!s) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    const locked = getIsLocked(s);
    if (locked || s.slides.length <= 1) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    setCanPrev(!s.isBeginning);
    setCanNext(!s.isEnd);
  }, []);

  React.useEffect(() => {
    if (swiper) updateNavState(swiper);
  }, [swiper, updateNavState]);

  if (!hasText && !hasPeople) return null;

  const showArrows = slides.length > 1 && (canPrev || canNext);

  return (
    <section className="mb-12 flex flex-col lg:mb-20">
      <div className="mb-11 flex flex-col">
        <div className="flex items-start justify-between gap-6">
          <SectionHeading>{heading}</SectionHeading>

          {showArrows ? (
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                disabled={!canPrev}
                onClick={() => swiper?.slidePrev()}
                className={[
                  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-md",
                  "bg-gray text-white",
                  "transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
                ].join(" ")}
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                aria-label="Next"
                disabled={!canNext}
                onClick={() => swiper?.slideNext()}
                className={[
                  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-md",
                  "bg-gray text-white",
                  "transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
                ].join(" ")}
              >
                <FaChevronRight />
              </button>
            </div>
          ) : null}
        </div>

        {hasText ? (
          <PortableText value={text!} components={createPortableTextComponents()} />
        ) : null}
      </div>

      {hasPeople ? (
        <Swiper
          modules={[Navigation]}
          onSwiper={(s) => {
            setSwiper(s);
            updateNavState(s);
          }}
          onSlideChange={updateNavState}
          onResize={updateNavState}
          onReachBeginning={updateNavState}
          onReachEnd={updateNavState}
          spaceBetween={18}
          watchOverflow
          slidesPerView={1.1}
          breakpoints={{
            0: { slidesPerView: 1.3, slidesPerGroup: 1 },
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 3, slidesPerGroup: 3 },
            1280: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
          className="w-full"
        >
          {slides.map((p) => (
            <SwiperSlide key={p._id} className="h-auto!">
              <div className="@container aspect-250/370 w-full">
                <ContributorFrame contributor={p} className="h-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </section>
  );
}

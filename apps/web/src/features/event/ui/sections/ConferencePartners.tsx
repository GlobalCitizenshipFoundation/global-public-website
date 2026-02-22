"use client";

import type { RelatedPartnersType } from "@gcf/types";
import { useCallback, useEffect, useState } from "react";
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import PartnersLogo from "@/features/partners/ui/PartnersLogo";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  title: string;
  partners: RelatedPartnersType[];
  className?: string;
}

type SwiperWithLock = SwiperInstance & { isLocked?: boolean };

function getIsLocked(s: SwiperInstance): boolean {
  return (s as SwiperWithLock).isLocked === true;
}

export const ConferencePartners: React.FC<Props> = ({ partners, title, className }) => {
  const slides = partners ?? [];

  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNavState = useCallback((s: SwiperInstance | null) => {
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

  useEffect(() => {
    if (swiper) updateNavState(swiper);
  }, [swiper, updateNavState]);

  if (!slides.length) return null;

  const showArrows = slides.length > 1 && (canPrev || canNext);

  return (
    <section className={["space-y-6", className].filter(Boolean).join(" ")}>
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-primary-darker text-[clamp(22px,3vw,42px)] font-semibold">{title}</h2>

        {showArrows ? (
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              disabled={!canPrev}
              onClick={() => swiper?.slidePrev()}
              className={[
                "flex h-11 w-11 items-center justify-center rounded-md",
                "bg-gray text-white",
                "transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
              ].join(" ")}
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Next"
              disabled={!canNext}
              onClick={() => swiper?.slideNext()}
              className={[
                "flex h-11 w-11 items-center justify-center rounded-md",
                "bg-gray text-white",
                "transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
              ].join(" ")}
            >
              →
            </button>
          </div>
        ) : null}
      </div>

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
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
          1280: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        className="w-full"
      >
        {slides.map((partner) => (
          <SwiperSlide key={partner._id} className="h-auto!">
            <div className="@container aspect-square w-full">
              <div className="h-full w-full rounded-md p-[clamp(10px,4cqw,16px)]">
                <PartnersLogo partner={partner} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

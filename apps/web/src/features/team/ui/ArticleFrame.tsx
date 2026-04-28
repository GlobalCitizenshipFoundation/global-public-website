"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ArticleListItemType } from "@gcf/types";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/shared/lib/cn";
import { Article } from "./Article";

type Props = {
  articles?: Array<ArticleListItemType | null | undefined>;
  color?: string;
};

function isValidArticle(
  article: ArticleListItemType | null | undefined,
): article is ArticleListItemType {
  return Boolean(article?._id && article.title);
}

export function ArticleFrame({ articles = [], color = "#C71C41" }: Props) {
  const [locked, setLocked] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slidesPerView = 4;
  const slidesWidth = 260;

  const uniqueArticles = useMemo(() => {
    const seen = new Set<string>();

    return articles.filter(isValidArticle).filter((article) => {
      if (seen.has(article._id)) return false;

      seen.add(article._id);
      return true;
    });
  }, [articles]);

  useEffect(() => {
    const updateWidth = () => {
      if (!swiperRef.current) return;

      setContainerWidth(swiperRef.current.el.offsetWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const spaceBetween = Math.max(
    20,
    (containerWidth - slidesPerView * slidesWidth) / (slidesPerView - 1),
  );

  if (!uniqueArticles.length) {
    return (
      <p className="text-borders text-base">No articles available for this profile right now.</p>
    );
  }

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
      watchOverflow
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
      onInit={(swiper) => {
        setLocked(swiper.isLocked);
      }}
      onResize={(swiper) => {
        setLocked(swiper.isLocked);
      }}
      onBreakpoint={(swiper) => {
        setLocked(swiper.isLocked);
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
      {uniqueArticles.map((article) => (
        <SwiperSlide
          key={article._id}
          className="!h-auto"
          style={{
            display: "flex",
            maxWidth: slidesWidth,
            flexShrink: 0,
          }}
        >
          <Article article={article} />
        </SwiperSlide>
      ))}

      <div
        className={cn("relative mt-10 flex justify-center gap-33 max-[1540px]:gap-56", {
          hidden: locked,
        })}
      >
        <div ref={paginationRef} className="swiper-pagination" />

        <button
          type="button"
          ref={prevRef}
          className={cn(
            "z-200 -translate-y-[6px] cursor-pointer",
            "[&.swiper-button-disabled]:cursor-default",
            "[&.swiper-button-disabled]:opacity-20",
          )}
          aria-label="Previous article"
        >
          <Image
            width={10}
            height={21}
            src="/images/TriangleArrow-left.svg"
            alt=""
            aria-hidden="true"
            className="brightness-0"
          />
        </button>

        <button
          type="button"
          ref={nextRef}
          className={cn(
            "z-200 -translate-y-[6px] cursor-pointer",
            "[&.swiper-button-disabled]:cursor-default",
            "[&.swiper-button-disabled]:opacity-20",
          )}
          aria-label="Next article"
        >
          <Image
            width={10}
            height={21}
            src="/images/TriangleArrow-right.svg"
            alt=""
            aria-hidden="true"
            className="brightness-0"
          />
        </button>
      </div>
    </Swiper>
  );
}

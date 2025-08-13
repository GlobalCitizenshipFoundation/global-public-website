import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { SwiperSlideCard } from './SwiperSlideCard';
import { NavigationOptions, PaginationOptions } from 'swiper/types';

interface ExampleSwiperCard {
  src: string;
  kind: string;
  data: string;
  title: string;
  buttonTitle: string;
}

export default function SwiperList() {
  const paginationRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const exampleSwiperCard: ExampleSwiperCard = {
    src: '/images/swiper-image.png',
    kind: 'Event',
    data: '2023-09-15',
    title:
      'International Conference on Transformative Education for Human and Planetary Flourishing 2023',
    buttonTitle: 'Register to Participate',
  };

  const exampleArray: ExampleSwiperCard[] = Array(10).fill(exampleSwiperCard);

  return (
    <>
      <div className="relative w-full">
        <button></button>
        <Swiper
          slidesPerView="auto"
          spaceBetween={70}
          modules={[Pagination, Navigation]}
          style={{ paddingLeft: '350px' }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            renderBullet: (index, className) => {
              if (index < 5) {
                return `<span class="${className}"></span>`;
              }
              return '';
            },
          }}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          onBeforeInit={(swiper) => {
            (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
            (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
            (swiper.params.pagination as PaginationOptions).el = paginationRef.current;
          }}
          className="w-full"
        >
          {exampleArray.map((example, index) => (
            <SwiperSlide key={`${index}-${example.title}`} style={{ width: 'auto' }}>
              <SwiperSlideCard
                src={example.src}
                kind={example.kind}
                data={example.data}
                title={example.title}
                buttonTitle={example.buttonTitle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-8 flex justify-center gap-[155px]"></div>
      </div>
    </>
  );
}

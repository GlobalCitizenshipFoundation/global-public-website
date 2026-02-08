import React from 'react';
import EventIntroVideo from './EventIntroVideo';

type Props = {
  heading: string;
  url: string;
  title: string;
};

export default function Video({ heading, url, title }: Props) {
  return (
    <section className="mb-11 flex flex-col gap-[15px]">
      <h2 className="text-subtitles text-2xl font-semibold lg:mb-6 lg:pl-0 lg:text-[42px]">
        {heading}
      </h2>
      <EventIntroVideo url={url} title={title} />
    </section>
  );
}

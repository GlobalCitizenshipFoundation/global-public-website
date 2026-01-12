import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from '@/shared/ui/ButtonPrimary';
import type { RelatedEventProps } from '@gcf/types';
import { formatEventDate } from '@/features/events/lib/formatters';
import { paths, path } from '@/shared/config/paths';

type Props = { event: RelatedEventProps };

const RelatedEvent: React.FC<Props> = ({ event }) => {
  const formattedStartDate = event.startDateTime
    ? formatEventDate(event.startDateTime)
    : 'No date available';

  const slug = event.slug?.current;
  const href = slug ? path.event(slug) : paths.events;

  const imageUrl = event.eventImage?.asset?.url;

  return (
    <article className="group relative flex h-full flex-col rounded-[10px]">
      <Link
        href={href}
        aria-label={event.eventHeading ? `Open event: ${event.eventHeading}` : 'Open event'}
        className="absolute inset-0 z-10 rounded-[10px]"
      />

      {/* Media */}
      <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-[10px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.eventHeading || 'Event image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-white/10 bg-black/25">
            <span className="text-borders/80 text-sm font-medium">No image</span>
          </div>
        )}
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
          Cover Story
        </span>

        {event.startDateTime ? (
          <time className="text-sm" dateTime={event.startDateTime}>
            {formattedStartDate}
          </time>
        ) : (
          <span className="text-sm">{formattedStartDate}</span>
        )}
      </div>

      <h2 className="font-inter mb-7.5 text-2xl font-semibold">{event.eventHeading}</h2>

      {/* Przycisk NAD overlayem */}
      <div className="relative z-20 mt-auto">
        <ButtonPrimary href={href} className="w-full" aria-disabled={!slug}>
          Read More
        </ButtonPrimary>
      </div>
    </article>
  );
};

export default RelatedEvent;

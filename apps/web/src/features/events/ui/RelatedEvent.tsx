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

  const EVENT_TYPE_LABEL: Record<string, string> = {
    conference: 'Conference',
    consultation: 'Consultation',
    panel_discussion: 'Panel Discussion',
    forum: 'Forum',
  };

  const typeLabel = event.eventType
    ? (EVENT_TYPE_LABEL[event.eventType] ?? event.eventType)
    : 'No Type available';

  return (
    <article className="group [container-type:inline-size] relative flex h-full flex-col rounded-[10px]">
      <Link
        href={href}
        aria-label={event.eventHeading ? `Open event: ${event.eventHeading}` : 'Open event'}
        className="absolute inset-0 z-10 rounded-[10px]"
      />

      {/* Media: (image -> data) min 20px */}
      <div className="relative mb-[clamp(20px,2.6cqw,28px)] aspect-[16/9] w-full overflow-hidden rounded-[10px]">
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
            <span className="text-borders/80 text-[clamp(13px,2.4cqw,16px)] font-medium">
              No image
            </span>
          </div>
        )}
      </div>

      {/* Meta block:
          gap (date -> cover) min 10px
          mb (cover -> title) min 25px
      */}
      <div className="mb-[clamp(25px,3.2cqw,34px)] flex flex-col gap-[clamp(10px,1.4cqw,14px)]">
        {event.startDateTime ? (
          <time
            className="text-foreground/80 text-[clamp(13px,2.6cqw,16px)]"
            dateTime={event.startDateTime}
          >
            {formattedStartDate}
          </time>
        ) : (
          <span className="text-foreground/80 text-[clamp(13px,2.6cqw,16px)]">
            {formattedStartDate}
          </span>
        )}

        <span className="w-fit rounded-full bg-white px-[clamp(12px,3.0cqw,18px)] py-[clamp(8px,2.2cqw,12px)] text-[clamp(13px,2.6cqw,16px)] font-medium whitespace-nowrap">
          {typeLabel}
        </span>
      </div>

      {/* Title: (title -> button) min 40px */}
      <h2 className="font-inter mb-[clamp(40px,4.0cqw,56px)] line-clamp-2 text-[clamp(20px,5.2cqw,36px)] leading-[1.12] font-semibold">
        {event.eventHeading}
      </h2>

      {/* Button 60% width */}
      <div className="relative mt-auto">
        <div className="w-full max-w-full sm:w-[clamp(140px,60%,320px)]">
          <ButtonPrimary
            href={href}
            className="w-full text-[clamp(14px,2.8cqw,17px)]"
            aria-disabled={!slug}
          >
            Read More
          </ButtonPrimary>
        </div>
      </div>
    </article>
  );
};

export default RelatedEvent;

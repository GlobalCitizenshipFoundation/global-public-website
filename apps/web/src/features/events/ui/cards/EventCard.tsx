import type { EventCard as EventCardType } from "@gcf/types";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { formatEventDate } from "@/features/events/lib/formatters";
import { path, paths } from "@/shared/config/paths";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

type Props = { event: EventCardType };

const EVENT_TYPE_LABEL: Record<string, string> = {
  conference: "Conference",
  consultation: "Consultation",
  panel_discussion: "Panel Discussion",
  forum: "Forum",
};

export function EventCard({ event }: Props) {
  const formattedStartDate = event.startDateTime
    ? formatEventDate(event.startDateTime)
    : "No date available";

  const slug = event.slug?.current;
  const href = slug ? path.event(slug) : paths.events;
  const imageUrl = event.eventImage?.asset?.url;

  const typeLabel = event.eventType
    ? (EVENT_TYPE_LABEL[event.eventType] ?? event.eventType)
    : "No Type available";

  return (
    <article className="group [container-type:inline-size] relative flex h-full flex-col rounded-[10px]">
      <Link
        href={href}
        aria-label={event.eventHeading ? `Open event: ${event.eventHeading}` : "Open event"}
        className="absolute inset-0 z-10 rounded-[10px]"
      />

      <div className="relative mb-[clamp(20px,2.6cqw,28px)] aspect-[16/9] w-full overflow-hidden rounded-[10px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.eventHeading || "Event image"}
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

      <h2 className="font-inter mb-[clamp(40px,4.0cqw,56px)] line-clamp-2 text-[clamp(20px,5.2cqw,36px)] leading-[1.12] font-semibold">
        {event.eventHeading}
      </h2>

      <div className="relative mt-auto">
        <div className="w-full max-w-full sm:w-[clamp(140px,60%,320px)]">
          <ButtonPrimary
            href={href}
            className="w-full text-[clamp(14px,2.8cqw,17px)]"
            aria-disabled={!slug}
          >
            View Event
          </ButtonPrimary>
        </div>
      </div>
    </article>
  );
}

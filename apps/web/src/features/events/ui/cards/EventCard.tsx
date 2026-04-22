import type { EventCard as EventCardType } from "@gcf/types";
import Image from "next/image";
import Link from "next/link";
import { formatEventDate } from "@/features/events/lib/formatters";
import { cn } from "@/shared/lib/cn";
import { path, paths } from "@/shared/config/paths";

type Props = {
  event: EventCardType;
  index?: number;
};

const EVENT_TYPE_LABEL: Partial<Record<string, string>> = {
  conference: "Conference",
  consultation: "Consultation",
  panel_discussion: "Panel Discussion",
  forum: "Forum",
};

export function EventCard({ event, index }: Props) {
  const slug = event.slug?.current;
  const href = slug ? path.event(slug) : paths.events;
  const imageUrl = event.eventImage?.asset?.url;
  const formattedStartDate = event.startDateTime ? formatEventDate(event.startDateTime) : undefined;

  const typeLabel = event.eventType ? EVENT_TYPE_LABEL[event.eventType] : undefined;

  const eventNumber = typeof index === "number" ? `#${index + 1}` : undefined;

  const hasImage = Boolean(imageUrl);

  return (
    <article className="flex h-full flex-col gap-4">
      <Link
        href={href}
        aria-label={event.eventHeading ? `Open event: ${event.eventHeading}` : "Open event"}
        className="group relative block w-full overflow-hidden rounded-[14px]"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px]">
          <div className="absolute inset-0 bg-[#d9d1ba]" />
          <div
            aria-hidden={hasImage ? "true" : undefined}
            className="absolute inset-0 z-[1] flex flex-col px-6 pt-5 pb-4"
          >
            <EventCardOverlayContent
              formattedStartDate={formattedStartDate}
              startDateTime={event.startDateTime}
              typeLabel={typeLabel}
              eventType={event.eventType}
              title={event.eventHeading}
              eventNumber={eventNumber}
              tone="fallback"
            />
          </div>

          {hasImage ? (
            <>
              <Image
                src={imageUrl!}
                alt={event.eventHeading || "Event image"}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="z-[2] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </>
          ) : null}
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <ActionButton href={href} variant="primary" className="flex-1">
          Join The Event
        </ActionButton>

        <ActionButton href={href} variant="secondary" className="w-[110px] shrink-0">
          More
        </ActionButton>
      </div>
    </article>
  );
}

type OverlayProps = {
  formattedStartDate: string | undefined;
  startDateTime: string | undefined;
  typeLabel: string | undefined;
  eventType: string | undefined;
  title: string;
  eventNumber: string | undefined;
  tone: "image" | "fallback";
};

function EventCardOverlayContent({
  formattedStartDate,
  startDateTime,
  typeLabel,
  eventType,
  title,
  eventNumber,
  tone,
}: OverlayProps) {
  const isImage = tone === "image";

  return (
    <>
      {formattedStartDate ? (
        <time
          dateTime={startDateTime}
          className={cn(
            "text-[13px] leading-none font-normal",
            isImage ? "text-white" : "text-[#2a2a2a]",
          )}
        >
          {formattedStartDate}
        </time>
      ) : null}

      {typeLabel ? (
        <span
          className={cn(
            "mt-2 inline-flex w-fit items-center rounded-[4px] bg-[#d91f4f] px-2 py-[5px] text-[10px] leading-none font-semibold text-white",
            eventType === "panel_discussion" && "uppercase tracking-[0.02em]",
          )}
        >
          {typeLabel}
        </span>
      ) : null}

      <h3
        className={cn(
          "mt-3 max-w-[15ch] text-[18px] leading-[0.98] font-semibold tracking-[-0.05em] sm:text-[19px] md:text-[20px]",
          isImage ? "text-white" : "text-[#26274d]",
        )}
      >
        {title}
      </h3>

      {eventNumber ? (
        <span
          className={cn(
            "mt-auto self-end pr-1 text-[12px] leading-none font-semibold tracking-[-0.01em]",
            isImage ? "text-white" : "text-[#26274d]",
          )}
        >
          {eventNumber}
        </span>
      ) : null}
    </>
  );
}

type ActionButtonProps = {
  href: string;
  children: string;
  variant: "primary" | "secondary";
  className?: string;
};

function ActionButton({ href, children, variant, className }: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-[16px] px-5 text-center text-[17px] leading-none font-normal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26274d]/20",
        isPrimary
          ? "bg-[#f2f2f2] text-[#232323] hover:bg-[#ebebeb]"
          : "border border-[#2f2f2f] bg-white text-[#232323] hover:bg-[#f7f7f7]",
        className,
      )}
    >
      <span>{children}</span>
      {!isPrimary ? (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-1.5 h-4 w-4" fill="none">
          <path
            d="M6 3.5L10.5 8L6 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </Link>
  );
}

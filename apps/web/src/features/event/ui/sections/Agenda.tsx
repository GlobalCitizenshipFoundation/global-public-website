import type { EventSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { IoTime } from "react-icons/io5";
import { formatEventTime } from "@/shared/lib/datetime";
import { BreakLine } from "@/shared/ui/BreakLine";
import { createPortableTextComponents } from "../../lib/portableTextComponents";
import PeopleCollapse from "./PeopleCollapse";

type Props = {
  heading: string;
  description?: EventSingleType["agendaDescription"];
  agenda?: EventSingleType["agenda"];
};

function safeTime(value?: string | null) {
  return value ? formatEventTime(value) : "";
}

function formatAgendaDayDate(dateStr?: string | null) {
  if (!dateStr) return "";

  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (m) {
    const y = Number(m[1]);
    const mo = Number(m[2]) - 1;
    const d = Number(m[3]);

    const utc = new Date(Date.UTC(y, mo, d));
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(utc);
  }

  const dt = new Date(dateStr);
  if (Number.isNaN(dt.getTime())) return dateStr;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
}

function formatRangeUtc(start?: string | null, end?: string | null) {
  const s = safeTime(start);
  const e = safeTime(end);
  if (!s && !e) return "";
  if (s && e) return `${s} - ${e} hrs UTC`;
  if (s) return `${s} hrs UTC`;
  return `${e} hrs UTC`;
}

function minutesBetween(start?: string | null, end?: string | null): number | null {
  if (!start || !end) return null;
  const a = new Date(start);
  const b = new Date(end);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  const diff = Math.round((b.getTime() - a.getTime()) / 60000);
  return diff > 0 ? diff : null;
}

/* Badge styles */
type BadgeStyle = { bg: string; fg: string };

const BADGE_STYLES = [
  { bg: "#FFF4E4", fg: "#937038" }, // yellow
  { bg: "#EEF6F5", fg: "#148370" }, // green
  { bg: "#F9EBE9", fg: "#DD664F" }, // red
] as const satisfies readonly BadgeStyle[];

const BADGE_FALLBACK: BadgeStyle = BADGE_STYLES[0];

function badgeStyleFromBottom(sessionIdx: number, total: number): BadgeStyle {
  const len = BADGE_STYLES.length;

  const safeTotal = Math.max(0, total | 0);
  const safeIdx = Math.max(0, sessionIdx | 0);

  const fromBottom = Math.max(0, safeTotal - 1 - safeIdx);
  const styleIdx = fromBottom % len;

  return BADGE_STYLES[styleIdx] ?? BADGE_FALLBACK;
}

type Person = {
  _id?: string;
  _key?: string;
  name?: string;
  designation?: string;
  organization?: string;
  photo?: { asset?: { url?: string } };
};

function asPortableText(value: unknown): PortableTextBlock[] | undefined {
  return Array.isArray(value) ? (value as PortableTextBlock[]) : undefined;
}

function asPeople(value: unknown): Person[] {
  return Array.isArray(value) ? (value as Person[]) : [];
}

function AccordionBox({
  title,
  metaRight,
  defaultOpen = false,
  children,
  variant = "day",
}: {
  title: React.ReactNode;
  metaRight?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  variant?: "day" | "session";
}) {
  const isDay = variant === "day";

  if (isDay) {
    return (
      <details className="group" open={defaultOpen}>
        <summary className="cursor-pointer list-none">
          <div className="bg-gray color-white flex min-h-17.5 items-center justify-between rounded-xl border px-7 py-3">
            <div className="flex w-full items-center justify-between">
              <div className="min-w-0 flex-1">{title}</div>
              {metaRight ? <div className="shrink-0">{metaRight}</div> : null}

              <span className="ring-none ml-6 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/80 text-black ring-0">
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </summary>

        <div className="mt-7.5 rounded-xl bg-white">{children}</div>
      </details>
    );
  }

  return (
    <details
      className="session-acc border-gray @container relative rounded-xl border bg-white"
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none">
        <div className="relative p-[clamp(22px,4cqw,40px)]">
          <div className="grid grid-cols-1 gap-7 @min-[860px]:grid-cols-[1fr_340px] @min-[860px]:gap-21.25">
            {title}
            <div className="min-w-0 text-left @min-[860px]:text-right">{metaRight}</div>
          </div>

          <span className="chev-closed bg-primary absolute bottom-0 left-1/2 grid h-8 w-8 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full text-white">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </summary>

      <div className="px-[clamp(22px,4cqw,40px)] pb-13">
        <BreakLine className="@max-[860px]:hidden" />

        <div className="@max-[860px]:pt-3">{children}</div>
      </div>

      <div className="chev-open absolute bottom-0 left-1/2 -translate-x-1/2">
        <span className="bg-primary -mb-3.75 grid h-8 w-8 place-items-center rounded-full text-white">
          <svg
            className="h-4 w-4 rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </details>
  );
}

export function Agenda({ heading, description, agenda }: Props) {
  const days = agenda ?? [];
  const showDescription = Boolean(description?.length);

  return (
    <section className="mb-14 flex flex-col gap-1.5">
      <h2 className="text-titles mb-0 text-2xl lg:mb-4.5 lg:text-[42px]">{heading}</h2>

      {showDescription ? (
        <PortableText value={description!} components={createPortableTextComponents()} />
      ) : null}

      {days.length ? (
        <div className="mt-6 flex flex-col gap-10">
          {days.map((day, dayIdx) => {
            const sessions = day.sessions ?? [];
            if (!sessions.length) return null;

            const dayTitle = `Day ${dayIdx + 1}: ${formatAgendaDayDate(day.date)}`;

            return (
              <AccordionBox
                key={day._key}
                variant="day"
                title={
                  <div className="text-[20px] font-semibold text-white md:text-[32px]">
                    {dayTitle}
                  </div>
                }
                metaRight={
                  <span className="hidden text-sm text-white sm:block">
                    {sessions.length} items
                  </span>
                }
                defaultOpen={dayIdx === 0}
              >
                <div className="flex flex-col gap-10">
                  {sessions.map((s, sessionIdx) => {
                    const typeValue = s.type;
                    const typeLabel =
                      typeValue === "panel_discussion"
                        ? "Panel Discussion"
                        : typeValue === "learning_session"
                          ? "Learning Session"
                          : typeof typeValue === "string"
                            ? typeValue
                            : "";

                    const desc = asPortableText(s.description);
                    const moderators = asPeople(s.moderators);
                    const panelists = asPeople(s.panelists);

                    const timeRange = formatRangeUtc(s.startAt, s.endAt);
                    const mins = minutesBetween(s.startAt, s.endAt);
                    const durationLabel = mins ? `${mins} minutes` : "";

                    const stackModerator = moderators.length > 2;
                    const badge = badgeStyleFromBottom(sessionIdx, sessions.length);

                    return (
                      <AccordionBox
                        key={s._key}
                        variant="session"
                        title={
                          <div className="min-w-0">
                            {typeLabel ? (
                              <div
                                className="text-primary text-[21px] font-semibold"
                                style={{
                                  lineHeight: "100%",
                                  marginBottom: "25px",
                                }}
                              >
                                {typeLabel}
                              </div>
                            ) : null}

                            <div className="text-titles text-[20px] leading-none font-semibold md:text-[26px]">
                              {s.title}
                            </div>
                          </div>
                        }
                        metaRight={
                          <div className="min-w-0">
                            <div
                              style={
                                {
                                  "--badge-bg": badge.bg,
                                  "--badge-fg": badge.fg,
                                } as React.CSSProperties
                              }
                              className={[
                                "bg-primary w-full rounded-md px-3 py-2 text-center text-[14px] font-medium text-white",
                                "md:bg-(--badge-bg) md:text-(--badge-fg)",
                              ].join(" ")}
                            >
                              Artificial Intelligence in Education
                            </div>

                            <div className="mt-7.5 flex gap-2.5">
                              <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden">
                                <IoTime size={24} className="block shrink-0" />
                              </span>

                              <div>
                                <div className="text-titles text-left text-[20px] leading-none font-semibold">
                                  {timeRange}
                                </div>

                                {durationLabel ? (
                                  <div className="mt-2 text-left text-[20px] leading-none text-[#928888]">
                                    {durationLabel}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        }
                        defaultOpen={false}
                      >
                        <div className="@container @min-[860px]:mt-8.5">
                          <div
                            className={
                              stackModerator
                                ? "grid grid-cols-1 gap-8"
                                : "grid grid-cols-1 gap-8 @min-[860px]:grid-cols-[1fr_340px] @min-[860px]:gap-21.25"
                            }
                          >
                            <div className="min-w-0">
                              {desc?.length ? (
                                <div className="text-[18px] leading-relaxed @max-[750px]:text-[14px]! @max-[750px]:leading-[1.4]">
                                  <PortableText
                                    value={desc}
                                    components={createPortableTextComponents({
                                      pClassName:
                                        "leading-relaxed @max-[750px]:text-[14px]! @max-[750px]:leading-[1.4] text-[clamp(16px,0.6vw+14px,18px)]!",
                                    })}
                                  />
                                </div>
                              ) : (
                                <div className="text-borders text-[18px] leading-relaxed @max-[750px]:text-[14px] @max-[750px]:leading-[1.4]">
                                  Brak opisu dla tego punktu.
                                </div>
                              )}
                            </div>

                            <div
                              className={
                                stackModerator
                                  ? "mt-0 min-w-0 @max-[750px]:mt-7.5"
                                  : "w-full min-w-0 @min-[860px]:justify-self-end"
                              }
                            >
                              <PeopleCollapse
                                title="Moderators"
                                people={moderators}
                                previewCount={6}
                                layout="grid"
                                className="w-full max-w-none"
                              />
                            </div>
                          </div>
                        </div>

                        {panelists.length ? (
                          <div className="mt-8.5">
                            <BreakLine className="@max-[860px]:hidden" />
                            <PeopleCollapse
                              title="Panelists"
                              people={panelists}
                              previewCount={6}
                              layout="grid"
                              className="w-full max-w-none @min-[860px]:mt-8.5"
                            />
                          </div>
                        ) : null}
                      </AccordionBox>
                    );
                  })}
                </div>
              </AccordionBox>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

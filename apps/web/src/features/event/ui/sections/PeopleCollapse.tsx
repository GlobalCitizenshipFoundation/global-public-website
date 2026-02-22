"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { path } from "@/shared/config/paths";

type Person = {
  _id?: string;
  name?: string;
  designation?: string;
  organization?: string;
  country?: string;
  slug?: { current?: string };
  photo?: { asset?: { url?: string } };
};

type PersonRef = {
  _key?: string;
  person?: Person;
};

function personLine(p: PersonRef): string {
  const person = p.person;
  const name = person?.name ?? "";
  const designation = person?.designation ?? "";
  const organization = person?.organization ?? "";
  const country = person?.country ?? "";
  return [name, designation, organization, country].filter(Boolean).join(", ");
}

function isPersonRefArray(value: unknown): value is PersonRef[] {
  return Array.isArray(value);
}

type Props = {
  title: string;
  people: unknown;
  previewCount?: number;
  className?: string;
  layout?: "list" | "grid";
};

export default function PeopleCollapse({
  title,
  people,
  previewCount = 6,
  className = "",
  layout = "grid",
}: Props) {
  const list = isPersonRefArray(people) ? people : [];
  const [expanded, setExpanded] = useState(false);

  if (!list.length) return null;

  const hasMore = list.length > previewCount;
  const visible = expanded ? list : list.slice(0, previewCount);

  function Item({ p, clamp }: { p: PersonRef; clamp: boolean }) {
    const line = personLine(p);
    const person = p.person;
    const imgUrl = person?.photo?.asset?.url;
    const name = person?.name ?? "";

    const slug = person?.slug?.current;
    const href = slug ? path.contributor(slug) : null;

    const Content = (
      <div className="@container flex min-w-0 items-start gap-4">
        <div
          className="relative shrink-0 overflow-hidden bg-gray-100"
          style={{
            width: "clamp(40px, calc(64px - 3cqw), 56px)",
            height: "clamp(40px, calc(64px - 3cqw), 56px)",
            borderRadius: "7.33px",
          }}
        >
          {imgUrl ? (
            <Image src={imgUrl} alt={name || title} fill sizes="56px" className="object-cover" />
          ) : null}
        </div>

        <div
          className={[
            "text-borders min-w-0 flex-1 leading-snug wrap-break-word whitespace-normal",
            "text-[clamp(14px,0.6cqw+12px,16px)]",
            clamp ? "line-clamp-2" : "",
          ].join(" ")}
          title={line}
        >
          {line}
        </div>
      </div>
    );

    if (!href) return <div className="min-w-0">{Content}</div>;

    return (
      <Link
        href={href}
        className="focus-visible:ring-primary block min-w-0 rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2"
        aria-label={name ? `Open contributor: ${name}` : "Open contributor"}
      >
        {Content}
      </Link>
    );
  }

  const isGrid = layout === "grid";

  return (
    <div className={`min-w-0 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-titles text-[18px] leading-none font-semibold">{title}</div>

        {hasMore ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-primary cursor-pointer text-[16px] font-semibold select-none"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        ) : (
          <span className="text-[16px] leading-none font-semibold opacity-0 select-none">
            Show more
          </span>
        )}
      </div>

      {isGrid ? (
        <div className="@container">
          <div className="mt-8 grid grid-cols-1 gap-5 @min-[750px]:grid-cols-2 @min-[840px]:grid-cols-3">
            {visible.map((p, idx) => (
              <div
                key={p._key ?? p.person?._id ?? p.person?.slug?.current ?? p.person?.name ?? idx}
                className="w-full min-w-0 overflow-hidden"
              >
                <Item p={p} clamp />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 min-w-0 space-y-5">
          {visible.map((p, idx) => (
            <div
              key={p._key ?? p.person?._id ?? p.person?.slug?.current ?? p.person?.name ?? idx}
              className="w-full min-w-0 overflow-hidden"
            >
              <Item p={p} clamp />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

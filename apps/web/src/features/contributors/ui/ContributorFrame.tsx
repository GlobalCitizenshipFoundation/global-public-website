"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { RelatedContributorsType } from "@gcf/types";

import { paths, path } from "@/shared/config/paths";

type FrameProps = {
  contributor: RelatedContributorsType;
  className?: string;
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

const ContributorFrame: React.FC<FrameProps> = ({ contributor, className }) => {
  const slug = contributor.slug?.current;
  const href = slug ? path.contributor(slug) : paths.contributors;

  const photoUrl = contributor.photo?.asset?.url;

  const name = contributor.name ?? "";
  const role = contributor.designation ?? "";
  const organization = contributor.organization ?? "";
  const country = contributor.country ?? "";

  const hasName = Boolean(name);
  const hasRole = Boolean(role);
  const hasOrg = Boolean(organization);
  const hasCountry = Boolean(country);

  return (
    <Link href={href} className={cx("group flex h-full w-full flex-col", className)}>
      {/* Photo 1:1 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[7.33px]">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name || "Contributor"}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, (max-width: 1280px) 28vw, 250px"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-black/5" />
        )}
      </div>

      {/* Text (CQ auto-scale, gap-first) */}
      <div className="min-h-0 flex-1 overflow-hidden pt-[clamp(8px,4cqw,20px)]">
        <div className="flex flex-col gap-[clamp(4px,2cqw,8px)]">
          {hasName ? (
            <h3 className="font-poppins text-subtitles line-clamp-1 text-[clamp(14px,7cqw,18px)] leading-tight font-semibold">
              {name}
            </h3>
          ) : null}

          {hasRole ? (
            <p className="font-inter text-primary line-clamp-1 text-[clamp(13px,6.5cqw,18px)] leading-tight font-medium">
              {role}
            </p>
          ) : null}
        </div>

        {/* Slightly bigger separation before org (only if it exists) */}
        {hasOrg ? (
          <p className="font-inter text-destignation mt-[clamp(4px,2.6cqw,10px)] line-clamp-1 text-[clamp(12px,5.8cqw,16px)] leading-tight font-normal">
            {organization}
          </p>
        ) : null}

        {hasCountry ? (
          <p
            className={cx(
              "font-inter text-destignation line-clamp-1 leading-tight font-normal",
              // if org exists, keep it tighter; otherwise give a bit more air
              hasOrg ? "mt-[clamp(3px,1.6cqw,6px)]" : "mt-[clamp(4px,2.2cqw,8px)]",
              "text-[clamp(11px,5.2cqw,14px)]",
            )}
          >
            {country}
          </p>
        ) : null}
      </div>
    </Link>
  );
};

export default ContributorFrame;

"use client";

import Image from "next/image";
import Link from "next/link";
import type { RelatedContributorsType } from "@gcf/types";
import { paths, path } from "@/shared/config/paths";

type FrameProps = {
  contributor: RelatedContributorsType;
  style?: React.CSSProperties;
};

export const Contributor: React.FC<FrameProps> = ({ contributor, style }) => {
  const slug = contributor.slug?.current;
  const photoUrl = contributor.photo?.asset?.url;
  const href = slug ? path.contributor(slug) : paths.contributors;

  const name = contributor.name ?? "";
  const role = contributor.designation ?? "";

  return (
    <Link
      style={style}
      href={href}
      className="bg-[#DFDFDF] flex flex-col h-full rounded-[12px] max-w-85 max-[768px]:max-w-65 w-full"
    >
      <div className="relative h-80 max-[768px]:h-55">
        <Image
          src={photoUrl || ""}
          alt={name || "Contributor"}
          fill
          priority
          className="object-cover rounded-[12px]"
        />
      </div>
      <div className="px-4 py-6 flex-1 flex flex-col justify-end">
        <h3 className="text-black pb-2">{name}</h3>
        <p className="text-black">{role}</p>
      </div>
      <div className=""></div>
    </Link>
  );
};

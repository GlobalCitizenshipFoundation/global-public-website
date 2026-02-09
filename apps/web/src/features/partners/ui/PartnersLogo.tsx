import React from "react";
import type { RelatedPartnersType } from "@gcf/types";
import Image from "next/image";
import Link from "next/link";
import { path } from "@/shared/config/paths";

type Props = {
  partner: RelatedPartnersType;
  className?: string;
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

const PartnersLogo: React.FC<Props> = ({ partner, className }) => {
  const slug = partner.slug?.current;
  const logoUrl = partner.logo?.asset?.url;

  if (!logoUrl || !slug) return null;

  return (
    <Link
      href={path.partner(slug)}
      className={cx(
        "block h-full w-full transition-transform duration-200 hover:scale-[1.04]",
        className,
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={logoUrl}
          alt={partner.title ?? "Partner logo"}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, (max-width: 1280px) 28vw, 250px"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default PartnersLogo;

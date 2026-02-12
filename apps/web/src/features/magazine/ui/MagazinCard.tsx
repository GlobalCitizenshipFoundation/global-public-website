import type { MagazinSingleType } from "@gcf/types";
import Image from "next/image";
import Link from "next/link";
import { formatEventDate } from "@/features/events/lib/formatters";
import { path, paths } from "@/shared/config/paths";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

type Props = {
  magazin: MagazinSingleType;
};

export function MagazinCard({ magazin }: Props) {
  const formattedStartDate = magazin.date ? formatEventDate(magazin.date) : "No date available";

  const slug = magazin.slug?.current;
  const href = slug ? path.magazinePost(slug) : paths.magazine;

  const imageUrl = magazin.magazinImage?.asset?.url;

  return (
    <article className="group relative flex h-full w-87.75 flex-col rounded-[10px]">
      {/* Overlay NA WIERZCHU - klika się wszystko */}
      <Link
        href={href}
        aria-label={magazin.title ? `Open magazine: ${magazin.title}` : "Open magazine"}
        className="absolute inset-0 z-10 rounded-[10px]"
      />

      {/* Okładka */}
      <div className="mb-5 w-full overflow-hidden rounded-[10px]">
        <div className="relative aspect-[5/7] w-full overflow-hidden rounded-[10px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={magazin.title || "Magazine cover"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-white/10 bg-black/25">
              <span className="text-borders/80 text-sm font-medium">No image</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 flex w-full items-center justify-between">
        <p className="text-borders text-sm">{formattedStartDate}</p>
      </div>

      <h2 className="font-inter mb-7.5 text-2xl font-semibold">{magazin.title}</h2>

      {/* Przycisk NAD overlayem */}
      <div className="relative z-20 mt-auto">
        <ButtonPrimary href={href} className="w-54.25" aria-disabled={!slug}>
          Read More
        </ButtonPrimary>
      </div>
    </article>
  );
}

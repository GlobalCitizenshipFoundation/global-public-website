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
  const formattedDate = magazin.date ? formatEventDate(magazin.date) : "No date available";

  const slug = magazin.slug?.current;
  const href = slug ? path.magazinePost(slug) : paths.magazine;

  const imageUrl = magazin.magazinImage?.asset?.url;
  const title = magazin.title || "Untitled magazine";

  return (
    <article className="group relative flex h-full w-full min-w-0 justify-center rounded-[10px]">
      <div className="relative flex w-full max-w-[362px] flex-col">
        <Link
          href={href}
          aria-label={`Open magazine: ${title}`}
          className="absolute inset-0 z-10 rounded-[10px]"
        />

        <div className="mb-5 overflow-hidden rounded-[10px]">
          <div className="relative aspect-[5/7] w-full overflow-hidden rounded-[10px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, 362px"
                className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border border-white/10 bg-black/25">
                <span className="text-borders/80 text-sm font-medium">No image</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-borders mb-5 text-sm">{formattedDate}</p>

        <h2 className="font-inter mb-7.5 line-clamp-2 text-2xl leading-tight font-semibold">
          {title}
        </h2>

        <div className="relative z-20 mt-auto">
          <ButtonPrimary href={href} className="w-54.25" aria-disabled={!slug}>
            Read More
          </ButtonPrimary>
        </div>
      </div>
    </article>
  );
}

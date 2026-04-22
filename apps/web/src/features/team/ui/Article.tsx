import Link from "next/link";
import Image from "next/image";
import type { ArticleListItemType } from "@gcf/types";

type Props = {
  article: ArticleListItemType;
};

export function Article({ article }: Props) {
  return (
    <>
      <Link
        href={article.slug?.current ? `/contributors/${article.slug.current}` : "/education"}
        className={`w-full relative block overflow-hidden rounded-xl bg-gray-900 text-white h-50
        } cursor-pointer transition-transform`}
      >
        {article.coverImage?.asset?.url ? (
          <Image
            src={article.coverImage.asset.url}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" aria-hidden />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full p-4 sm:p-5">
          <div className="absolute top-1/2 right-4 left-4 -translate-y-1/2">
            <span className="mb-1 block text-xs opacity-80 sm:text-sm">
              {article.readingLength} min read
            </span>

            <h3 className="text-sm leading-snug font-normal sm:text-base md:text-lg">
              {article.title}
            </h3>

            {article.description ? (
              <p className="mt-2 line-clamp-3 text-xs opacity-90 sm:text-sm">
                {article.description}
              </p>
            ) : null}
          </div>

          <span className="absolute bottom-4 left-4 text-xs font-normal sm:text-sm">
            Read More →
          </span>
        </div>
      </Link>
    </>
  );
}

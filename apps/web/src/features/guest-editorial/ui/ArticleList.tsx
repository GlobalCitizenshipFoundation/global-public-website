import type { ArticleListItemType } from "@gcf/types";
import Image from "next/image";
import Link from "next/link";
import EducationPagination from "@/features/education/ui/EducationPagination";

type Props = {
  page: number;
  perPage: number;
  total: number;
  items: ArticleListItemType[];
  categoryId: string;
};

export default function ArticleList({ page, perPage, total, items, categoryId }: Props) {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {items.map((article, index) => (
          <Link
            key={article._id}
            href={article.slug?.current ? `/education/${article.slug.current}` : "/education"}
            className={`relative block h-64 overflow-hidden rounded-xl bg-gray-900 text-white sm:h-72 md:h-80 ${
              index > 0 ? "hidden sm:block" : ""
            } cursor-pointer transition-transform hover:scale-105`}
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
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <EducationPagination page={page} total={total} perPage={perPage} categoryId={categoryId} />
      </div>
    </section>
  );
}

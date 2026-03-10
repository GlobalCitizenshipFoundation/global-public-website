import { getArticles } from "@features/education/api/getArticles";
import type { Metadata } from "next";

import { Container } from "@/shared/ui/Container";
import Link from "next/link";
import Image from "next/image";
import EducationPagination from "@/features/education/ui/EducationPagination";

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function parseEducationSearchParams(sp: { page?: string }) {
  const pageNum = Number(sp.page);
  const page = Number.isFinite(pageNum) && pageNum > 1 ? Math.floor(pageNum) : 1;
  return { page };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const { page } = parseEducationSearchParams(sp);

  return {
    title: page > 1 ? `Education - Page ${page}` : "Education",
  };
}

export default async function EducationPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { page } = parseEducationSearchParams(sp);

  const perPage = 8;

  const { items, total } = await getArticles({ page, perPage });

  return (
    <div className="mt-18 mb-36">
      <Container variant="big">
        <section className="mb-10">
          <h3 className="mb-3.5 text-[42px] font-semibold">Guest Editiorial</h3>

          <div className="flex flex-col gap-5.5">
            <p>
              Transforming education for global citizenship and sustainable development. We work to
              wards transforming education for global citizenship and sustainable.
            </p>
          </div>
        </section>

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
            <EducationPagination page={page} total={total} perPage={perPage} />
          </div>
        </section>

        <section className="mb-10">
          <h3 className="mb-3.5 text-[42px] font-semibold">Category2</h3>

          <div className="flex flex-col gap-5.5">
            <p>
              Transforming education for global citizenship and sustainable development. We work to
              wards transforming education for global citizenship and sustainable.
            </p>
          </div>
        </section>

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
            <EducationPagination page={page} total={total} perPage={perPage} />
          </div>
        </section>

        <section className="mb-10">
          <h3 className="mb-3.5 text-[42px] font-semibold">Category3</h3>

          <div className="flex flex-col gap-5.5">
            <p>
              Transforming education for global citizenship and sustainable development. We work to
              wards transforming education for global citizenship and sustainable.
            </p>
          </div>
        </section>

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
            <EducationPagination page={page} total={total} perPage={perPage} />
          </div>
        </section>
      </Container>
    </div>
  );
}

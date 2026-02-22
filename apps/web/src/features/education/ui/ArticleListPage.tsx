import type { ArticleListItemType } from "@gcf/types";
import Image from "next/image";
import Link from "next/link";

import EducationPagination from "@/features/education/ui/EducationPagination";
import SocialLink from "@/features/social/ui/SocialLink";
import type { SocialName } from "@/shared/config/social";
import { Container } from "@/shared/ui/Container";

type Social = {
  name: SocialName;
  label?: string;
  defaultUrl?: string;
};

type Props = {
  page: number;
  perPage: number;
  total: number;
  items: ArticleListItemType[];
  socials: readonly Social[]; // ✅ readonly akceptuje const arrays
};

export default function ArticleListPage({ page, perPage, total, items, socials }: Props) {
  return (
    <div className="mt-18 mb-36">
      <Container variant="big">
        <section className="mb-10">
          <h3 className="mb-3.5 text-[42px] font-semibold">Education</h3>

          <div className="flex flex-col flex-wrap gap-5.5">
            <p>
              Transforming education for global citizenship and sustainable The Global Citizen ship
              Foundation continues commitment Preparing young people for a smart future.
              <br />
              <br />
              We work to wards transforming education for global citizenship and development. We
              work to wards transforming for global citizenship and sustainable. Firstly, the
              purpose educational leadership and the pipeline of leaders must be dismantled, and
              newly created to encompass a vision of possibilities, prioritizing learners locally
              and globally. The metaphor of a trap door, a door that leads to another hidden room,
              reflects the current stoppage The future lies behind that door, and we are asked.
            </p>

            <button
              type="button"
              className="w-fit cursor-pointer rounded-lg border border-[#DFDFDF] px-14 py-3.5"
            >
              View all topics
            </button>

            <div className="flex items-center justify-between border-y border-[#DFDFDF] p-2">
              <span className="font-bold">Sharing:</span>

              <div className="flex gap-3">
                {socials.map((link) => (
                  <SocialLink
                    key={link.name}
                    href={link.defaultUrl ?? `https://${link.name}.pl`}
                    kind={link.name}
                    variant="button"
                    {...(link.label ? { label: link.label } : {})}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Articles</h3>

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

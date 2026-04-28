import type { Metadata } from "next";
import { getArticles } from "@/features/education/api/getArticles";
import ArticleList from "@/features/education/ui/ArticleList";
import { getEvents } from "@/features/events";
import EventsList from "@/features/events/ui/components/EventsList";
import { getMagazine } from "@/features/magazine/api/getMagazine";
import { MagazinCard } from "@/features/magazine/ui/MagazinCard";
import { getPages } from "@/features/pages/api/getPages";
import { getTeamMembers } from "@/features/team/api/getTeamMembers";
import { ProfileSwiper } from "@/features/team/ui/ProfileSwiper";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { Container } from "@/shared/ui/Container";
import { Input } from "@/shared/ui/Input";

export const metadata: Metadata = {
  title: "Search",
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    articlesPage?: string;
    eventsPage?: string;
  }>;
};

export type SharedSearchParams = {
  q?: string;
  articlesPage?: string;
  eventsPage?: string;
};

export function parseSharedSearchParams(sp: SharedSearchParams) {
  const q = (sp.q ?? "").trim();

  const parsePage = (value?: string) => {
    const page = Number(value);
    return Number.isFinite(page) && page > 1 ? Math.floor(page) : 1;
  };

  return {
    q,
    articlesPage: parsePage(sp.articlesPage),
    eventsPage: parsePage(sp.eventsPage),
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { q, articlesPage, eventsPage } = parseSharedSearchParams(sp);

  const perPage = 8;

  const [teamMembers, magazines, pages, articles, events] = await Promise.all([
    getTeamMembers(),
    getMagazine(),
    getPages(),
    getArticles({ q, page: articlesPage, perPage }),
    getEvents({ q, page: eventsPage, perPage }),
  ]);

  return (
    <>
      <Container variant="big" className="mt-25">
        <div className="m-auto mb-20 flex max-w-250 flex-col items-center border-b border-gray-300 pb-20">
          <h1 className="text-titles mb-5 text-4xl font-semibold">
            How Can We Help
          </h1>
          <Input />
        </div>

        <ArticleList
          items={articles.items}
          total={articles.total}
          page={articlesPage}
          perPage={perPage}
        />

        <EventsList
          items={events.items}
          total={events.total}
          page={eventsPage}
          perPage={perPage}
        />
      </Container>

      <section className="bg-[#F6F4F0] py-15">
        <Container variant="regular">
          <div className="mb-10 max-w-[380px]">
            <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">Pages</h2>
            <p>
              Transforming education for global citizenship and sustainable The
              Global Citizen ship.
            </p>
          </div>

          {pages?.length ? (
            <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => {
                const href = page.link?.startsWith("/")
                  ? page.link
                  : `/${page.link}`;

                return (
                  <article className="flex h-full flex-col" key={page._id}>
                    <h3 className="pb-3">{page.title}</h3>
                    <p className="pb-5">{page.description}</p>

                    <div className="mt-auto">
                      <ButtonPrimary href={href} className="!max-w-[220px]">
                        {page.title}
                      </ButtonPrimary>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-borders text-base">
              No pages available right now.
            </p>
          )}
        </Container>
      </section>

      <Container variant="big">
        <section className="my-25">
          <div className="flex justify-between gap-6">
            <div className="mb-10 max-w-[380px]">
              <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
                Profiles
              </h2>
              <p>
                Transforming education for global citizenship and sustainable
                The Global Citizen ship.
              </p>
            </div>

            <ButtonPrimary href="/team" className="!max-w-[220px]">
              All team
            </ButtonPrimary>
          </div>

          <ProfileSwiper profiles={teamMembers} color="#0000C0" />
        </section>
      </Container>

      <section className="bg-[#C6E3DF] py-25">
        <Container variant="regular">
          <div className="flex justify-between gap-6">
            <div className="mb-10 max-w-[380px]">
              <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
                Magazines
              </h2>
              <p>
                Transforming education for global citizenship and sustainable
                The Global Citizen ship.
              </p>
            </div>

            <ButtonPrimary href="/magazine" className="!max-w-[220px]">
              All magazines
            </ButtonPrimary>
          </div>

          {magazines?.length ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {magazines.map((magazine) => (
                <MagazinCard key={magazine._id} magazin={magazine} />
              ))}
            </div>
          ) : (
            <p className="text-borders text-base">
              No magazines available right now.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

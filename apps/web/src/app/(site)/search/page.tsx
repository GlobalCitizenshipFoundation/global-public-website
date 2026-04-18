import type { Metadata } from "next";
import { Container } from "@/shared/ui/Container";
// import { Input } from "@/shared/ui/Input";
import ArticleList from "@/features/education/ui/ArticleList";
import EventsList from "@/features/events/ui/components/EventsList";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { ProfileSwiper } from "@/features/team/ui/ProfileSwiper";
import { getTeamMembers } from "@/features/team/api/getTeamMembers";
import { getMagazine } from "@/features/magazine/api/getMagazine";
import { MagazinCard } from "@/features/magazine/ui/MagazinCard";

export const metadata: Metadata = {
  title: "Search",
};

type PageProps = {
  searchParams: Promise<{
    articlesPage?: string;
    eventsPage?: string;
  }>;
};

const SearchPage = async ({ searchParams }: PageProps) => {
  const teamMembers = await getTeamMembers();
  const magazins = await getMagazine();

  return (
    <>
      <Container variant="big" className="mt-25">
        <div className="flex flex-col m-auto mb-20 items-center border-b border-gray-300 pb-20 max-w-250">
          <h2 className="text-titles mb-5 text-4xl font-semibold">How Can We Help</h2>
          {/* <Input
          value=""
          onChange={() => { }}
          placeholder="Search"
          style={{ maxWidth: '550px' }}
        /> */}
        </div>

        <ArticleList searchParams={searchParams} />
        <EventsList searchParams={searchParams} />
      </Container>
      <section className="bg-[#F6F4F0] py-15">
        <Container variant="regular">
          <div className="mb-10 max-w-[380px]">
            <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Pages</h3>
            <p className="">
              Transforming education for global citizenship and sustainable The Global Citizen ship.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="">
              <h4 className="pb-3">About</h4>
              <p className="pb-5">Preparing young people for a smart future where quality.</p>
              <ButtonPrimary href="/" className="!max-w-[220px]">
                Learn more
              </ButtonPrimary>
            </div>
          </div>
        </Container>
      </section>
      <Container variant="big">
        <div className="my-25">
          <div className="flex justify-between gap-6">
            <div className="mb-10 max-w-[380px]">
              <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Profiles</h3>
              <p className="">
                Transforming education for global citizenship and sustainable The Global Citizen
                ship.
              </p>
            </div>
            <ButtonPrimary href="team" className="!max-w-[220px]">
              All team
            </ButtonPrimary>
          </div>
          <ProfileSwiper profiles={teamMembers} color="#0000C0" />
        </div>
      </Container>
      <section className="bg-[#C6E3DF] py-25">
        <Container variant="regular">
          <div className="flex justify-between gap-6">
            <div className="mb-10 max-w-[380px]">
              <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Magazins</h3>
              <p className="">
                Transforming education for global citizenship and sustainable The Global Citizen
                ship.
              </p>
            </div>
            <ButtonPrimary href="magazine" className="!max-w-[220px]">
              All magazins
            </ButtonPrimary>
          </div>
          {magazins?.length ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {magazins.map((magazin) => (
                <MagazinCard key={magazin._id} magazin={magazin} />
              ))}
            </div>
          ) : (
            <p className="text-borders text-base">No magazines available right now.</p>
          )}
        </Container>
      </section>
    </>
  );
};

export default SearchPage;

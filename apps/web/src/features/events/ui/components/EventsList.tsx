import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { getEvents } from "../../api/getEvents";
import { EventCard } from "../cards/EventCard";
import Pagination from "../pagination/Pagination";

type PageProps = {
  searchParams: Promise<{
    eventsPage?: string;
  }>;
};

function parseEducationSearchParams(sp: { eventsPage?: string }) {
  const pageNum = Number(sp.eventsPage);
  const page = Number.isFinite(pageNum) && pageNum > 1 ? Math.floor(pageNum) : 1;
  return { page };
}

export default async function EventsList({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { page } = parseEducationSearchParams(sp);
  const perPage = 8;
  const { items, total } = await getEvents({ page, perPage });
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <section className="mb-25">
      <div className="flex justify-between gap-6 mb-10">
        <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Events</h3>
        <ButtonPrimary href="events" className="!max-w-[240px]">
          All events
        </ButtonPrimary>
      </div>
      <div className="mb-15 grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {items.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} pageParamKey={"eventsPage"} />;
    </section>
  );
}

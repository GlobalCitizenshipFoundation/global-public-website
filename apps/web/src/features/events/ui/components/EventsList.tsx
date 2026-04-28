import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { EventCard } from "../cards/EventCard";
import Pagination from "../pagination/Pagination";
import type { EventCard as EventCardType } from "@gcf/types";

type Props = {
  items: EventCardType[];
  total: number;
  page: number;
  perPage: number;
};

export default async function EventsList({ items, total, page, perPage }: Props) {
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
        {items.length === 0 ? (
          <p className="text-2xl">No events available right now.</p>
        ) : (
          items.map((event) => <EventCard key={event._id} event={event} />)
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} pageParamKey={"eventsPage"} />
    </section>
  );
}

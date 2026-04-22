import type { EventCard as EventCardType } from "@gcf/types";
import { EventCard } from "../cards/EventCard";

type Props = {
  items: EventCardType[];
};

const MAX_ITEMS = 9;

export default function EventsGrid({ items }: Props) {
  const list = items.slice(0, MAX_ITEMS);

  if (!list.length) {
    return <p className="text-borders text-base">No events available right now.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-9 md:grid-cols-2 xl:grid-cols-3">
      {list.map((event, index) => (
        <EventCard key={event._id} event={event} index={index} />
      ))}
    </div>
  );
}

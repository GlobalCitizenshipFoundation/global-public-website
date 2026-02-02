import RelatedEvent from '@/features/events/ui/RelatedEvent';
import type { RelatedEventProps } from '@gcf/types';

type Props = {
  items: RelatedEventProps[];
};

const MAX_ITEMS = 9;

export default function EventsGrid({ items }: Props) {
  const list = items.slice(0, MAX_ITEMS);

  if (!list.length) {
    return <p className="text-borders mt-6 text-base">No events available right now.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-[80px] md:grid-cols-2 xl:grid-cols-3">
      {list.map((event) => (
        <RelatedEvent key={event._id} event={event} />
      ))}
    </div>
  );
}

import ContainerBig from '@/shared/ui/ContainerBig';
import { getEvents } from '@/features/events/api/getEvents';
import RelatedEvent from '@/features/events/ui/RelatedEvent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
};

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <div className="bg-background-darker py-16 md:py-24">
      <ContainerBig>
        <h1 className="mb-8 text-3xl font-semibold md:text-[42px]">All Events</h1>

        {events?.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <RelatedEvent key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-borders text-base">No events available right now.</p>
        )}
      </ContainerBig>
    </div>
  );
};

export default EventsPage;

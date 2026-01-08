import ContainerBig from '@/components/ContainerBig';
import { getEvents } from '../../lib/events-fetch';
import RelatedEvent from '@/components/Events/RelatedEvent';

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <>
      <div className="bg-background-darker py-36">
        <ContainerBig>
          <h3 className="mb-3.5 text-[42px] font-semibold">All Events</h3>
          <div className="flex flex-wrap gap-[22px]">
            {events && events.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {events.map((event) => (
                    <RelatedEvent event={event} key={event._id} />
                  ))}
                </div>
              </>
            )}
          </div>
        </ContainerBig>
      </div>
    </>
  );
};

export default EventsPage;

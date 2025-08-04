import ContainerBig from "@/components/ContainerBig";
import Link from "next/link";
import { getContributors } from "../../../lib/contributors-fetch";
import ContributorFrame from "@/components/Contributors/ContributorFrame";
import { getEvents } from "../../../lib/events-fetch";
import RelatedEvent from "@/components/Events/RelatedEvent";

const EventsPage = async () => {
  const events = await getEvents();

  console.log(events)

  return (
    <>
        <div className="bg-background-darker py-36">
          <ContainerBig>
            <h3 className="text-[42px] font-semibold mb-3.5">All Events</h3>
            <div className="flex flex-wrap gap-[22px]">
              {events && events.length > 0 && (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {events.map((event) => (
                    <RelatedEvent event={event} key={event._id}/>
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
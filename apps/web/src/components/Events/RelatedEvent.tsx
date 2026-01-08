import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import { RelatedEventProps } from '../../utils/event-singleTypes';
import { eventData } from '../../lib/event-date';

type Props = {
  event: RelatedEventProps;
};

const RelatedEvent: React.FC<Props> = ({ event }) => {
  const formattedStartDate = event.startDateTime
    ? eventData(event.startDateTime)
    : 'No date available';

  return (
    <div key={event._id} className="w-[351px]">
      {event.eventImage && (
        <img
          src={event.eventImage?.asset.url}
          alt={event.eventHeading}
          className="mb-5 h-auto w-full rounded-[10px] object-contain"
        />
      )}
      <div className="mb-5 flex w-full items-center justify-between">
        <button className="rounded-full bg-white px-4 py-2.5 whitespace-nowrap">Cover Story</button>

        <p>{formattedStartDate}</p>
      </div>
      <h2 className="font-inter mb-7.5 text-2xl font-semibold">{event.eventHeading}</h2>
      <ButtonPrimary href={`/events/${event.slug?.current}`} width={217} className="grow">
        Read More
      </ButtonPrimary>
    </div>
  );
};

export default RelatedEvent;

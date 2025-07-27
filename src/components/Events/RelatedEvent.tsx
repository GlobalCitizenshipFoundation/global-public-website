import React from "react";
import ButtonPrimary from "../ButtonPrimary";
import { RelatedEventProps } from "../../../utils/event-singleTypes";

type Props = {
    event: RelatedEventProps;
}

const RelatedEvent: React.FC<Props> = ( {event} ) => {
    return (
        <div key={event._id} className='w-[351px]'>
            {event.eventImage && (
                <img src={event.eventImage?.asset.url} alt={event.eventHeading} className='w-full rounded-[10px] h-auto object-contain mb-5' />
            )}
            <div className="w-full flex justify-between mb-5 items-center">
                <button className="px-4 py-2.5 bg-white rounded-full whitespace-nowrap">
                    Cover Story
                </button>

                <p>20 March, 2025</p>
            </div>
            <h2 className="font-inter font-semibold text-2xl mb-7.5">{event.eventHeading}</h2>
            <ButtonPrimary href={`/events/${event.slug?.current}`} width={217}>
                Read More
            </ButtonPrimary>
        </div>
    );
};

export default RelatedEvent;
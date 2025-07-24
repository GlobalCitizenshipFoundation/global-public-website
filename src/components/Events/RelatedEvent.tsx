import Link from "next/link";
import React from "react";
import ButtonPrimary from "../ButtonPrimary";
import EventData from "@/app/event-single/components/EventData/EventData";
import { EventSingle } from "@/app/event-single/page";

export interface RelatedEventProps {
    event: Pick<EventSingle, "_id" | "eventHeading" | "eventImage" | "startDateTime">;
}

const RelatedEvent: React.FC<RelatedEventProps> = ( {event} ) => {
    return (
        <div key={event._id} className='w-[351px]'>
            {event && (
            <img src={event.eventImage?.asset.url} alt={event.eventHeading} className='w-full rounded-[10px] h-auto object-contain mb-5' />
            )}
            <div className="w-full flex justify-between mb-5">
                <button className="px-4 py-2.5 bg-white rounded-full whitespace-nowrap">
                    Cover Story
                </button>

                <EventData data={event.startDateTime} />
            </div>
            <h2 className="font-inter font-semibold text-2xl mb-7.5">{event.eventHeading}</h2>
            <ButtonPrimary href="/event-single" width={217}>
                Read More
            </ButtonPrimary>
        </div>
    );
};

export default RelatedEvent;
                
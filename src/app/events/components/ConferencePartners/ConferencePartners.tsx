import React from "react";
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from "@portabletext/react";

interface Props {
    description: PortableTextBlock[];
    portableTextComponents: any;
}

export const ConferencePartners: React.FC<Props> = ({description, portableTextComponents}) => {
    const partners: string[] = Array(10).fill('/images/globalivo.jpg');
    const eventPartners: string[] = partners.slice(0, 4);
    const host: string = '/images/gc.jpg';

    return (
        <div className="flex flex-col mb-20 lg:mb-[70px]">
            <div className="flex flex-col mb-11 lg:mb-[70px]">
                <h2 className="text-2xl lg:text-[42px] text-titles mb-2.5 lg:mb-5">Conference Partners</h2>
                <PortableText value={description} components={portableTextComponents}/>
            </div>
            <div className="flex flex-col gap-14 lg:gap-[70px]">
                <div className="flex flex-col gap-6 lg:gap-7 ">
                    <h2 className="text-primary-darker text-2xl lg:text-[42px] mb-0">Hosted by</h2>
                    <div className='lg:grid-cols-4 grid grid-cols-2 gap-x-3.5 gap-y-8'>
                    <img  className='flex rounded-lg w-full object-contain' src={host} alt={host} />
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-7 ">
                    <h2 className="text-primary-darker text-2xl lg:text-[42px] mb-0">Event Partners</h2>
                    <div className='lg:grid-cols-4 grid grid-cols-2 gap-x-3.5 gap-y-8'>
                        {eventPartners.map((partner, index) => (
                            <img key={partner + index} className='flex rounded-lg w-full object-contain h-28 lg:h-44' src={partner} alt={partner + index} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-7 ">
                    <h2 className="text-primary-darker text-2xl lg:text-[42px] mb-0">Knowledge Partners</h2>
                    <div className='lg:grid-cols-4 grid grid-cols-2 gap-x-3.5 gap-y-8'>
                        {partners.map((partner, index) => (
                            <img key={partner + index} className='flex rounded-lg w-full object-contain h-28 lg:h-44' src={partner} alt={partner + index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
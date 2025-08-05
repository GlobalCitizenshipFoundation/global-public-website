import React from "react";
import { RelatedPartnersType } from "../../../../../utils/partners-singleTypes";
import PartnersLogo from "@/components/Partners/PartnersLogo";

interface Props {
    partners: RelatedPartnersType[];
    type: 'Host' | 'EventPartner' | 'KnowledgePartners';
};

export const ConferencePartners: React.FC<Props> = ({partners, type}) => {
    const partnerType = {
        Host: 'Hosted by',
        EventPartner: 'Event Partner',
        KnowledgePartners: 'Knowledge Partners'
    }[type];

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl lg:text-[42px] text-primary-darker mb-0">{partnerType}</h2>
            <div className="flex gap-y-15 gap-x-20">
                {type === 'Host' ? (
                    <PartnersLogo partner={partners[0]} key={partners[0]._id}/>
                ) : (
                    partners.map(partner => (
                        <PartnersLogo partner={partner} key={partner._id}/>
                    ))
                )}
            </div>
        </div>
    )
}
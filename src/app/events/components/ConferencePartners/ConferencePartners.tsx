import React from 'react';
import { RelatedPartnersType } from '../../../../../utils/partners-singleTypes';
import PartnersLogo from '@/components/Partners/PartnersLogo';

interface Props {
  partners: RelatedPartnersType[];
  type: 'Host' | 'EventPartner' | 'KnowledgePartners';
}

export const ConferencePartners: React.FC<Props> = ({ partners, type }) => {
  const partnerType = {
    Host: 'Hosted by',
    EventPartner: 'Event Partner',
    KnowledgePartners: 'Knowledge Partners',
  }[type];

  const typeMap: Record<Props['type'], string> = {
    Host: 'hostedBy',
    EventPartner: 'eventPartners',
    KnowledgePartners: 'knowledgePartners',
  };

  const filteredPartners = partners.filter((partner) => partner.partnerType === typeMap[type]);

  return (
    <div className="flex flex-col">
      <h2 className="text-primary-darker text-2xl lg:mb-9 lg:text-[42px]">{partnerType}</h2>
      <div className="flex gap-x-20 gap-y-15">
        {filteredPartners.map((partner) => (
          <PartnersLogo partner={partner} key={partner._id} />
        ))}
      </div>
    </div>
  );
};

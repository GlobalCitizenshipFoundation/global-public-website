import React from 'react';
import { RelatedPartnersType } from '../../../../../utils/partners-singleTypes';
import PartnersLogo from '@/components/Partners/PartnersLogo';

interface Props {
  partners: RelatedPartnersType[];
  type: 'Hosted by' | 'Event Partners' | 'Knowledge Partners';
}

export const ConferencePartners: React.FC<Props> = ({ partners, type }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-primary-darker text-2xl lg:mb-9 lg:text-[42px]">{type}</h2>
      <div className="flex gap-x-20 gap-y-15">
        {partners.map((partner) => (
          <PartnersLogo partner={partner} key={partner._id} />
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import type { RelatedPartnersType } from '@gcf/types';
import PartnersLogo from '@/features/partners/ui/PartnersLogo';

interface Props {
  partners: RelatedPartnersType[];
  type: 'Hosted by' | 'Event Partners' | 'Knowledge Partners';
}

export const ConferencePartners: React.FC<Props> = ({ partners, type }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-primary-darker text-[clamp(22px,3vw,42px)] font-semibold">{type}</h2>

      <div className="flex flex-wrap items-center gap-x-[clamp(18px,4vw,80px)] gap-y-[clamp(14px,3vw,60px)]">
        {partners.map((partner) => (
          <PartnersLogo partner={partner} key={partner._id} />
        ))}
      </div>
    </section>
  );
};

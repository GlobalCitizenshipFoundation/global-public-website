import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import { RelatedPartnersType } from '../../../utils/partners-singleTypes';

type Props = {
  partner: RelatedPartnersType;
};

const PartnersLogo: React.FC<Props> = ({ partner }) => {
  return (
    <div className="flex h-[223px] w-[223px] items-center justify-center">
      {partner.logo && (
        <img
          src={partner.logo.asset.url}
          alt={partner.title}
          className="h-auto w-full object-contain"
        />
      )}
    </div>
  );
};

export default PartnersLogo;

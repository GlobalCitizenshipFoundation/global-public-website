import React from 'react';
import { RelatedPartnersType } from '../../utils/partners-singleTypes';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  partner: RelatedPartnersType;
};

const PartnersLogo: React.FC<Props> = ({ partner }) => {
  return (
    <div className="flex h-[223px] w-[223px] items-center justify-center">
      {partner.logo && (
        <Link
          href={`/partners/${partner.slug.current}`}
          className="transition-all duration-300 hover:scale-120"
        >
          <Image
            src={partner.logo.asset.url}
            alt={partner.title}
            className="h-auto w-full object-contain"
            width={223}
            height={223}
          />
        </Link>
      )}
    </div>
  );
};

export default PartnersLogo;

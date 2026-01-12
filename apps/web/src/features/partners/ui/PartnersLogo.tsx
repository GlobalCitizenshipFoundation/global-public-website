import React from 'react';
import type { RelatedPartnersType } from '@gcf/types';
import Image from 'next/image';
import Link from 'next/link';
import { path } from '@/shared/config/paths';

type Props = {
  partner: RelatedPartnersType;
};

const PartnersLogo: React.FC<Props> = ({ partner }) => {
  const slug = partner.slug?.current;

  if (!partner.logo || !slug) return null;

  return (
    <div className="flex h-[223px] w-[223px] items-center justify-center">
      <Link href={path.partner(slug)} className="transition-all duration-300 hover:scale-120">
        <Image
          src={partner.logo.asset.url}
          alt={partner.title}
          className="h-auto w-full object-contain"
          width={223}
          height={223}
        />
      </Link>
    </div>
  );
};

export default PartnersLogo;

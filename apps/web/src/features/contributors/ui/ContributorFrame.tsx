'use client';

import React from 'react';
import Link from 'next/link';
import type { RelatedContributorsType } from '@gcf/types';
import { paths, path } from '@/shared/config/paths';
import Image from 'next/image';

type FrameProps = {
  contributor: RelatedContributorsType;
};

const ContributorFrame: React.FC<FrameProps> = ({ contributor }) => {
  const slug = contributor.slug?.current;
  const href = slug ? path.contributor(slug) : paths.contributors;

  const photoUrl = contributor.photo?.asset?.url;

  return (
    <Link href={href} className="">
      {photoUrl ? (
        <div className="relative mb-7 h-87.5 w-84.5 overflow-hidden rounded-md">
          <Image
            src={photoUrl}
            alt={contributor.name ?? 'Contributor'}
            fill
            sizes="(max-width: 768px) 338px, 338px"
            className="object-cover"
          />
        </div>
      ) : null}

      {contributor.name ? (
        <h3 className="font-inter text-subtitles mb-1 text-3xl font-bold">{contributor.name}</h3>
      ) : null}

      {contributor.designation ? (
        <p className="text-destignation mb-3 text-[20px] font-medium">{contributor.designation}</p>
      ) : null}

      <div className="border-secondary-borders text-borders font-inter flex h-8.5 w-30.75 items-center justify-center rounded-full border text-[16px] font-normal">
        View Profile
      </div>
    </Link>
  );
};

export default ContributorFrame;

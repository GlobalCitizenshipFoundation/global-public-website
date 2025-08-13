import React from 'react';
import Link from 'next/link';
import { RelatedContributorsType } from '../../../utils/contributor-singleTypes';

type FrameProps = {
  contributor: RelatedContributorsType;
};

const ContributorFrame: React.FC<FrameProps> = ({ contributor }) => {
  return (
    <Link key={contributor._id} href={`/contributors/${contributor.slug?.current}`} className="">
      {contributor.photo && (
        <img
          src={contributor.photo.asset.url}
          alt={contributor.name ?? ''}
          className="mb-7 h-[350px] w-[338px] rounded-md object-cover"
        />
      )}
      {contributor.name && (
        <h3 className="font-inter text-subtitles mb-1 text-3xl font-bold">{contributor.name}</h3>
      )}
      {contributor.designation && (
        <p className="text-destignation mb-3 text-[20px] font-medium">{contributor.designation}</p>
      )}
      <div className="border-secondary-borders text-borders font-inter flex h-[34px] w-[123px] items-center justify-center rounded-full border text-[16px] font-normal">
        View Profile
      </div>
    </Link>
  );
};

export default ContributorFrame;

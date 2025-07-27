import React from 'react'
import Link from 'next/link';
import { RelatedContributorsType } from '../../../utils/contributor-singleTypes';

type FrameProps = {
    contributor: RelatedContributorsType;
}

const ContributorFrame: React.FC<FrameProps> = ({contributor}) => {
  return (
    <Link
        key={contributor._id}
        href={`/contributors/${contributor.slug?.current}`}
        className=""
    >
        {contributor.photo && (
            <img
                src={contributor.photo.asset.url}
                alt={contributor.name ?? ''}
                className="h-[350px] w-[338px] mb-7 object-cover rounded-md"
            />
        )}
        {contributor.name && (
            <h3 className="font-inter font-bold text-3xl text-subtitles mb-1">{contributor.name}</h3>
        )}
        {contributor.designation && (
            <p className="text-[20px] text-destignation font-medium mb-3">{contributor.designation}</p>
        )}
        <div className="border border-secondary-borders h-[34px] w-[123px] flex justify-center items-center rounded-full text-borders text-[16px] font-normal font-inter">
            View Profile
        </div>
    </Link>
  )
}

export default ContributorFrame

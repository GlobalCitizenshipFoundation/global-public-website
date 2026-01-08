import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import { eventData } from '../../lib/event-date';
import { MagazinSingleType } from '../../utils/magazin-singleTypes';

type Props = {
  magazin: MagazinSingleType;
};

const RelatedMagazin: React.FC<Props> = ({ magazin }) => {
  const formattedStartDate = magazin.date ? eventData(magazin.date) : 'No date available';

  return (
    <div className="w-[351px]">
      {magazin.magazinImage && (
        <img
          src={magazin.magazinImage?.asset.url}
          alt={magazin.title}
          className="mb-5 h-[200px] w-full rounded-[10px] object-contain"
        />
      )}
      <div className="mb-5 flex w-full items-center justify-between">
        <p>{formattedStartDate}</p>
      </div>
      <h2 className="font-inter mb-7.5 text-2xl font-semibold">{magazin.title}</h2>
      <ButtonPrimary href={`/magazine/${magazin.slug?.current}`} width={217} className="grow">
        Read More
      </ButtonPrimary>
    </div>
  );
};

export default RelatedMagazin;

import React from 'react'
import { PartnerSingleType } from '../../../../utils/partners-singleTypes'
import ContainerBig from '@/components/ContainerBig';
import BreakLine from '@/components/BreakLine';

type Props = {
    partner: PartnerSingleType;
}

const PartnerSingleComponent: React.FC<Props> = ({partner}) => {
  return (
    <>
        {partner.headerImage && <img className='w-full h-[480px] object-cover mb-10.5' src={partner.headerImage.asset.url} alt="header-image" />}
        <ContainerBig >
            <div className='flex flex-row gap-x-[140px]'>
                <div>
                    {partner.country && <p className='px-[24px] py-[11px] inline-block rounded-full bg-background-panel text-lg font-medium text-gray mb-4.5'>{partner.country}</p>}
                    {partner.title && <h2 className=''>{partner.title}</h2>}
                    {partner.shotrDescription && <p className='mb-[63px]'>{partner.shotrDescription}</p>}
                </div>
                <div className='w-[300px]'>
                    <div className='w-full h-[300px] bg-white flex justify-center items-center rounded-full shadow'>
                        {partner.logo && <img className='h-full w-full object-contain scale-95' src={partner.logo.asset.url} alt={partner.title} />}
                    </div>
                </div>
            </div>
            <BreakLine />
        </ContainerBig>
        
    </>
  )
}

export default PartnerSingleComponent


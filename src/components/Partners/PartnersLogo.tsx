import React from "react";
import ButtonPrimary from "../ButtonPrimary";
import { RelatedPartnersType } from "../../../utils/partners-singleTypes";

type Props = {
    partner: RelatedPartnersType;
}

const PartnersLogo: React.FC<Props> = ( {partner} ) => {
    return (
        <div className='w-[223px] h-[223px] flex justify-center items-center'>
            {partner.logo && (
                <img src={partner.logo.asset.url} alt={partner.title} className='w-full h-auto object-contain' />
            )}
        </div>
    );
};

export default PartnersLogo;
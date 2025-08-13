import Image from 'next/image';
import { eventData } from '../../lib/event-date';
import ButtonPrimary from './ButtonPrimary';

interface Props {
    src: string;
    kind: string;
    data: string;
    title: string;
    buttonTitle: string;
}

export const SwiperSlideCard: React.FC<Props> = ({ src, kind, data, title, buttonTitle }) => {
    const formattedStartDate = eventData(data);

    return (
        <div className="flex flex-col max-w-[506px]">
            <Image
                src={src}
                alt="Home-image"
                width={506}
                height={325}
                style={{ objectFit: 'contain' }}
                className='mb-10 rounded-[10px]'
            />
            <div className='flex justify-between mb-6'>
                <span className='flex text-xl/[142%] text-gray font-medium py-2.5 px-5 bg-background-beige rounded-[33px]'>{kind}</span>
                <span className=' flex items-center text-xl/[142%] text-gray font-medium '>{formattedStartDate}</span>
            </div>
            <h3 className='text-3xl/[125%] text-gray font-semibold mb-[68px]'>{title}</h3>
            <ButtonPrimary width={310} href='' children={buttonTitle}/>
        </div>
    )
}
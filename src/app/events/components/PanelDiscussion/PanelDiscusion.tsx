import ButtonRegular from "@/components/ButtonRegular"
import { PortableText, PortableTextBlock } from "@portabletext/react"
import EventData from "../EventData/EventData"

interface Props {
    pricing: string;
    price?: any;
    attedanceMode: string;
    startDateTime: string
    endDateTime: string;
    marketingMention: PortableTextBlock[];
    financialAid: PortableTextBlock[];
};

export const PanelDiscussion: React.FC<Props> = ({
    pricing,
    price,
    attedanceMode,
    startDateTime,
    endDateTime,
    marketingMention,
    financialAid, 
}) => {
    const now = new Date();
    const startDate = new Date(startDateTime);
    const diff = startDate.getTime() - now.getTime();

    return (
        <>
            <div 
              className='relative flex flex-col w-full bg-background-panel px-7 pt-7 pb-6 rounded-xl border-white border-5.5 border-b-5 border-dashed' 
            >
              <h4 className='text-primary-darker mb-3.5'>Panel Discussion</h4>
              <h2 className='text-3xl mb-8'>Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive Learning Spaces</h2>
              <div className={`flex gap-1.5 uppercase text-gray-600 text-base font-semibold ${diff > 0 ? 'mb-3.5' : 'mb-6'}`}>
                <span>{pricing === 'free' 
                  ? pricing 
                  : `${price.amount}${price.currency}`}</span>
                <span>{attedanceMode}</span>
                <span>Event</span>
              </div>
              {diff > 0 && <span className='font-semibold text-xl text-dark-blue mb-6'>Upcoming</span>}
              <EventData start={startDateTime} end={endDateTime} />
              <div className="absolute bg-background-primary w-12 h-12 rounded-full -bottom-7 -left-6"></div>
              <div className="absolute bg-background-primary w-12 h-12 rounded-full -bottom-7 -right-6"></div>
            </div>
            <div className='flex flex-col px-7 pt-10 pb-6 bg-background-panel rounded-xl mb-10'>
             {marketingMention && (
              <div className='mb-4 text-sm font-normal'>
                <PortableText value={marketingMention} />
              </div>
             )}
             <ButtonRegular className='mb-4'>
                <button className='text-white text-base font-medium '>Watch replay</button>
             </ButtonRegular>
             {financialAid && (
              <PortableText 
                value={financialAid} 
              />
             )}
            </div>
        </>
    )
}
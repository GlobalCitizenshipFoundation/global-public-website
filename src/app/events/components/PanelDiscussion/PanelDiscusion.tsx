import ButtonRegular from "@/components/ButtonRegular";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import EventData from "../EventData/EventData";

interface Props {
    pricing?: string;
    price?: { amount?: number; currency?: string } | number;
    attedanceMode?: string;
    startDateTime?: string;
    endDateTime?: string;
    marketingMention?: PortableTextBlock[];
    financialAid?: PortableTextBlock[];
}

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
    const startDate = startDateTime ? new Date(startDateTime) : null;
    const diff = startDate ? startDate.getTime() - now.getTime() : null;

    return (
        <>
            <div 
              className='relative flex flex-col w-full bg-background-panel px-7 pt-7 pb-6 rounded-xl border-white border-5.5 border-b-5 border-dashed' 
            >
              <h4 className='text-primary-darker mb-3.5'>Panel Discussion</h4>
              <h2 className='text-3xl mb-8'>Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive Learning Spaces</h2>
              
              {(pricing || attedanceMode) && (
                <div className={`flex gap-1.5 uppercase text-gray-600 text-base font-semibold ${diff && diff > 0 ? 'mb-3.5' : 'mb-6'}`}>
                  {pricing && (
                    <span>
                      {pricing === 'free'
                        ? pricing
                        : typeof price === 'number'
                          ? price
                          : price
                            ? `${price.amount ?? ''}${price.currency ?? ''}`
                            : ''}
                    </span>
                  )}

                  {attedanceMode && <span>{attedanceMode}</span>}
                  <span>Event</span>
                </div>
              )}

              {diff && diff > 0 && <span className='font-semibold text-xl text-dark-blue mb-6'>Upcoming</span>}

              {startDateTime && endDateTime && (
                <EventData start={startDateTime} end={endDateTime} />
              )}

              <div className="absolute bg-background-primary w-12 h-12 rounded-full -bottom-7 -left-6"></div>
              <div className="absolute bg-background-primary w-12 h-12 rounded-full -bottom-7 -right-6"></div>
            </div>

            <div className='flex flex-col px-7 pt-10 pb-6 bg-background-panel rounded-xl mb-10'>
              {marketingMention && marketingMention.length > 0 && (
                <div className='mb-4 text-sm font-normal'>
                  <PortableText value={marketingMention} />
                </div>
              )}

              <ButtonRegular className='mb-4'>
                <button className='text-white text-base font-medium'>Watch replay</button>
              </ButtonRegular>

              {financialAid && financialAid.length > 0 && (
                <div>
                  <PortableText value={financialAid} />
                </div>
              )}
            </div>
        </>
    );
};

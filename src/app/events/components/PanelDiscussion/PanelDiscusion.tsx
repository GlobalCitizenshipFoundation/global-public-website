import ButtonRegular from '@/components/ButtonRegular';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import EventData from '../EventData/EventData';

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
      <div className="bg-background-panel border-5.5 relative flex w-full flex-col rounded-xl border-b-5 border-dashed border-white px-7 pt-7 pb-6">
        <h4 className="text-primary-darker mb-3.5">Panel Discussion</h4>
        <h2 className="mb-8 text-3xl">
          Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive
          Learning Spaces
        </h2>

        {(pricing || attedanceMode) && (
          <div
            className={`flex gap-1.5 text-base font-semibold text-gray-600 uppercase ${diff && diff > 0 ? 'mb-3.5' : 'mb-6'}`}
          >
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

        {diff && diff > 0 && (
          <span className="text-dark-blue mb-6 text-xl font-semibold">Upcoming</span>
        )}

        {startDateTime && endDateTime && <EventData start={startDateTime} end={endDateTime} />}

        <div className="bg-background-primary absolute -bottom-7 -left-6 h-12 w-12 rounded-full"></div>
        <div className="bg-background-primary absolute -right-6 -bottom-7 h-12 w-12 rounded-full"></div>
      </div>

      <div className="bg-background-panel mb-10 flex flex-col rounded-xl px-7 pt-10 pb-6">
        {marketingMention && marketingMention.length > 0 && (
          <div className="mb-4 text-sm font-normal">
            <PortableText value={marketingMention} />
          </div>
        )}

        <ButtonRegular className="mb-4">
          <button className="text-base font-medium text-white">Watch replay</button>
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

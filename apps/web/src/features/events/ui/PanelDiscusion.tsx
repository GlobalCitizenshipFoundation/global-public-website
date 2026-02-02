import ButtonRegular from '@/shared/ui/ButtonRegular';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import EventData from '@/features/events/ui/EventData';

type Money = { amount?: number; currency?: string };

type Props = {
  pricing: string;
  price?: number | Money;
  attedanceMode: string;
  startDateTime: string;
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
  const startDate = startDateTime ? new Date(startDateTime) : null;
  const diff = startDate ? startDate.getTime() - now.getTime() : null;

  const priceLabel =
    pricing === 'free'
      ? 'free'
      : typeof price === 'number'
        ? String(price)
        : price
          ? `${price.amount ?? ''}${price.currency ?? ''}`
          : '';

  return (
    <div className="space-y-6">
      <div className="bg-background-panel border-5.5 relative w-full rounded-xl border-b-5 border-dashed border-white px-[clamp(18px,3vw,28px)] py-[clamp(18px,3vw,28px)]">
        <h4 className="text-primary-darker mb-3 text-[clamp(12px,1.2vw,14px)] font-semibold tracking-wide">
          Panel Discussion
        </h4>

        <h2 className="mb-6 text-[clamp(20px,2.4vw,32px)] leading-tight font-semibold">
          Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive
          Learning Spaces
        </h2>

        {pricing || attedanceMode ? (
          <div
            className={[
              'flex flex-wrap items-center gap-x-3 gap-y-1',
              'text-[clamp(12px,1.2vw,14px)] font-semibold text-gray-600 uppercase',
              diff && diff > 0 ? 'mb-3' : 'mb-6',
            ].join(' ')}
          >
            {pricing ? <span>{priceLabel}</span> : null}
            {attedanceMode ? <span>{attedanceMode}</span> : null}
            <span>Event</span>
          </div>
        ) : null}

        {diff && diff > 0 ? (
          <span className="text-dark-blue mb-6 inline-block text-[clamp(16px,1.8vw,20px)] font-semibold">
            Upcoming
          </span>
        ) : null}

        {startDateTime && endDateTime ? (
          <EventData start={startDateTime} end={endDateTime} />
        ) : null}

        <div className="bg-background-primary absolute -bottom-7 -left-6 h-12 w-12 rounded-full" />
        <div className="bg-background-primary absolute -right-6 -bottom-7 h-12 w-12 rounded-full" />
      </div>

      <div className="bg-background-panel rounded-xl px-[clamp(18px,3vw,28px)] py-[clamp(18px,3vw,28px)]">
        {marketingMention?.length ? (
          <div className="mb-4 text-[clamp(13px,1.3vw,16px)]">
            <PortableText value={marketingMention} />
          </div>
        ) : null}

        <ButtonRegular className="mb-4 w-full">
          <span className="text-[clamp(14px,1.4vw,16px)] font-medium text-white">Watch replay</span>
        </ButtonRegular>

        {financialAid?.length ? (
          <div className="text-[clamp(13px,1.3vw,16px)]">
            <PortableText value={financialAid} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

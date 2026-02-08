import React from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

import ButtonRegular from '@/shared/ui/ButtonRegular';
import EventData from '@/features/event/ui/components/EventData';

import type { Money, EventLifecycleStatus, PricingStatus, AttendanceMode } from '@gcf/types';

type Cta = {
  label?: string | null;
  url?: string | null;
} | null;

type CommonProps = {
  eventHeading?: string;
  eventTypeLabel?: string;

  attendanceMode: AttendanceMode;

  startDateTime: string;
  endDateTime?: string;

  marketingMention?: PortableTextBlock[];
  promoMessage?: PortableTextBlock[];

  lifecycleStatus: EventLifecycleStatus;

  ctaUpcoming?: Cta;
  ctaStarted?: Cta;
  ctaEnded?: Cta;
};

// ✅ paid wymusza price
type PaidProps = { pricing: 'paid'; price: Money };
type FreeProps = { pricing: 'free'; price?: never };

export type Props = CommonProps & (PaidProps | FreeProps);

function isValidHttpUrl(url?: string | null) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function formatPriceLabel(pricing: PricingStatus, price?: Money) {
  if (pricing === 'free') return 'Free';

  // pricing === 'paid'
  if (!price) return 'Paid';
  const amount = typeof price.amount === 'number' ? price.amount : null;
  return amount != null ? `${amount} ${price.currency}` : price.currency;
}

function pickCtaByLifecycle(input: {
  lifecycleStatus: EventLifecycleStatus;
  ctaUpcoming?: Cta;
  ctaStarted?: Cta;
  ctaEnded?: Cta;
}) {
  const { lifecycleStatus, ctaUpcoming, ctaStarted, ctaEnded } = input;

  const cms =
    lifecycleStatus === 'upcoming'
      ? ctaUpcoming
      : lifecycleStatus === 'started'
        ? ctaStarted
        : ctaEnded;

  const label = cms?.label?.trim() ?? '';
  const url = cms?.url ?? null;

  if (label && isValidHttpUrl(url)) {
    return { show: true, label, url: url as string };
  }

  return { show: false, label: '', url: '' };
}

export const PanelDiscussion: React.FC<Props> = (props) => {
  const {
    eventHeading,
    eventTypeLabel,
    pricing,
    attendanceMode,
    startDateTime,
    endDateTime,
    marketingMention,
    promoMessage,
    lifecycleStatus,
    ctaUpcoming,
    ctaStarted,
    ctaEnded,
  } = props;

  const endSafe = endDateTime ?? startDateTime;

  const price = pricing === 'paid' ? props.price : undefined;
  const priceLabel = formatPriceLabel(pricing, price);

  const showMetaRow = Boolean(attendanceMode);

  const cta = pickCtaByLifecycle({
    lifecycleStatus,
    ...(ctaUpcoming !== undefined ? { ctaUpcoming } : {}),
    ...(ctaStarted !== undefined ? { ctaStarted } : {}),
    ...(ctaEnded !== undefined ? { ctaEnded } : {}),
  });

  const isUpcoming = lifecycleStatus === 'upcoming';

  return (
    <div className="pb-[clamp(18px,10vw,44px)]">
      <div
        className={[
          'bg-background-panel border-5.5 relative w-full rounded-xl border-b-5 border-dashed border-white',
          'px-[clamp(18px,3vw,28px)] py-[clamp(18px,3vw,28px)]',
          'lg:min-h-[590px]',
        ].join(' ')}
      >
        <h4 className="text-primary-darker mb-3 text-[clamp(12px,1.2vw,14px)] font-semibold tracking-wide">
          {eventTypeLabel ?? 'Event'}
        </h4>

        <h2 className="mb-6 text-[clamp(20px,2.4vw,32px)] leading-tight font-semibold">
          {eventHeading ?? 'Event'}
        </h2>

        {showMetaRow ? (
          <div
            className={[
              'flex flex-wrap items-center gap-x-3 gap-y-1',
              'text-[clamp(12px,1.2vw,14px)] font-semibold text-gray-600 uppercase',
              isUpcoming ? 'mb-3' : 'mb-6',
            ].join(' ')}
          >
            <span>{priceLabel}</span>
            <span>{attendanceMode}</span>
          </div>
        ) : null}

        {isUpcoming ? (
          <span className="text-dark-blue mb-6 inline-block text-[clamp(16px,1.8vw,20px)] font-semibold">
            Upcoming
          </span>
        ) : null}

        <EventData start={startDateTime} end={endSafe} />

        <div className="bg-background-primary absolute -bottom-7 -left-6 h-12 w-12 rounded-full" />
        <div className="bg-background-primary absolute -right-6 -bottom-7 h-12 w-12 rounded-full" />
      </div>

      <div
        className={[
          'bg-background-panel w-full rounded-xl',
          'px-[clamp(18px,3vw,28px)] py-[clamp(18px,3vw,28px)]',
          'lg:min-h-[260px]',
        ].join(' ')}
      >
        {marketingMention?.length ? (
          <div className="mb-4 text-[clamp(13px,1.3vw,16px)]">
            <PortableText value={marketingMention} />
          </div>
        ) : null}

        {cta.show ? (
          <ButtonRegular className="hover:bg-primary mb-4 w-full bg-black">
            <Link
              href={cta.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-full w-full items-center justify-center"
            >
              <span className="text-[clamp(14px,1.4vw,16px)] font-medium text-white">
                {cta.label}
              </span>
            </Link>
          </ButtonRegular>
        ) : null}

        {promoMessage?.length ? (
          <div className="text-[clamp(13px,1.3vw,16px)]">
            <PortableText value={promoMessage} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

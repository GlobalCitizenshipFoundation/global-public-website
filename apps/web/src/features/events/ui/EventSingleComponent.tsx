import React from 'react';
import Image from 'next/image';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from '@portabletext/react';

import ContainerBig from '@/shared/ui/ContainerBig';
import ContainerRegular from '@/shared/ui/ContainerRegular';
import ButtonRegular from '@/shared/ui/ButtonRegular';
import { Tags } from '@/shared/ui/Tags';

import ContributorFrame from '@/features/contributors/ui/ContributorFrame';
import SocialLink from '@/features/social/ui/SocialLink';
import { getSocialLinksFromCMS } from '@/features/social/ui/getSocialMediaFromCMS';

import type { EventSingleType } from '@gcf/types';

import { ConferencePartners } from './ConferencePartners';
import { PanelDiscussion } from './PanelDiscusion';
import { PeoplePhotos } from './PeoplePhotos';
import EventIntroVideo from './EventIntroVideo';

type Props = {
  event: EventSingleType;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-titles text-2xl lg:text-[42px]">{children}</h2>,
    h3: ({ children }) => (
      <h3 className="text-titles text-xl font-semibold lg:text-3xl">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-body text-sm lg:text-2xl">{children}</p>,
  },
};

const staticSocials = {
  twitter: 'https://twitter.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/',
  youtube: 'https://www.youtube.com/',
};

function uniqById<T extends { _id: string }>(items: T[]) {
  return Array.from(new Map(items.map((x) => [x._id, x])).values());
}

const EventSingleComponent: React.FC<Props> = ({ event }) => {
  if (!event) return <p>Event not found.</p>;

  const speakers = uniqById(event.speakers ?? []);
  const steeringCommittee = uniqById(event.steeringCommittee ?? []);
  const combinedParticipants = uniqById([...steeringCommittee, ...speakers]);

  const socialLinks = getSocialLinksFromCMS(staticSocials);

  function hasPanelData(e: EventSingleType): e is EventSingleType & {
    pricing: string;
    attedanceMode: string;
    startDateTime: string;
    endDateTime: string;
    marketingMention: PortableTextBlock[];
    financialAid: PortableTextBlock[];
  } {
    return Boolean(
      typeof e.pricing === 'string' &&
      e.pricing.trim() &&
      typeof e.attendanceMode === 'string' &&
      e.attendanceMode.trim() &&
      typeof e.startDateTime === 'string' &&
      typeof e.endDateTime === 'string' &&
      Array.isArray(e.marketingMention) &&
      Array.isArray(e.financialAid)
    );
  }

  const imageUrl = event.eventImage?.asset?.url;

  return (
    <section className="bg-background-primary overflow-x-hidden">
      <ContainerRegular>
        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start">
          <div className="min-w-0">
            <div className="mb-10">
              <div
                className={[
                  'relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-[100dvw]',
                  'lg:static lg:right-auto lg:left-auto lg:mr-0 lg:ml-0 lg:w-full',
                ].join(' ')}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-none xl:rounded-[10px]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Event image"
                      fill
                      sizes="(max-width: 1200px) 100vw, 1050px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center border border-white/10 bg-black/25">
                      <span className="text-borders/80 text-sm font-medium">No image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <PeoplePhotos people={combinedParticipants} />

            <section className="py-9.25">
              {event.introText ? (
                <PortableText value={event.introText} components={portableTextComponents} />
              ) : null}
            </section>

            <section className="mb-14 lg:hidden">
              {hasPanelData(event) ? (
                <PanelDiscussion
                  pricing={event.pricing}
                  {...(event.price != null ? { price: event.price } : {})}
                  attedanceMode={event.attedanceMode}
                  startDateTime={event.startDateTime}
                  endDateTime={event.endDateTime}
                  marketingMention={event.marketingMention}
                  financialAid={event.financialAid}
                />
              ) : null}

              <div className="flex gap-6">
                <div className="mb-9 flex w-full flex-col gap-1.5">
                  <span className="text-subtitles text-2xl font-semibold">Venue Location</span>
                  <span className="text-borders text-sm font-normal">{event.venue}</span>
                </div>

                <div className="mb-9 flex w-full flex-col gap-1.5">
                  <span className="text-subtitles text-2xl font-semibold">Rich Text Box</span>
                  <span className="text-borders text-sm font-normal">{event.venue}</span>
                </div>
              </div>

              <ButtonRegular className="border-borders mb-4 border-1 bg-white">
                <span className="text-gray text-base font-medium">Concept Note</span>
              </ButtonRegular>

              <ButtonRegular className="mb-14">
                <span className="text-base font-medium text-white">Resources</span>
              </ButtonRegular>
            </section>

            <section className="mb-11 flex flex-col gap-[15px]">
              <h2 className="text-subtitles pl-[50px] text-2xl font-semibold lg:mb-6 lg:pl-0 lg:text-[42px]">
                Intro Video
              </h2>

              <EventIntroVideo
                url={event.videoLink ?? null}
                title={event.eventHeading ?? 'Intro video'}
              />
            </section>

            <section className="mb-11 text-sm lg:text-2xl">
              {event.body ? (
                <PortableText value={event.body} components={portableTextComponents} />
              ) : null}
            </section>

            <section className="lg:border-lines mb-11 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:border-y-[1.5px] lg:py-4.5">
              <h2 className="text-titles mb-0 text-2xl">Who is this event for:</h2>
              {event.audience ? <Tags tags={event.audience} /> : null}
            </section>

            <section className="mb-14 flex flex-col gap-1.5">
              {event.agendaHeading ? (
                <h2 className="text-titles mb-0 text-2xl lg:mb-4.5 lg:text-[42px]">
                  {event.agendaHeading}
                </h2>
              ) : null}

              {event.agendaDescription ? (
                <PortableText value={event.agendaDescription} components={portableTextComponents} />
              ) : null}
            </section>

            <section className="mb-12 flex flex-col lg:mb-20">
              <div className="mb-11 flex flex-col">
                {speakers.length ? <h2>Speakers</h2> : null}
                {event.endText ? (
                  <PortableText value={event.endText} components={portableTextComponents} />
                ) : null}
              </div>

              <div className="flex flex-wrap gap-x-4.5 gap-y-18">
                {speakers.map((speaker) => (
                  <ContributorFrame contributor={speaker} key={speaker._id} />
                ))}
              </div>
            </section>

            <section className="mb-12 flex flex-col lg:mb-20">
              <div className="mb-11 flex flex-col">
                {steeringCommittee.length ? <h2>Steering Committee</h2> : null}
                {event.endText ? (
                  <PortableText value={event.endText} components={portableTextComponents} />
                ) : null}
              </div>

              <div className="flex flex-wrap gap-x-4.5 gap-y-18">
                {steeringCommittee.map((person) => (
                  <ContributorFrame contributor={person} key={person._id} />
                ))}
              </div>
            </section>

            <section className="flex flex-col lg:mb-18 lg:gap-[60px]">
              <div className="flex flex-col">
                <h2>Conference Partners</h2>
                {event.endText ? (
                  <PortableText value={event.endText} components={portableTextComponents} />
                ) : null}
              </div>

              {event.hostedBy ? (
                <ConferencePartners type="Hosted by" partners={event.hostedBy} />
              ) : null}
              {event.eventPartners ? (
                <ConferencePartners type="Event Partners" partners={event.eventPartners} />
              ) : null}
              {event.knowledgePartners ? (
                <ConferencePartners type="Knowledge Partners" partners={event.knowledgePartners} />
              ) : null}
            </section>

            <div className="flex flex-col gap-7 lg:hidden">
              <h3 className="font-semibold lg:text-3xl">Share the Event</h3>

              <div className="flex w-full justify-between">
                {socialLinks?.map((link) => (
                  <SocialLink
                    key={link.href}
                    href={link.href}
                    icon={<link.icon />}
                    variant="button"
                  />
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <Image src="/images/print.svg" alt="Print" width={24} height={24} />
                <span className="text-borders text-lg font-normal">Print Event Details</span>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[clamp(16px,2vw,28px)]">
              {hasPanelData(event) ? (
                <PanelDiscussion
                  pricing={event.pricing}
                  {...(event.price != null ? { price: event.price } : {})}
                  attedanceMode={event.attedanceMode}
                  startDateTime={event.startDateTime}
                  endDateTime={event.endDateTime}
                  marketingMention={event.marketingMention}
                  financialAid={event.financialAid}
                />
              ) : null}

              <div className="flex flex-col gap-10 px-9">
                <div className="mb-9 flex w-full flex-col gap-1.5">
                  <span className="text-subtitles text-2xl font-semibold lg:text-3xl">
                    Venue Location
                  </span>
                  <span className="text-borders text-sm font-normal lg:text-lg">{event.venue}</span>
                </div>

                <div className="mb-9 flex w-full flex-col gap-1.5">
                  <span className="text-subtitles text-2xl font-semibold lg:text-3xl">
                    Rich Text Box
                  </span>
                  <span className="text-borders text-sm font-normal lg:text-lg">{event.venue}</span>
                </div>
              </div>

              <ButtonRegular className="border-borders mb-4 border-1 bg-white">
                <span className="text-gray text-base font-medium">Concept Note</span>
              </ButtonRegular>

              <ButtonRegular className="mb-14">
                <span className="text-base font-medium text-white">Resources</span>
              </ButtonRegular>

              <div className="flex flex-col gap-7 px-9">
                <h3 className="font-semibold lg:text-3xl">Share the Event</h3>

                <div className="flex w-full justify-between">
                  {socialLinks?.map((link) => (
                    <SocialLink
                      key={link.href}
                      href={link.href}
                      icon={<link.icon />}
                      variant="button"
                      className="h-15 w-15 rounded-2xl border-1 border-gray-500 bg-transparent"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2.5">
                  <Image src="/images/print.svg" alt="Print" width={24} height={24} />
                  <span className="text-borders text-lg font-normal">Print Event Details</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </ContainerRegular>

      <section className="bg-background-darker mx-0 px-0 lg:py-[78px]">
        <ContainerBig>
          <h2 className="text-titles mb-2.5 text-2xl lg:mb-5 lg:text-[42px]">Topics</h2>
          {event.audience ? <Tags tags={event.audience} /> : null}
        </ContainerBig>
      </section>
    </section>
  );
};

export default EventSingleComponent;

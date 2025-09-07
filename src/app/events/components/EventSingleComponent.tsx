import ButtonRegular from '@/components/ButtonRegular';
import ContainerRegular from '@/components/ContainerRegular';
import { PortableText, PortableTextBlock, PortableTextComponentProps } from '@portabletext/react';
import { EventSingleType } from '../../../../utils/event-singleTypes';
import ContainerBig from '@/components/ContainerBig';
import { ConferencePartners } from './ConferencePartners/ConferencePartners';
import { PanelDiscussion } from './PanelDiscussion/PanelDiscusion';
import { PeoplePhotos } from './PeoplePhotos/PeoplePhotos';
import { Tags } from '@/components/Tags';
import ContributorFrame from '@/components/Contributors/ContributorFrame';
import { getSocialLinksFromCMS } from '@/components/Social/getSocialMediaFromCMS';
import SocialLink from '@/components/Social/SocialLink';

type Props = {
  event: EventSingleType;
};

const EventSingleComponent: React.FC<Props> = ({ event }) => {
  const portableTextComponents = {
    block: {
      h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h2 className="text-titles text-2xl lg:text-[42px]">{children}</h2>
      ),
      h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h3 className="text-titles text-xl font-semibold lg:text-3xl">{children}</h3>
      ),
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="text-body text-sm lg:text-2xl">{children}</p>
      ),
    },
  };

  if (!event) {
    return <p>No posts found.</p>;
  }

  function getCombinedParticipants(event: EventSingleType) {
    const steering = event.steeringCommittee ?? [];
    const speakers = event.speakers ?? [];

    return [...steering, ...speakers];
  }

  const staticSocials = {
    twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    youtube: 'https://www.youtube.com/',
  };

  const socialLinks = getSocialLinksFromCMS(staticSocials);

  return (
    <div className="bg-background-primary flex flex-col">
      <section className="mx-auto box-border w-full lg:max-w-[1610px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1050px_500px] lg:gap-[60px] lg:gap-y-14">
          <div className="order-1 lg:order-1">
            {event.eventImage?.asset && (
              <div className="mb-10 w-full items-center overflow-hidden">
                <img
                  className="h-auto w-full max-w-full object-contain"
                  src={event.eventImage.asset.url}
                  alt="Event-image"
                />
              </div>
            )}
            <ContainerRegular className="mb-4 lg:mb-9">
              <PeoplePhotos people={getCombinedParticipants(event)} />
            </ContainerRegular>
            <ContainerRegular className="mb-9 text-sm lg:text-2xl">
              {event.introText && (
                <PortableText value={event.introText} components={portableTextComponents} />
              )}
            </ContainerRegular>
            <ContainerRegular className="mb-14 lg:hidden">
              {event.endDateTime &&
                event.startDateTime &&
                event.pricing &&
                event.attedanceMode &&
                event.marketingMention &&
                event.financialAid && (
                  <PanelDiscussion
                    pricing={event.pricing}
                    price={event.price}
                    attedanceMode={event.attedanceMode}
                    startDateTime={event.startDateTime}
                    endDateTime={event.endDateTime}
                    marketingMention={event.marketingMention}
                    financialAid={event.financialAid}
                  />
                )}

              <div className="flex">
                <div className="mb-9 flex w-full flex-col gap-1.5">
                  <span className="text-subtitles text-2xl font-semibold lg:text-3xl">
                    Venue Location
                  </span>
                  <span className="text-borders text-sm font-normal">{event.venue}</span>
                </div>
                <div className="mb-9 flex w-full flex-col gap-1.5">
                  <span className="text-subtitles text-2xl font-semibold lg:text-3xl">
                    Rich Text Box
                  </span>
                  <span className="text-borders text-sm font-normal">{event.venue}</span>
                </div>
              </div>
              <ButtonRegular className="border-borders mb-4 border-1 bg-white">
                <span className="text-gray text-base font-medium">Concept Note</span>
              </ButtonRegular>
              <ButtonRegular className="mb-14">
                <span className="text-base font-medium text-white">Resources</span>
              </ButtonRegular>
            </ContainerRegular>
            <div className="mb-11 flex flex-col gap-[15px]">
              <h2 className="text-subtitles pl-[50px] text-2xl font-semibold lg:mb-6 lg:pl-0 lg:text-[42px]">
                Intro Video
              </h2>
              <div className="flex w-full"></div>
            </div>
            <ContainerRegular className="mb-11 text-sm lg:text-2xl">
              {event.body && (
                <PortableText value={event.body} components={portableTextComponents} />
              )}
            </ContainerRegular>
            <ContainerRegular className="lg:border-lines mb-11 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:border-y-[1.5px] lg:py-7">
              <h2 className="text-titles mb-0 text-2xl">Who is this event for :</h2>
              {event.audience && <Tags tags={event.audience} />}
            </ContainerRegular>
            <ContainerRegular className="mb-14 flex flex-col gap-1.5">
              <h2 className="text-titles mb-0 text-2xl lg:mb-4.5 lg:text-[42px]">
                {event.agendaHeading}
              </h2>
              {event.agendaDescription && (
                <PortableText value={event.agendaDescription} components={portableTextComponents} />
              )}
            </ContainerRegular>
            <ContainerRegular className="mb-12 flex flex-col lg:mb-20">
              <div className="mb-11 flex flex-col">
                {event.speakers && <h2>Speakers</h2>}
                {event.endText && (
                  <PortableText value={event.endText} components={portableTextComponents} />
                )}
              </div>
              <div className="flex flex-wrap gap-x-4.5 gap-y-18">
                {event.speakers &&
                  event.speakers.map((speaker) => (
                    <ContributorFrame contributor={speaker} key={speaker._id} />
                  ))}
              </div>
            </ContainerRegular>
            <ContainerRegular className="mb-12 flex flex-col lg:mb-20">
              <div className="mb-11 flex flex-col">
                {event.steeringCommittee && <h2>Steering Committee</h2>}
                {event.endText && (
                  <PortableText value={event.endText} components={portableTextComponents} />
                )}
              </div>
              <div className="flex gap-x-4.5 gap-y-18">
                {event.steeringCommittee &&
                  event.steeringCommittee.map((person) => (
                    <ContributorFrame contributor={person} key={person._id} />
                  ))}
              </div>
            </ContainerRegular>
            <ContainerRegular className="flex flex-col lg:mb-18 lg:gap-[60px]">
              <div className="flex flex-col">
                {event.partners && <h2>Conference Partners</h2>}
                {event.endText && (
                  <PortableText value={event.endText} components={portableTextComponents} />
                )}
              </div>
              {event.partners && (
                <>
                  {(['Host', 'EventPartner', 'KnowledgePartners'] as const).map((type) => (
                    <ConferencePartners key={type} partners={event.partners} type={type} />
                  ))}
                </>
              )}
            </ContainerRegular>
            <ContainerRegular>
              <div className="flex flex-col gap-7 lg:hidden">
                <h3 className="font-semibold lg:text-3xl">Share the Event</h3>
                <div className="flex w-full justify-between">
                  {socialLinks &&
                    socialLinks.map((link) => (
                      <SocialLink
                        key={link.href}
                        href={link.href}
                        icon={<link.icon />}
                        variant="button"
                      />
                    ))}
                </div>
                <div className="flex items-center gap-2.5">
                  <img src="/images/print.svg" alt="Print-logo" />
                  <span className="text-borders text-lg font-normal">Print Event Details</span>
                </div>
              </div>
            </ContainerRegular>
          </div>
          <div className="order-1 hidden lg:col-start-2 lg:flex">
            <ContainerRegular className="mb-11">
              {event.endDateTime &&
                event.startDateTime &&
                event.pricing &&
                event.attedanceMode &&
                event.marketingMention &&
                event.financialAid && (
                  <PanelDiscussion
                    pricing={event.pricing}
                    price={event.price}
                    attedanceMode={event.attedanceMode}
                    startDateTime={event.startDateTime}
                    endDateTime={event.endDateTime}
                    marketingMention={event.marketingMention}
                    financialAid={event.financialAid}
                  />
                )}

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
                  {socialLinks &&
                    socialLinks.map((link) => (
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
                  <img src="/images/print.svg" alt="Print-logo" />
                  <span className="text-borders text-lg font-normal">Print Event Details</span>
                </div>
              </div>
            </ContainerRegular>
          </div>
        </div>
      </section>
      <section className="bg-background-darker mx-0 px-0 lg:py-[78px]">
        <ContainerBig>
          <h2 className="text-titles mb-2.5 text-2xl lg:mb-5 lg:text-[42px]">Topics</h2>
          {event.audience && <Tags tags={event.audience} />}
        </ContainerBig>
      </section>
      {/* <section className='py-10'>
            <ContainerBig>
              {event.events && event.events.length > 0 && (
                <>
                  <h2 className='text-[42px] mb-3.5'>Related Events</h2>
                  <p className='mb-15'>Transforming education for global citizenship and sustainable The Global Citizen ship Foundation continues commitment Preparing young people for a smart future.</p>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {contributorSingle.events.map((event: EventSingle) => (
                    <RelatedEvents event={event} key={event._id}/>
                  ))}
                  </div>
                </>
              )}
            </ContainerBig>
          </section> */}
    </div>
  );
};

export default EventSingleComponent;

import ButtonRegular from "@/components/ButtonRegular";
import ContainerRegular from "@/components/ContainerRegular";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { EventSingleType } from "../../../../utils/event-singleTypes";
import ContainerBig from "@/components/ContainerBig";
import { ConferencePartners } from "./ConferencePartners/ConferencePartners";
import { PanelDiscussion } from "./PanelDiscussion/PanelDiscusion";
import { PeoplePhotos } from "./PeoplePhotos/PeoplePhotos";
import { Tags } from "@/components/Tags";
import ContributorFrame from "@/components/Contributors/ContributorFrame";
import { getSocialLinksFromCMS } from "@/components/Social/getSocialMediaFromCMS";
import SocialLink from "@/components/Social/SocialLink";

type Props = {
    event: EventSingleType;
}

const EventSingleComponent: React.FC<Props> = ({event}) => {
  const portableTextComponents = {
    block: {
      h2: ({ children }: PortableTextComponentProps<any> ) => (
        <h2 className="text-2xl lg:text-[42px] text-titles">{children}</h2>
      ),
      h3: ({ children }: PortableTextComponentProps<any> ) => (
        <h3 className="text-xl lg:text-3xl font-semibold text-titles">{children}</h3>
      ),
      normal: ({ children }: PortableTextComponentProps<any> ) => (
        <p className="text-sm lg:text-2xl text-body">{children}</p>
      )
    }
  };

  if (!event) {
    return <p>No posts found.</p>;
  }

  function getCombinedParticipants(event: EventSingleType): any[] {
    const steering = event.steeringCommittee ?? [];
    const speakers = event.speakers ?? [];
    
    return [...steering, ...speakers];
  }

  const staticSocials = {
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  };

  const socialLinks = getSocialLinksFromCMS(staticSocials);

  return (
    <div className='flex flex-col bg-background-primary'>
          <section className='w-full lg:max-w-[1610px] mx-auto box-border'>
            <div
              className="
                grid
                grid-cols-1
                lg:gap-y-14
                lg:grid-cols-[1050px_500px]
                lg:gap-[60px]
              "
            >
              <div className="order-1 lg:order-1">
                {event.eventImage?.asset && (
                  <div className='w-full overflow-hidden items-center mb-10'>
                    <img className='w-full h-auto max-w-full object-contain' 
                      src={event.eventImage.asset.url} 
                      alt="Event-image"
                    />
                  </div>
                )}
                <ContainerRegular className='mb-4 lg:mb-9'>
                  <PeoplePhotos people={getCombinedParticipants(event)}/>
                </ContainerRegular>
                <ContainerRegular className='lg:text-2xl text-sm mb-9'>
                    {event.introText && (
                      <PortableText value={event.introText} components={portableTextComponents}/>
                    )}
                </ContainerRegular>
                <ContainerRegular className='mb-14 lg:hidden'>
                  <PanelDiscussion 
                    pricing={event.pricing} 
                    price={event.price} 
                    attedanceMode={event.attedanceMode}
                    startDateTime={event.startDateTime}
                    endDateTime={event.endDateTime}
                    marketingMention={event.marketingMention}
                    financialAid={event.financialAid}
                  />
                  <div className="flex px-">
                  <div className='flex flex-col gap-1.5 w-full mb-9'>
                    <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Venue Location</span>
                    <span className='text-borders font-normal text-sm'>{event.venue}</span>
                  </div>
                  <div className='flex flex-col gap-1.5 w-full mb-9'>
                    <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Rich Text Box</span>
                    <span className='text-borders font-normal text-sm'>{event.venue}</span>
                  </div>
                  </div>
                  <ButtonRegular className='mb-4 bg-white border-borders border-1'>
                    <span className='text-gray text-base font-medium '>Concept Note</span>
                  </ButtonRegular>
                  <ButtonRegular className='mb-14'>
                    <span className='text-white text-base font-medium '>Resources</span>
                  </ButtonRegular>
                </ContainerRegular>
                <div className='flex flex-col gap-[15px] mb-11'>
                  <h2 className='lg:pl-0 text-subtitles font-semibold text-2xl lg:text-[42px] pl-[50px] lg:mb-6'>Intro Video</h2>
                  <div className='flex w-full '></div>
                </div>
                <ContainerRegular className='lg:text-2xl mb-11 text-sm'>
                  {event.body && (
                    <PortableText value={event.body} components={portableTextComponents}/>
                  )}
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-6 mb-11 lg:flex-row lg:justify-between lg:items-center lg:py-7 lg:border-y-[1.5px] lg:border-lines'>
                  <h2 className='text-2xl text-titles mb-0'>Who is this event for :</h2>
                  {event.audience && (
                    <Tags tags={event.audience} />
                  )}
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-1.5 mb-14'>
                  <h2 className='text-2xl text-titles mb-0 lg:mb-4.5 lg:text-[42px]'>{event.agendaHeading}</h2>
                  {event.agendaDescription && (
                    <PortableText value={event.agendaDescription} components={portableTextComponents}/>
                  )}
                </ContainerRegular>
                <ContainerRegular className='flex flex-col mb-12 lg:mb-20 '>
                  <div className="flex flex-col mb-11">
                    {event.speakers && (
                      <h2>Speakers</h2>
                    )}
                    {event.endText && (
                      <PortableText value={event.endText} components={portableTextComponents}/>
                    )}
                  </div>
                  <div className="flex gap-x-4.5 gap-y-18 flex-wrap">
                    {event.speakers && event.speakers.map(speaker => (
                      <ContributorFrame contributor={speaker} key={speaker._id}/> 
                    ))}
                  </div>
                </ContainerRegular>
                <ContainerRegular className='flex flex-col mb-12 lg:mb-20 '>
                  <div className="flex flex-col mb-11">
                    {event.steeringCommittee && (
                      <h2>Steering Committee</h2>
                    )}
                    {event.endText && (
                      <PortableText value={event.endText} components={portableTextComponents}/>
                    )}                   
                  </div>
                  <div className="flex gap-x-4.5 gap-y-18">
                    {event.steeringCommittee && event.steeringCommittee.map(person => (
                      <ContributorFrame contributor={person} key={person._id}/> 
                    ))}
                  </div>
                </ContainerRegular>
                <ContainerRegular className='flex flex-col lg:gap-[60px] lg:mb-18'>
                  <div className="flex flex-col">
                    {event.partners && (
                      <h2>Conference Partners</h2>
                    )}
                    {event.endText && (
                      <PortableText value={event.endText} components={portableTextComponents}/>
                    )}
                  </div>
                  <ConferencePartners partners={event.partners} type={"Host"} />
                  <ConferencePartners partners={event.partners} type={"EventPartner"} />
                  <ConferencePartners partners={event.partners} type={"KnowledgePartners"} />
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-3.5 mb-14 lg:mb-22.5'>
                  <h2 className='text-2xl lg:text-[42px] text-titles mb-0'>Registration</h2>
                    {event.agendaDescription &&
                      <PortableText value={event.agendaDescription} components={portableTextComponents}/>
                    }
                </ContainerRegular>
                <ContainerRegular>
                  <div className='flex flex-col gap-7 lg:hidden'>
                   <h3 className='lg:text-3xl font-semibold'>Share the Event</h3>
                   <div className='flex w-full justify-between'>
                    {socialLinks && socialLinks.map((link) => (
                      <SocialLink
                        key={link.href}
                        href={link.href}
                        icon={<link.icon />}
                        variant="button"
                      />
                    ))}
                   </div>
                   <div className='flex items-center gap-2.5'>
                    <img src="/images/print.svg" alt="Print-logo" />
                    <span className='text-borders font-normal text-lg'>Print Event Details</span>
                   </div>
                  </div>
                </ContainerRegular>
              </div>
              <div className='order-1 lg:col-start-2 hidden lg:flex'>
                <ContainerRegular className='mb-11'>
                  <PanelDiscussion 
                    pricing={event.pricing} 
                    price={event.price} 
                    attedanceMode={event.attedanceMode}
                    startDateTime={event.startDateTime}
                    endDateTime={event.endDateTime}
                    marketingMention={event.marketingMention}
                    financialAid={event.financialAid}
                  />
                  <div className="flex flex-col gap-10 px-9">
                    <div className='flex flex-col gap-1.5 w-full mb-9'>
                      <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Venue Location</span>
                      <span className='text-borders font-normal text-sm lg:text-lg'>{event.venue}</span>
                    </div>
                    <div className='flex flex-col gap-1.5 w-full mb-9'>
                      <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Rich Text Box</span>
                      <span className='text-borders font-normal text-sm lg:text-lg'>{event.venue}</span>
                    </div>
                  </div>
                  <ButtonRegular className='mb-4 bg-white border-borders border-1'>
                    <span className='text-gray text-base font-medium '>Concept Note</span>
                  </ButtonRegular>
                  <ButtonRegular className='mb-14'>
                    <span className='text-white text-base font-medium '>Resources</span>
                  </ButtonRegular>
                  <div className='flex flex-col gap-7 px-9'>
                   <h3 className='lg:text-3xl font-semibold'>Share the Event</h3>
                   <div className='flex w-full justify-between'>
                    {socialLinks && socialLinks.map((link) => (
                      <SocialLink
                        key={link.href}
                        href={link.href}
                        icon={<link.icon />}
                        variant="button"
                        className="w-15 h-15 border-1 border-gray-500 rounded-2xl bg-transparent"
                      />
                    ))}
                   </div>
                   <div className='flex items-center gap-2.5'>
                    <img src="/images/print.svg" alt="Print-logo" />
                    <span className='text-borders font-normal text-lg'>Print Event Details</span>
                   </div>
                  </div>
                </ContainerRegular>
              </div>
            </div>
          </section>
          <section className='bg-background-darker lg:py-[78px] px-0 mx-0'>
            <ContainerBig>
              <h2 className='text-2xl lg:text-[42px] text-titles mb-2.5 lg:mb-5'>Topics</h2>
              {event.audience && (
                <Tags tags={event.audience} />
              )}
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

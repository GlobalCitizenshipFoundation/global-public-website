import ButtonRegular from "@/components/ButtonRegular";
import ContainerRegular from "@/components/ContainerRegular";
import { PortableText } from "@portabletext/react";
import { EventSingleType } from "../../../../utils/event-singleTypes";
import EventData from "./EventData/EventData";
import ContainerBig from "@/components/ContainerBig";
import { contributorSingle } from "../../../../cms/schemaTypes/contributorSingle";
import { eventSingle } from "../../../../cms/schemaTypes/eventSingle";
import { EventSingle } from "../../../../public/images/page";
import { ConferencePartners } from "./ConferencePartners/ConferencePartners";
import { PanelDiscussion } from "./PanelDiscussion/PanelDiscusion";
import { PeopleList } from "./PeopleList/PeopleList";
import { PeoplePhotos } from "./PeoplePhotos/PeoplePhotos";
import { Tags } from "@/components/Tags";

type Props = {
    event: EventSingleType;
}

const EventSingleComponent: React.FC<Props> = ({event}) => {
  const audienceLabels = {
    educators: 'Educators',
    educationLeaders: 'Education Leaders',
    youth: 'Youth',
    institutions: 'Institutions',
  };

  const firstSpeaker = event.speakers[0];

  const cloneSpeakers = Array(8).fill(firstSpeaker);

  const speakers = cloneSpeakers.map(speaker => ({
    imageURL: speaker.photo?.asset?.url ?? '',
    name: speaker.name ?? '',
    position: speaker.designation ?? '',
    organization: speaker.organization ?? '',
  }));

  const now = new Date();
  const startDate = new Date(event.startDateTime);
  const diff = startDate.getTime() - now.getTime();

  const portableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl lg:text-4xl font-bold text-titles">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl lg:text-3xl font-semibold text-titles">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="text-sm lg:text-2xl text-body">{children}</p>
      )
    }
  };

  if (!event) {
    return <p>No posts found.</p>;
  }

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
                {eventSingle.eventImage?.asset && (
                  <div className='w-full overflow-hidden items-center mb-10'>
                    <img className='w-full h-auto max-w-full object-contain' 
                      src={eventSingle.eventImage.asset.url} 
                      alt="Event-image"
                    />
                  </div>
                )}
                <ContainerRegular className='mb-4'>
                  <PeoplePhotos people={speakers}/>
                </ContainerRegular>
                <ContainerRegular className='lg:text-2xl text-sm mb-9'>
                    {eventSingle.introText && (
                      <PortableText value={eventSingle.introText} components={portableTextComponents}/>
                    )}
                </ContainerRegular>
                <ContainerRegular className='mb-14 lg:hidden'>
                  <PanelDiscussion 
                    pricing={eventSingle.pricing} 
                    price={eventSingle.price} 
                    attedanceMode={eventSingle.attedanceMode}
                    startDateTime={eventSingle.startDateTime}
                    endDateTime={eventSingle.endDateTime}
                    marketingMention={eventSingle.marketingMention}
                    financialAid={eventSingle.financialAid}
                  />
                  <div className='flex flex-col gap-1.5 w-full mb-9'>
                    <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Venue Location</span>
                    <span className='text-borders font-normal text-sm'>{eventSingle.venue}</span>
                  </div>
                  <div className='flex flex-col gap-1.5 w-full mb-9'>
                    <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Rich Text Box</span>
                    <span className='text-borders font-normal text-sm'>{eventSingle.venue}</span>
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
                  {eventSingle.body && (
                    <PortableText value={eventSingle.body} components={portableTextComponents}/>
                  )}
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-6 mb-11 lg:flex-row lg:justify-between lg:items-center lg:py-7 lg:border-y-[1.5px] lg:border-lines'>
                  <h2 className='text-2xl text-titles mb-0'>Who is this event for :</h2>
                  <Tags audience={eventSingle.audience} audienceLabels={audienceLabels} />
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-1.5 mb-14'>
                  <h2 className='text-2xl text-titles mb-0'>{eventSingle.agendaHeading}</h2>
                  <PortableText value={eventSingle.agendaDescription}/>
                </ContainerRegular>
                <ContainerRegular className='flex flex-col mb-12 lg:mb-20'>
                  <PeopleList description={eventSingle.agendaDescription} peopleList={speakers} type={'Speakers'}/>
                </ContainerRegular>
                <ContainerRegular className='flex flex-col mb-12 lg:mb-20'>
                  <PeopleList description={eventSingle.agendaDescription} peopleList={speakers} type={'Steering Committee'}/>
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-3.5 lg:gap-[60px]'>
                    <ConferencePartners description={eventSingle.agendaDescription} portableTextComponents={portableTextComponents}/>
                </ContainerRegular>
                <ContainerRegular className='flex flex-col gap-3.5 mb-14'>
                  <h2 className='text-2xl lg:text-[42px] text-titles mb-0'>Registration</h2>
                  <PortableText value={eventSingle.agendaDescription} components={portableTextComponents}/>
                </ContainerRegular>
                <ContainerRegular>
                  <div className='flex flex-col gap-7 lg:hidden'>
                   <h3 className='lg:text-3xl font-semibold'>Share the Event</h3>
                   <div className='flex w-full justify-between'>
                    <a className='flex' href="">
                      <img src="/images/insta.svg" alt="Logo-instagram" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/x.svg" alt="Logo-x" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/linkedin.svg" alt="Logo-linkedin" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/fb.svg" alt="Logo-facebook" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/youtube.svg" alt="Logo-youtube" />
                    </a>
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
                    pricing={eventSingle.pricing} 
                    price={eventSingle.price} 
                    attedanceMode={eventSingle.attedanceMode}
                    startDateTime={eventSingle.startDateTime}
                    endDateTime={eventSingle.endDateTime}
                    marketingMention={eventSingle.marketingMention}
                    financialAid={eventSingle.financialAid}
                  />
                  <div className='flex flex-col gap-1.5 w-full mb-9'>
                    <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Venue Location</span>
                    <span className='text-borders font-normal text-sm'>{eventSingle.venue}</span>
                  </div>
                  <div className='flex flex-col gap-1.5 w-full mb-9'>
                    <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Rich Text Box</span>
                    <span className='text-borders font-normal text-sm'>{eventSingle.venue}</span>
                  </div>
                  <ButtonRegular className='mb-4 bg-white border-borders border-1'>
                    <span className='text-gray text-base font-medium '>Concept Note</span>
                  </ButtonRegular>
                  <ButtonRegular className='mb-14'>
                    <span className='text-white text-base font-medium '>Resources</span>
                  </ButtonRegular>
                  <div className='flex flex-col gap-7'>
                   <h3 className='lg:text-3xl font-semibold'>Share the Event</h3>
                   <div className='flex w-full justify-between'>
                    <a className='flex' href="">
                      <img src="/images/insta.svg" alt="Logo-instagram" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/x.svg" alt="Logo-x" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/linkedin.svg" alt="Logo-linkedin" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/fb.svg" alt="Logo-facebook" />
                    </a>
                    <a className='flex' href="">
                      <img src="/images/youtube.svg" alt="Logo-youtube" />
                    </a>
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
              <Tags audience={eventSingle.audience} audienceLabels={audienceLabels} />
            </ContainerBig>
          </section>
          <section className='py-10'>
            <ContainerBig>
              {eventSingle.events && eventSingle.events.length > 0 && (
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
          </section>
        </div>
  );
};

export default EventSingleComponent;

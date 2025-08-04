import ButtonRegular from "@/components/ButtonRegular";
import ContainerRegular from "@/components/ContainerRegular";
import { PortableText } from "@portabletext/react";
import { EventSingleType } from "../../../../utils/event-singleTypes";
import EventData from "./EventData/EventData";

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

  if (!event) {
    return <p>No posts found.</p>;
  }

  console.log(event.startDateTime)

  return (
    <div className='flex flex-col bg-background-primary'>
      <div className='w-full max-w-[1610px] mx-auto px-4'>
        <div
          className="
            grid
            gap-y-14
            grid-cols-[1050px_500px]
            gap-[60px]
          "
        >
          <div className="order-1 2xl-custom:order-1">
            {event.eventImage?.asset && (
              <div className='flex w-full items-center mb-10'>
                <img className='flex w-full' src={event.eventImage.asset.url} alt="Event-image" />
              </div>
            )}
            <ContainerRegular className='lg:text-2xl text-sm mb-9'>
                {event.introText && (
                  <PortableText value={event.introText} />
                )}
            </ContainerRegular>
            <div className='flex flex-col gap-[15px] mb-11'>
              <h2 className='lg:pl-0 text-subtitles font-semibold text-2xl lg:text-[42px] pl-[50px] lg:mb-6'>Intro Video</h2>
              <div className='flex w-full '></div>
            </div>
            <ContainerRegular className='text-2xl mb-11'>
              {event.body && (
                <PortableText value={event.body}/>
              )}
            </ContainerRegular>
            <ContainerRegular className='flex flex-col gap-6 mb-11'>
              <h2 className='text-2xl text-titles'>Who is this event for :</h2>
              <div className='flex flex-wrap gap-2.5'>
                {event.audience?.map((element, index) => (
                  <div key={index + element} className='flex justify-center items-center py-2.5 px-4 border-1 rounded-4xl border-secondary-borders'>
                    <span>{audienceLabels[element] ?? element}</span>
                  </div>
                ))}
              </div>
            </ContainerRegular>
            <ContainerRegular className='flex flex-col gap-1.5 mb-14'>
              <h2 className='text-2xl text-titles'>{event.agendaHeading}</h2>
              <PortableText value={event.agendaDescription}/>
            </ContainerRegular>
            <ContainerRegular className='flex flex-col'>
              <h2 className='text-2xl text-titles mb-1.5'>Speakers</h2>
              <div className='mb-10'>
                <PortableText value={event.agendaDescription}/>
              </div>
              <div className='lg:grid-cols-4 grid grid-cols-2 gap-x-3.5 gap-y-8'>
                {speakers.map((speaker, index) => (
                  <div key={index + speaker.name} className='flex flex-col'>
                    <img className='flex rounded-lg w-full mb-5' src={speaker.imageURL} alt={`Image-speaker--${index}`} />
                    <h3 className='mb-2'>{speaker.name}</h3>
                    <span className='font-normal text-lg text-primary mb-2.5'>{speaker.position}</span>
                    <span>Organization
                      <br />
                      {speaker.organization}
                    </span>
                  </div>
                ))}
              </div>
            </ContainerRegular>
          </div>
          <div className='order-2 2xl-custom:order-2'>
            <ContainerRegular className='mb-11'>
              <div 
                className='flex flex-col w-full bg-background-panel px-7 pt-7 pb-6 rounded-xl border-white border-5.5 border-b-5 border-dashed' 
              >
                <h4 className='text-primary-darker mb-3.5'>Panel Discussion</h4>
                <h2 className='text-3xl mb-8'>Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive Learning Spaces</h2>
                <div className='flex gap-1.5 uppercase text-gray-600 text-base font-semibold mb-6'>
                  <span>{event.pricing === 'free' 
                    ? event.pricing 
                    : `${event.price?.amount}${event.price?.currency}`}</span>
                  <span>{event.attedanceMode}</span>
                  <span>Event</span>
                </div>
                {diff > 0 && <span className='font-semibold text-xl text-dark-blue mb-6'>Upcoming</span>}
                <EventData start={event.startDateTime} end={event.endDateTime} />
              </div>
              <div className='flex flex-col px-7 pt-10 pb-6 bg-background-panel rounded-xl'>
               {event.marketingMention && (
                <div className='mb-4 text-sm font-normal'>
                  <PortableText value={event.marketingMention} />
                </div>
               )}
               <ButtonRegular className='mb-4'>
                  <span className='text-white text-base font-medium '>Watch replay</span>
               </ButtonRegular>
               {event.financialAid && (
                <PortableText 
                  value={event.financialAid} 
                />
               )}
              </div>
            </ContainerRegular>
            <ContainerRegular >
              <div className='flex flex-col gap-1.5 w-full mb-9'>
                <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Venue Location</span>
                <span className='text-borders font-normal text-sm'>{event.venue}</span>
              </div>
              <div className='flex flex-col gap-1.5 w-full mb-9'>
                <span className='text-subtitles font-semibold text-2xl lg:text-3xl'>Rich Text Box</span>
                <span className='text-borders font-normal text-sm'>{event.venue}</span>
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
      </div>
    </div>
  );
};

export default EventSingleComponent;

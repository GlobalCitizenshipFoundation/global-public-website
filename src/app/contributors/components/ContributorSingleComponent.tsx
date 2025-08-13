import BreakLine from "@/components/BreakLine";
import ButtonPrimary from "@/components/ButtonPrimary";
import ContainerBig from "@/components/ContainerBig";
import RelatedEvent from "@/components/Events/RelatedEvent";
import Newsettler from "@/components/Newsettler";
import { ContributorSocials, getSocialLinksFromCMS } from "@/components/Social/getSocialMediaFromCMS";
import SocialLink from "@/components/Social/SocialLink";
import { PortableText } from "@portabletext/react";
import { FaRegEnvelope, FaPrint } from "react-icons/fa6";
import { ContributorSingleType } from "../../../../utils/contributor-singleTypes";
import Sharing from "@/components/Sharing";

type Props = {
    contributor: ContributorSingleType;
}

const ContributorSingleComponent: React.FC<Props> = ({contributor}) => {

  const socialLinks = getSocialLinksFromCMS(contributor as unknown as ContributorSocials);

  return (
    <>
      <ContainerBig className='mt-25'>
        {contributor.featuredProfile && (
          <>
            <div className='flex justify-between mb-5'>
            <h2 className="text-6xl">Featured Profile</h2>
            <ButtonPrimary href='/contributors' width={253.5}>
              View all profiles
            </ButtonPrimary>
            </div>
            <p className='mb-24'>
              Transforming education for global citizenship and sustainable development. We work to wards transforming education for global citizenship and sustainable.
            </p>
          </>
        )}
      </ContainerBig>

      <section className={`bg-background-darker p-24 ${!contributor.featuredProfile && 'mb-30'}`}>
        <ContainerBig>
          <div className='flex gap-x-16 items-center'>
            {contributor.photo && (
              <div className='w-[490px] h-[490px]'>
                <img src={contributor.photo.asset.url} alt={contributor.name} className='w-full h-full object-cover rounded-md'/>
              </div>
            )}
            <div className='flex flex-col h-auto'>
              {contributor.gender && (
                <p className='text-xl text-titles font-semibold mb-5'>
                  {contributor.gender === 'male'
                    ? 'He/Him'
                    : contributor.gender === 'female'
                    ? 'She/Her'
                    : ''}
                </p>
              )}
              {contributor.name && <h2 className='text-[40px] text-titles font-bold mb-1'>{contributor.name}</h2>}
              {contributor.designation && <h3 className='text-[26px] text-titles font-semibold mb-6.5'>{contributor.designation}</h3>}
              {contributor.organization && <h3 className='text-[26px] text-primary font-medium mb-2'>{contributor.organization}</h3>}
              {contributor.country && <h3 className='text-xl text-titles font-medium mb-7'>{contributor.country}</h3>}
              {contributor.emailId && contributor.emailDisplay && (
                <div className='flex flex-row items-center mb-4'>
                  <SocialLink
                    href={`mailto:${contributor.emailId}`}
                    icon={<FaRegEnvelope />}
                    variant="button"
                    hoverColor="bg-primary"
                    className='mr-3.5'
                  />
                  <p className='text-xl font-medium text-titles'>{contributor.emailId}</p>
                </div>
              )}
              <div className='flex flex-row'>
                <div className='flex gap-4 mr-31.5'>
                  {socialLinks && socialLinks.map((link) => (
                    <SocialLink
                      key={link.href}
                      href={link.href}
                      icon={<link.icon />}
                      variant="button"
                    />
                  ))}
                </div>
                <div className='flex flex-row items-center'>
                  <SocialLink
                    href={`www.wikipedia.com`}
                    icon={<FaPrint />}
                    variant="button"
                    className='mr-3.5'
                  />
                  <span className='font-inter font-normal text-[16px] text-borders'>Print</span>
                </div>
              </div>
            </div>
          </div>
        </ContainerBig>
      </section>
  
      {contributor.featuredProfile && (
        <section className='h-12 bg-primary mb-30'>
          <ContainerBig>
            
              <div className='flex h-12 items-center'>
                <img src="/images/check.svg" alt="" className='w-5 h-5 mr-5.5'/>
                <p className='text-white text-lg font-medium'>Featured profile</p>
              </div>
          </ContainerBig>
        </section>
      )}

      <ContainerBig>
        <p className='text-[42px] text-titles font-semibold font-poppins mb-3.5'>Biography</p>
        {contributor.bio && <PortableText value={contributor.bio}/>}
        <Sharing socialLinks={socialLinks} />
      </ContainerBig>
      {contributor.events && contributor.events.length > 0 && (
        <section className='py-[154px] bg-[#C6E3DF]'>
          <ContainerBig>
              <>
                <h2 className='text-[42px] mb-3.5'>Events By {contributor.name}</h2>
                <p className='mb-15'>Transforming education for global citizenship and sustainable The Global Citizen ship Foundation continues commitment Preparing young people for a smart future.</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {contributor.events.map((event) => (
                  <RelatedEvent event={event} key={event._id}/>
                ))}
                </div>
              </>
          </ContainerBig>
        </section>
      )}
      <Newsettler />
    </>
  );
}

export default ContributorSingleComponent;

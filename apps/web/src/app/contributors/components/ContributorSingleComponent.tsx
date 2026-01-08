import ButtonPrimary from '@/components/ButtonPrimary';
import ContainerBig from '@/components/ContainerBig';
import RelatedEvent from '@/components/Events/RelatedEvent';
import Newsettler from '@/components/Newsettler';
import {
  ContributorSocials,
  getSocialLinksFromCMS,
} from '@/components/Social/getSocialMediaFromCMS';
import SocialLink from '@/components/Social/SocialLink';
import { PortableText } from '@portabletext/react';
import { FaRegEnvelope, FaPrint } from 'react-icons/fa6';
import { ContributorSingleType } from '../../../utils/contributor-singleTypes';
import Sharing from '@/components/Sharing';

type Props = {
  contributor: ContributorSingleType;
};

const ContributorSingleComponent: React.FC<Props> = ({ contributor }) => {
  const socialLinks = getSocialLinksFromCMS(contributor as unknown as ContributorSocials);

  return (
    <>
      <ContainerBig className="mt-25">
        {contributor.featuredProfile && (
          <>
            <div className="mb-5 flex justify-between">
              <h2 className="text-6xl">Featured Profile</h2>
              <ButtonPrimary href="/contributors" width={253.5}>
                View all profiles
              </ButtonPrimary>
            </div>
            <p className="mb-24">
              Transforming education for global citizenship and sustainable development. We work to
              wards transforming education for global citizenship and sustainable.
            </p>
          </>
        )}
      </ContainerBig>

      <section className={`bg-background-darker p-24 ${!contributor.featuredProfile && 'mb-30'}`}>
        <ContainerBig>
          <div className="flex items-center gap-x-16">
            {contributor.photo && (
              <div className="h-122.5 w-122.5">
                <img
                  src={contributor.photo.asset.url}
                  alt={contributor.name}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            )}
            <div className="flex h-auto flex-col">
              {contributor.gender && (
                <p className="text-titles mb-5 text-xl font-semibold">
                  {contributor.gender === 'male'
                    ? 'He/Him'
                    : contributor.gender === 'female'
                      ? 'She/Her'
                      : ''}
                </p>
              )}
              {contributor.name && (
                <h2 className="text-titles mb-1 text-[40px] font-bold">{contributor.name}</h2>
              )}
              {contributor.designation && (
                <h3 className="text-titles mb-6.5 text-[26px] font-semibold">
                  {contributor.designation}
                </h3>
              )}
              {contributor.organization && (
                <h3 className="text-primary mb-2 text-[26px] font-medium">
                  {contributor.organization}
                </h3>
              )}
              {contributor.country && (
                <h3 className="text-titles mb-7 text-xl font-medium">{contributor.country}</h3>
              )}
              {contributor.emailId && contributor.emailDisplay && (
                <div className="mb-4 flex flex-row items-center">
                  <SocialLink
                    href={`mailto:${contributor.emailId}`}
                    icon={<FaRegEnvelope />}
                    variant="button"
                    hoverColor="bg-primary"
                    className="mr-3.5"
                  />
                  <p className="text-titles text-xl font-medium">{contributor.emailId}</p>
                </div>
              )}
              <div className="flex flex-row">
                <div className="mr-31.5 flex gap-4">
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
                <div className="flex flex-row items-center">
                  <SocialLink
                    href={`www.wikipedia.com`}
                    icon={<FaPrint />}
                    variant="button"
                    className="mr-3.5"
                  />
                  <span className="font-inter text-borders text-[16px] font-normal">Print</span>
                </div>
              </div>
            </div>
          </div>
        </ContainerBig>
      </section>

      {contributor.featuredProfile && (
        <section className="bg-primary mb-30 h-12">
          <ContainerBig>
            <div className="flex h-12 items-center">
              <img src="/images/check.svg" alt="" className="mr-5.5 h-5 w-5" />
              <p className="text-lg font-medium text-white">Featured profile</p>
            </div>
          </ContainerBig>
        </section>
      )}

      <ContainerBig>
        <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Biography</p>
        {contributor.bio && <PortableText value={contributor.bio} />}
        <Sharing socialLinks={socialLinks} />
      </ContainerBig>
      {contributor.events && contributor.events.length > 0 && (
        <section className="bg-[#C6E3DF] py-38.5">
          <ContainerBig>
            <>
              <h2 className="mb-3.5 text-[42px]">Events By {contributor.name}</h2>
              <p className="mb-15">
                Transforming education for global citizenship and sustainable The Global Citizen
                ship Foundation continues commitment Preparing young people for a smart future.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {contributor.events.map((event) => (
                  <RelatedEvent event={event} key={event._id} />
                ))}
              </div>
            </>
          </ContainerBig>
        </section>
      )}
      <Newsettler />
    </>
  );
};

export default ContributorSingleComponent;

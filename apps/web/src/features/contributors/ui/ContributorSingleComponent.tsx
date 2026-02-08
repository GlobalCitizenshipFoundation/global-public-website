import React from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

import ButtonPrimary from '@/shared/ui/ButtonPrimary';
import RelatedEvent from '@/features/events/ui/cards/EventCard';
import Newsettler from '@/shared/ui/Newsletter';
import SocialLink from '@/features/social/ui/SocialLink';
import Sharing from '@/shared/ui/Sharing';
import Container from '@/shared/ui/Container';
import PrintButton from '@/shared/ui/PrintButton';

import {
  type ContributorSocials,
  getSocialLinksFromCMS,
} from '@/features/social/ui/getSocialMediaFromCMS';

import type { ContributorSingleType } from '@gcf/types';

type Props = {
  contributor: ContributorSingleType;
};

/**
 * Mapuje typ CMS (ContributorSingleType) na “płaski” obiekt sociali, który rozumie getSocialLinksFromCMS.
 * DOPASUJ pola do tego co realnie masz w ContributorSingleType.
 */
function pickContributorSocials(c: ContributorSingleType): ContributorSocials {
  // Najczęściej w CMS te pola będą miały nazwy typu: twitter, instagram, facebook...
  // Podmień na prawdziwe nazwy z @gcf/types (to jest jedyna rzecz do dostosowania).
  return {
    twitter:
      // @ts-expect-error - dopasuj do realnych pól z CMS
      (c.twitterUrl ?? c.twitter ?? c.x ?? c.xUrl) || undefined,
    instagram:
      // @ts-expect-error - dopasuj do realnych pól z CMS
      (c.instagramUrl ?? c.instagram) || undefined,
    facebook:
      // @ts-expect-error - dopasuj do realnych pól z CMS
      (c.facebookUrl ?? c.facebook) || undefined,
    linkedin:
      // @ts-expect-error - dopasuj do realnych pól z CMS
      (c.linkedinUrl ?? c.linkedin) || undefined,
    youtube:
      // @ts-expect-error - dopasuj do realnych pól z CMS
      (c.youtubeUrl ?? c.youtube) || undefined,
    website:
      // @ts-expect-error - dopasuj do realnych pól z CMS
      (c.websiteUrl ?? c.website) || undefined,
  };
}

const ContributorSingleComponent: React.FC<Props> = ({ contributor }) => {
  const socialLinks = getSocialLinksFromCMS(pickContributorSocials(contributor));
  const photoUrl = contributor.photo?.asset?.url;

  return (
    <>
      <Container variant="big" className="mt-25">
        {contributor.featuredProfile ? (
          <>
            <div className="mb-5 flex justify-between">
              <h2 className="text-6xl">Featured Profile</h2>
              <ButtonPrimary href="/contributors" className="w-[253.5px]">
                View all profiles
              </ButtonPrimary>
            </div>

            <p className="mb-24">
              Transforming education for global citizenship and sustainable development. We work
              towards transforming education for global citizenship and sustainable.
            </p>
          </>
        ) : null}
      </Container>

      <section
        className={`bg-background-darker p-24 ${!contributor.featuredProfile ? 'mb-30' : ''}`}
      >
        <Container variant="big">
          <div className="flex items-center gap-x-16">
            {photoUrl ? (
              <div className="relative h-122.5 w-122.5">
                <Image
                  src={photoUrl}
                  alt={contributor.name ?? 'Contributor'}
                  fill
                  sizes="490px"
                  className="rounded-md object-cover"
                />
              </div>
            ) : null}

            <div className="flex h-auto flex-col">
              {contributor.gender ? (
                <p className="text-titles mb-5 text-xl font-semibold">
                  {contributor.gender === 'male'
                    ? 'He/Him'
                    : contributor.gender === 'female'
                      ? 'She/Her'
                      : ''}
                </p>
              ) : null}

              {contributor.name ? (
                <h2 className="text-titles mb-1 text-[40px] font-bold">{contributor.name}</h2>
              ) : null}

              {contributor.designation ? (
                <h3 className="text-titles mb-6.5 text-[26px] font-semibold">
                  {contributor.designation}
                </h3>
              ) : null}

              {contributor.organization ? (
                <h3 className="text-primary mb-2 text-[26px] font-medium">
                  {contributor.organization}
                </h3>
              ) : null}

              {contributor.country ? (
                <h3 className="text-titles mb-7 text-xl font-medium">{contributor.country}</h3>
              ) : null}

              {contributor.emailId && contributor.emailDisplay ? (
                <div className="mb-4 flex flex-row items-center">
                  {/* Email jest wyjątkiem - lokalna ikona jest OK */}
                  <SocialLink
                    href={`mailto:${contributor.emailId}`}
                    kind="email"
                    variant="button"
                    hoverColor="bg-primary"
                    className="mr-3.5"
                    label="Email"
                  />

                  <p className="text-titles text-xl font-medium">{contributor.emailId}</p>
                </div>
              ) : null}

              <div className="flex flex-row">
                <div className="mr-31.5 flex gap-4">
                  {socialLinks.map((link) => (
                    <SocialLink
                      key={link.href}
                      href={link.href}
                      kind={link.kind}
                      label={link.label}
                      variant="button"
                    />
                  ))}
                </div>

                <div className="flex flex-row items-center">
                  <PrintButton className="mr-3.5" />
                  <span className="font-inter text-borders text-[16px] font-normal">Print</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {contributor.featuredProfile ? (
        <section className="bg-primary mb-30 h-12">
          <Container variant="big">
            <div className="flex h-12 items-center">
              <Image
                src="/images/check.svg"
                alt="Featured profile"
                width={20}
                height={20}
                className="mr-5.5 h-5 w-5"
              />
              <p className="text-lg font-medium text-white">Featured profile</p>
            </div>
          </Container>
        </section>
      ) : null}

      <Container variant="big">
        <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Biography</p>

        {contributor.bio ? <PortableText value={contributor.bio} /> : null}

        {/* Sharing MUSI brać dane (kind/href/label), nie propsy z iconami */}
        <Sharing socialLinks={socialLinks} />
      </Container>

      {contributor.events && contributor.events.length > 0 ? (
        <section className="bg-[#C6E3DF] py-38.5">
          <Container variant="big">
            <h2 className="mb-3.5 text-[42px]">Events By {contributor.name}</h2>

            <p className="mb-15">
              Transforming education for global citizenship and sustainable. The Global Citizenship
              Foundation continues commitment preparing young people for a smart future.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {contributor.events.map((event) => (
                <RelatedEvent event={event} key={event._id} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <Newsettler />
    </>
  );
};

export default ContributorSingleComponent;

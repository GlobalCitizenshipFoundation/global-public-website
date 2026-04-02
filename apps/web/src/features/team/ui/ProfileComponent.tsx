import type { ProfileSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { EventCard } from "@/features/events/ui/cards/EventCard";
import {
  type ContributorSocials,
  getSocialLinksFromCMS,
} from "@/features/social/ui/getSocialMediaFromCMS";
import SocialLink from "@/features/social/ui/SocialLink";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { Container } from "@/shared/ui/Container";
import { Newsletter } from "@/shared/ui/Newsletter";
import { PrintButton } from "@/shared/ui/PrintButton";
import Sharing from "@/shared/ui/Sharing";
import { ProfileCard } from "./ProfileCard";
import { ArticleFrame } from "./ArticleFrame";

type Props = {
  contributor: ProfileSingleType;
};

/**
 * Mapuje typ CMS (ContributorSingleType) na “płaski” obiekt sociali, który rozumie getSocialLinksFromCMS.
 * DOPASUJ pola do tego co realnie masz w ContributorSingleType.
 */
function pickContributorSocials(c: ProfileSingleType): ContributorSocials {
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

export async function ProfileComponent({ contributor }: Props) {
  const socialLinks = getSocialLinksFromCMS(pickContributorSocials(contributor));
  const photoUrl = contributor.photo?.asset?.url;

  return (
    <>
      <section className="bg-background-darker py-10 mb-6">
        <Container variant="regular">
          {contributor.featuredProfile ? (
            <div>
              <div className="mb-5 flex justify-between flex-wrap">
                <h2 className="text-6xl">Featured Profile</h2>
                <ButtonPrimary href="/contributors" className="!w-[253.5px]">
                  View all profiles
                </ButtonPrimary>
              </div>

              <p className="mb-10 max-w-200">
                Transforming education for global citizenship and sustainable development. We work
                towards transforming education for global citizenship and sustainable.
              </p>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-16 gap-y-6">
            {photoUrl ? (
              <div className="relative h-122.5 w-122.5">
                <Image
                  src={photoUrl}
                  alt={contributor.name ?? "Contributor"}
                  fill
                  sizes="490px"
                  className="rounded-md object-cover"
                />
              </div>
            ) : null}

            <div className="flex h-auto flex-col w-full max-w-120">
              {contributor.gender ? (
                <p className="text-titles mb-5 text-xl font-semibold">
                  {contributor.gender === "male"
                    ? "He/Him"
                    : contributor.gender === "female"
                      ? "She/Her"
                      : ""}
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
                    className="mr-3.5 flex-shrink-0"
                    label="Email"
                  />

                  <p className="text-titles text-base font-medium md:text-xl">
                    {contributor.emailId}
                  </p>
                </div>
              ) : null}

              <div className="flex flex-row flex-wrap gap-6">
                <div className="flex gap-4">
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
      <section className="pb-15">
        <Container variant="regular">
          <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Biography</p>

          {contributor.bio ? <PortableText value={contributor.bio} /> : null}

          {/* Sharing MUSI brać dane (kind/href/label), nie propsy z iconami */}
          <Sharing socialLinks={socialLinks} />
        </Container>
      </section>
      {contributor.mentors && contributor.mentors.length > 0 ? (
        <section className="pb-15">
          <Container variant="regular">
            <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Mentors</p>
            <p className="">
              Transforming education for global citizenship and sustainable The Global Citizen ship
              Foundation continues commitment Preparing young people for a smart future.
            </p>

            <div className="flex flex-wrap gap-5 mt-10 justify-between">
              {contributor.mentors.map((mentor) => {
                return <ProfileCard key={mentor._id} profile={mentor} />;
              })}
            </div>
          </Container>
        </section>
      ) : null}
      {contributor.mentees && contributor.mentees.length > 0 ? (
        <section className="pb-15">
          <Container variant="regular">
            <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Mentees</p>
            <p className="">
              Transforming education for global citizenship and sustainable The Global Citizen ship
              Foundation continues commitment Preparing young people for a smart future.
            </p>

            <div className="flex flex-wrap gap-5 mt-10 justify-between">
              {contributor.mentees.map((mentee) => {
                return <ProfileCard key={mentee._id} profile={mentee} />;
              })}
            </div>
          </Container>
        </section>
      ) : null}
      {contributor.articles && contributor.articles.length > 0 ? (
        <section className="pb-15">
          <Container variant="regular">
            <section>
              <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">
                Articles by {contributor.name}
              </h3>
              <p className="mb-8">
                Transforming education for global citizenship and sustainable The Global Citizen
                ship Foundation continues commitment Preparing young people for a smart future.
              </p>
              <div className="">
                <ArticleFrame articles={contributor.articles} />
              </div>
            </section>
          </Container>
        </section>
      ) : null}
      {contributor.events && contributor.events.length > 0 ? (
        <section className="bg-[#C6E3DF] py-12">
          <Container variant="regular">
            <h2 className="mb-3.5 text-[42px]">Events By {contributor.name}</h2>

            <p className="mb-15">
              Transforming education for global citizenship and sustainable. The Global Citizenship
              Foundation continues commitment preparing young people for a smart future.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {contributor.events.map((event) => (
                <EventCard event={event} key={event._id} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      {contributor.tags && contributor.tags.length > 0 ? (
        <section className="py-24 bg-background-darker">
          <Container variant="regular">
            <h3 className="text-3xl pb-4">Specialization Tags</h3>
            <div className="flex flex-wrap gap-2.5">
              {contributor.tags.map((tag, index) => (
                <div
                  key={index + tag._id}
                  className={[
                    "group",
                    "cursor-default select-none",
                    "hover:bg-white",
                    "border-secondary-borders flex items-center justify-center rounded-4xl border px-4 py-2.5",
                    "transition-colors",
                  ].join(" ")}
                >
                  <span className="group-hover:text-primary transition-colors">{tag.title}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <section>
        <Newsletter />
      </section>
    </>
  );
}

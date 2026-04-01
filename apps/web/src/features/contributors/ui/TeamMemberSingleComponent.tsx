import {
  getSocialLinksFromCMS,
  type ContributorSocials,
} from "@/features/social/ui/getSocialMediaFromCMS";
import SocialLink from "@/features/social/ui/SocialLink";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { Container } from "@/shared/ui/Container";
import { Newsletter } from "@/shared/ui/Newsletter";
import { PrintButton } from "@/shared/ui/PrintButton";
import { Tags } from "@/shared/ui/Tags";
import type { TeamMemberSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  teamMember: TeamMemberSingleType;
};

function pickTeamMemberSocials(c: TeamMemberSingleType): ContributorSocials {
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

export async function MemberSingleComponent({ teamMember }: Props) {
  const socialLinks = getSocialLinksFromCMS(pickTeamMemberSocials(teamMember));
  const photoUrl = teamMember.photo?.asset?.url;

  // // static tags for example
  const tags = ["Editors Notes", "Education", "Designer", "Leaders"];
  // const contributors = await getContributors();
  return (
    <>
      <section className="bg-background-darker py-10">
        <Container variant="regular">
          {teamMember.featuredProfile ? (
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
                  alt={teamMember.name ?? "Team Member"}
                  fill
                  sizes="490px"
                  className="rounded-md object-cover"
                />
              </div>
            ) : null}

            <div className="flex h-auto flex-col w-full max-w-120">
              {teamMember.gender ? (
                <p className="text-titles mb-5 text-xl font-semibold">
                  {teamMember.gender === "male"
                    ? "He/Him"
                    : teamMember.gender === "female"
                      ? "She/Her"
                      : ""}
                </p>
              ) : null}

              {teamMember.name ? (
                <h2 className="text-titles mb-1 text-[40px] font-bold">{teamMember.name}</h2>
              ) : null}

              {teamMember.designation ? (
                <h3 className="text-titles mb-6.5 text-[26px] font-semibold">
                  {teamMember.designation}
                </h3>
              ) : null}

              {teamMember.organization ? (
                <h3 className="text-primary mb-2 text-[26px] font-medium">
                  {teamMember.organization}
                </h3>
              ) : null}

              {teamMember.country ? (
                <h3 className="text-titles mb-7 text-xl font-medium">{teamMember.country}</h3>
              ) : null}

              {teamMember.emailId && teamMember.emailDisplay ? (
                <div className="mb-4 flex flex-row items-center">
                  {/* Email jest wyjątkiem - lokalna ikona jest OK */}
                  <SocialLink
                    href={`mailto:${teamMember.emailId}`}
                    kind="email"
                    variant="button"
                    hoverColor="bg-primary"
                    className="mr-3.5 flex-shrink-0"
                    label="Email"
                  />

                  <p className="text-titles text-base font-medium md:text-xl">
                    {teamMember.emailId}
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
      <section className="py-6">
        <Container variant="regular">
          <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Biography</p>

          {teamMember.bio ? <PortableText value={teamMember.bio} /> : null}
        </Container>
      </section>
      <section className="py-6">
        <Container variant="regular">
          <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Mentors</p>
          <p className="">
            Transforming education for global citizenship and sustainable The Global Citizen ship
            Foundation continues commitment Preparing young people for a smart future.
          </p>

          <div className="flex flex-wrap gap-5 mt-10 justify-between">
            {/* <Contributor contributor={contributors[0]} />
            <Contributor contributor={contributors[0]} />
            <Contributor contributor={contributors[0]} /> */}
          </div>
        </Container>
      </section>
      <section className="py-6">
        <Container variant="regular">
          <p className="text-titles font-poppins mb-3.5 text-[42px] font-semibold">Mentees</p>
          <p className="">
            Transforming education for global citizenship and sustainable The Global Citizen ship
            Foundation continues commitment Preparing young people for a smart future.
          </p>

          <div className="flex flex-wrap gap-5 mt-10 justify-between">
            {/* <Contributor contributor={contributors[0]} />
            <Contributor contributor={contributors[0]} />
            <Contributor contributor={contributors[0]} /> */}
          </div>
        </Container>
      </section>
      <section className="mt-8 py-24 bg-background-darker">
        <Container variant="regular">
          <h3 className="text-3xl pb-4">Specialization Tags</h3>
          <Tags tags={tags} />
        </Container>
      </section>
      <section>
        <Newsletter />
      </section>
    </>
  );
}

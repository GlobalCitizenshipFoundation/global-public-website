import type { PartnerSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  type ContributorSocials,
  getSocialLinksFromCMS,
} from "@/features/social/ui/getSocialMediaFromCMS";
import SocialLink from "@/features/social/ui/SocialLink";
import { paths } from "@/shared/config/paths";
import { BreakLine } from "@/shared/ui/BreakLine";
import { ButtonRegular } from "@/shared/ui/ButtonRegular";
import { Container } from "@/shared/ui/Container";
import { Newsletter } from "@/shared/ui/Newsletter";
import Sharing from "@/shared/ui/Sharing";

type Props = {
  partner: PartnerSingleType;
};

const PartnerSingleComponent: React.FC<Props> = ({ partner }) => {
  const socialLinks = getSocialLinksFromCMS(partner as unknown as ContributorSocials);

  return (
    <>
      {partner.headerImage?.asset?.url ? (
        <div className="relative z-0 mb-10.5 h-120 w-full overflow-hidden">
          <Image
            src={partner.headerImage.asset.url}
            alt={partner.title ? `${partner.title} header image` : "Partner header image"}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <Container>
        <div className="mb-16 flex flex-row justify-between gap-x-35">
          <div>
            {partner.country ? (
              <p className="bg-background-panel text-gray mb-4.5 inline-block rounded-full px-6 py-2.75 text-lg font-medium">
                {partner.country}
              </p>
            ) : null}

            {partner.title ? (
              <h2 className="mb-11 text-6xl leading-[111%] font-semibold">{partner.title}</h2>
            ) : null}

            {partner.shotrDescription ? (
              <p className="text-2xl leading-[142%]">{partner.shotrDescription}</p>
            ) : null}
          </div>

          <div className="relative z-10 -mt-35.5 w-75 shrink-0">
            {partner.logo?.asset?.url ? (
              <div className="mb-7.5 flex aspect-square w-75 items-center justify-center rounded-full bg-white p-8 shadow">
                <div className="relative h-full w-full">
                  <Image
                    src={partner.logo.asset.url}
                    alt={partner.title ? `${partner.title} logo` : "Partner logo"}
                    fill
                    sizes="300px"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-4">
              {partner.websiteUrl ? (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block"
                >
                  <ButtonRegular className="bg-primary-darker h-9.5 w-full text-base font-normal text-white">
                    {partner.websiteText || "Visit Website"}
                  </ButtonRegular>
                </a>
              ) : null}

              {socialLinks.length > 0 ? (
                <div className="flex h-11 gap-4.75">
                  {socialLinks.map((link) => (
                    <SocialLink
                      key={link.href}
                      href={link.href}
                      kind={link.kind}
                      label={link.label}
                      bgColor="bg-background-panel"
                      variant="button"
                      className="h-full w-full"
                    />
                  ))}
                </div>
              ) : null}

              <Link href={paths.partners}>
                <ButtonRegular className="border-dark-blue h-9.5 w-full border bg-transparent">
                  View All Partners
                </ButtonRegular>
              </Link>
            </div>
          </div>
        </div>

        <BreakLine className="mb-15" />

        <div className="mb-17.5">{partner.body ? <PortableText value={partner.body} /> : null}</div>

        {partner.quote ? <p className="mb-20">{partner.quote}</p> : null}

        <Sharing socialLinks={socialLinks} />
      </Container>

      <Newsletter />
    </>
  );
};

export default PartnerSingleComponent;

import type { MagazinSingleType } from "@gcf/types";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
} from "@portabletext/react";
import Image from "next/image";
import { formatEventDate } from "@/features/events/lib/formatters";
import { getSocialLinksFromCMS } from "@/features/social/ui/getSocialMediaFromCMS";
import { ButtonRegular } from "@/shared/ui/ButtonRegular";
import { Container } from "@/shared/ui/Container";
import Sharing from "@/shared/ui/Sharing";

type Props = {
  magazine: MagazinSingleType;
};

export function MagazineSingleComponent({ magazine }: Props) {
  const formattedDate = magazine.date ? formatEventDate(magazine.date) : "No date available";

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

  const staticSocials = {
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
  };

  const socialLinks = getSocialLinksFromCMS(staticSocials);

  const links = [
    { name: "Download .PDF", href: magazine.downloadPdf },
    { name: "Download .ePUB", href: magazine.downloadEpub },
  ].filter((x): x is { name: string; href: string } => Boolean(x.href));

  return (
    <Container variant="big" className="mt-14">
      <div className="flex justify-between gap-13">
        <div className="flex flex-col gap-6">
          {magazine.magazinImage && (
            <div className="w-119.75">
              <Image
                src={magazine.magazinImage?.asset.url}
                alt="Event-image"
                className="h-auto w-full max-w-full object-contain"
                width={479}
                height={620}
              />
            </div>
          )}
          <div className="flex flex-row gap-3.5">
            {links.map((item) => (
              <ButtonRegular
                key={item.name}
                className="border-borders h-15.25 border bg-transparent"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3.5"
                >
                  <span className="font-inter text-gray text-xl font-medium">{item.name}</span>
                  <Image src="/images/download.svg" alt="" width={19} height={15} />
                </a>
              </ButtonRegular>
            ))}
          </div>
        </div>
        <section className="flex flex-col">
          <div className="mb-2.5 flex gap-5">
            <h3 className="font-inter text-primary-darker text-[28px] leading-[142%] font-medium">{`Issue ${magazine.issue ? magazine.issue : "1"}`}</h3>
            <h3 className="font-inter text-borders text-[28px] leading-[142%] font-medium">|</h3>
            <h3 className="font-inter text-borders text-[28px] leading-[142%] font-medium">{`${magazine.date && formattedDate.split(" ").slice(1).join(" ")}`}</h3>
          </div>
          <h2 className="text-titles mb-6 text-6xl leading-[111%] font-semibold">
            {magazine.title}
          </h2>
          {magazine.introText && (
            <div className="mb-19">
              <PortableText components={portableTextComponents} value={magazine.introText} />
            </div>
          )}
          <Sharing title="Share this Issue:" socialLinks={socialLinks} />
        </section>
      </div>
    </Container>
  );
}

export default MagazineSingleComponent;

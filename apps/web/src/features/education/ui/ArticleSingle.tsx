"use client";

import { footer } from "@/shared/config/footer";
import { Container } from "@/shared/ui/Container";
import type { ArticleSingleCmsType } from "../../../../../../packages/types/src/models/article";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
  type PortableTextListComponent,
} from "@portabletext/react";
import Image from "next/image";
import AudioCardWave from "./AudioCardWave";
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaFacebookF, FaPrint } from "react-icons/fa6";
import type { SocialKind } from "@/features/social/ui/getSocialMediaFromCMS";

type Props = {
  article: ArticleSingleCmsType;
};

const socialIcons: Partial<Record<SocialKind | "print", React.ReactNode>> = {
  instagram: <FaInstagram />,
  twitter: <FaXTwitter />,
  linkedin: <FaLinkedinIn />,
  facebook: <FaFacebookF />,
};

const ArticleSingleComponent: React.FC<Props> = ({ article }) => {
  const portableTextComponents = {
    block: {
      h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h2 className="text-titles text-2xl [overflow-wrap:anywhere] break-words lg:text-[42px]">
          {children}
        </h2>
      ),
      h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h3 className="text-titles text-lg font-semibold [overflow-wrap:anywhere] break-words lg:text-2xl">
          {children}
        </h3>
      ),
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="text-body text-sm [overflow-wrap:anywhere] break-words whitespace-normal lg:text-xl">
          {children}
        </p>
      ),
    },
    list: {
      bullet: (({ children }) => (
        <ul className="ml-6 list-disc space-y-4">{children}</ul>
      )) as PortableTextListComponent,
      number: (({ children }) => (
        <ol className="ml-6 list-decimal space-y-6">{children}</ol>
      )) as PortableTextListComponent,
    },
  };

  const socials = footer.find((s) => s.kind === "social");
  const socialLinks = socials?.kind === "social" ? socials.content : [];

  return (
    <article className="bg-background-primary w-full overflow-x-hidden">
      {/* TITLE + DESCRIPTION */}
      <Container>
        <div className="py-8 lg:py-12 max-w-2xl">
          {article.title && (
            <h1 className="text-titles font-bold text-3xl leading-tight [overflow-wrap:anywhere] break-words lg:text-5xl mb-4">
              {article.title}
            </h1>
          )}
          {article.description && (
            <p className="text-body text-sm [overflow-wrap:anywhere] break-words whitespace-normal lg:text-base text-gray-600">
              {article.description}
            </p>
          )}
        </div>
      </Container>

      {/* COVER IMAGE — full width */}
      {article.coverImage?.asset && (
        <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] mb-12 h-[50vh] w-screen sm:h-[60vh]">
          <Image
            src={article.coverImage.asset.url}
            alt={article.title ?? "Article image"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>
      )}

      {/* MAIN CONTENT GRID */}
      <Container>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[180px_1fr_280px] lg:gap-x-8 py-8">
          {/* LEFT COLUMN — Sharing */}
          <aside className="min-w-0">
            <div className="lg:sticky lg:top-8 space-y-3">
              <p className="text-sm font-semibold mb-3">Sharing</p>
              <div className="flex flex-row lg:flex-col gap-3 flex-wrap">
                {socialLinks.map((social) => {
                  const icon = socialIcons[social.kind];
                  if (!icon) return null;
                  return (
                    <a
                      key={social.kind}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                    >
                      <span className="text-base">{icon}</span>
                      <span>{social.label}</span>
                    </a>
                  );
                })}
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                >
                  <FaPrint className="text-base" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </aside>

          {/* MIDDLE COLUMN — Audio + Body */}
          <div className="min-w-0 space-y-10">
            {/* AUDIO */}
            {article.audioUrl && (
              <AudioCardWave
                title="Speaker"
                caption={article.description ?? ""}
                audioUrl={article.audioUrl}
              />
            )}

            {/* BODY */}
            {article.body && (
              <div className="space-y-6">
                <PortableText value={article.body} components={portableTextComponents} />
              </div>
            )}

            {/* END TEXT */}
            {article.endText && (
              <div className="space-y-6">
                <PortableText value={article.endText} components={portableTextComponents} />
              </div>
            )}

            {/* SOURCES */}
            {article.sources && (
              <div className="text-sm lg:text-base space-y-4">
                <PortableText value={article.sources} components={portableTextComponents} />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — Reading time + Authors + Partners + Republish */}
          <aside className="min-w-0 space-y-10">
            {/* READING TIME */}
            {article.readingLength && (
              <div className="inline-flex space-x-2 rounded-[6px] border border-black px-2 py-1 text-sm">
                <Image src="/images/time.svg" alt="" width={16} height={16} />
                <span>
                  {article.readingLength} {article.readingLength > 1 ? "Minutes" : "Minute"} Read
                </span>
              </div>
            )}

            {/* AUTHORS */}
            {article.authors && article.authors.length > 0 && (
              <section className="space-y-4">
                <h3 className="font-semibold text-base mb-4">Authors</h3>
                {article.authors.map((author) => (
                  <div
                    key={author.slug?.current ?? author.name}
                    className="flex flex-row items-center gap-x-3"
                  >
                    <Image
                      src={author.photo?.asset?.url ?? ""}
                      alt={author.name ?? ""}
                      width={60}
                      height={60}
                      className="rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{author.name}</span>
                      {author.title && (
                        <span className="text-xs text-gray-600">{author.title}</span>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* DISCLOSURE STATEMENT */}
            <section className="space-y-3">
              <h3 className="font-semibold text-base">Disclosure statement</h3>
              <hr className="border-gray-300" />
              <div className="space-y-3 text-xs text-gray-600">
                <p>
                  Julien Benoit receives funding from the DSI-NRF African Origins Platform program
                  and GENUS (DSI-NRF Centre of Excellence in Palaeosciences)
                </p>
                <p>
                  Cameron Penn-Clarke receives funding from GENUS (DSI-NRF Centre of Excellence in
                  Palaeosciences).
                </p>
                <p>
                  Charles Helm does not work for, consult, own shares in or receive funding from any
                  company or organisation that would benefit from this article, and has disclosed no
                  relevant affiliations beyond their academic appointment.
                </p>
              </div>
            </section>

            {/* PARTNERS */}
            {article.partners && article.partners.length > 0 && (
              <section>
                <h3 className="font-semibold text-base mb-4">Partners</h3>
                <div style={{ backgroundColor: "#D9D9D9" }} className="rounded-[8px] p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {article.partners.slice(0, 4).map((partner) => (
                      <div
                        key={partner.title}
                        className="relative flex h-16 items-center justify-center rounded-lg bg-white shadow"
                      >
                        <Image
                          src={partner.logo?.asset.url ?? ""}
                          alt={partner.title}
                          fill
                          className="object-contain p-3"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2 text-center text-xs text-gray-700">
                    <p>Leadership as the capacity of a human community to shape.</p>
                    <p>Leadership as the capacity of a human community to shape.</p>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="rounded bg-black px-4 py-2 text-sm text-white">
                      View All Partners
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* REPUBLISH */}
            <section>
              <div style={{ backgroundColor: "#D9D9D9" }} className="rounded-lg p-5">
                <div className="mb-3">
                  <Image
                    src="/images/additionalLogo.svg"
                    alt="Creative Commons"
                    width={80}
                    height={40}
                  />
                </div>
                <div className="mb-4">
                  <h2 className="mb-1 text-sm font-semibold">
                    We believe in the free flow of information
                  </h2>
                  <p className="text-xs text-gray-700">
                    Republish our articles for free, online or in print, under Creative Commons
                    licence.
                  </p>
                </div>
                <button className="w-full rounded bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800">
                  Republish this article
                </button>
              </div>
            </section>
          </aside>
        </div>
      </Container>
    </article>
  );
};

export default ArticleSingleComponent;

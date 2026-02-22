import type { ArticleSingleCmsType } from "@gcf/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import { Container } from "@/shared/ui/Container";
import AudioCardWave from "./AudioCardWave";

type Props = {
  article: ArticleSingleCmsType;
};

export default function ArticleSingleComponent({ article }: Props) {
  const portableTextComponents: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-titles text-2xl wrap-anywhere lg:text-[42px]">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-titles text-lg font-semibold wrap-anywhere lg:text-2xl">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="text-body text-sm wrap-anywhere whitespace-normal lg:text-xl">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="ml-6 list-disc space-y-4">{children}</ul>,
      number: ({ children }) => <ol className="ml-6 list-decimal space-y-6">{children}</ol>,
    },
  };

  const dateLabel = article.publishedAt
    ? new Date(article.publishedAt).toISOString().slice(0, 10)
    : "";

  return (
    <article className="bg-background-primary w-full overflow-x-hidden">
      <Container variant="big">
        <header className="space-y-4">
          <h1 className="text-titles text-3xl font-semibold lg:text-[52px] wrap-anywhere">
            {article.title}
          </h1>

          {dateLabel ? (
            <p className="text-xs text-borders lg:text-sm">Published: {dateLabel}</p>
          ) : null}

          {article.description ? (
            <p className="text-body text-base lg:text-xl">{article.description}</p>
          ) : null}
        </header>
      </Container>

      {article.coverImage?.asset?.url ? (
        <section className="relative right-1/2 left-1/2 -mr-[50vw] mb-12 -ml-[50vw] h-[50vh] w-screen sm:h-[60vh]">
          <Image
            src={article.coverImage.asset.url}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>
      ) : null}

      <Container variant="big">
        <section className="min-w-0 space-y-12">
          {article.audioUrl ? (
            <AudioCardWave
              title="Speaker"
              caption={article.description ?? ""}
              audioUrl={article.audioUrl}
            />
          ) : null}

          {article.body?.length ? (
            <PortableText value={article.body} components={portableTextComponents} />
          ) : null}
        </section>
      </Container>
    </article>
  );
}

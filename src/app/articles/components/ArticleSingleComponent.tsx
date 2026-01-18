import ContainerBig from '@/components/ContainerBig';
import ContainerRegular from '@/components/ContainerRegular';
import { ArticleSingleType } from '../../../../utils/article-singleTypes';
import Image from 'next/image';
import { PortableText, PortableTextBlock, PortableTextComponentProps } from '@portabletext/react';

type Props = {
  article: ArticleSingleType;
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
        <h3 className="text-titles text-xl font-semibold [overflow-wrap:anywhere] break-words lg:text-3xl">
          {children}
        </h3>
      ),
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="text-body text-sm [overflow-wrap:anywhere] break-words whitespace-normal lg:text-2xl">
          {children}
        </p>
      ),
    },
  };

  return (
    <article className="bg-background-primary w-full overflow-x-hidden">
      <ContainerBig>
        {article.articleHeading && (
          <PortableText value={article.articleHeading} components={portableTextComponents} />
        )}
      </ContainerBig>

      {article.articleImage?.asset && (
        <section className="relative right-1/2 left-1/2 -mr-[50vw] mb-12 -ml-[50vw] h-[50vh] w-screen sm:h-[60vh]">
          <Image
            src={article.articleImage.asset.url}
            alt="Article image"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>
      )}

      <ContainerBig>
        <section>
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[1fr_300px] lg:gap-x-8">
            <div className="min-w-0 space-y-12">
              {/* INTRO */}
              <ContainerRegular className="min-w-0 text-sm lg:text-base">
                {article.introText && (
                  <PortableText value={article.introText} components={portableTextComponents} />
                )}
              </ContainerRegular>

              {/* BODY */}
              <ContainerRegular className="min-w-0 text-sm lg:text-base">
                {article.body && (
                  <PortableText value={article.body} components={portableTextComponents} />
                )}
              </ContainerRegular>

              {article.articleImage?.asset && (
                <div className="relative w-full sm:h-100 lg:h-160">
                  <Image
                    src={article.articleImage.asset.url}
                    alt="Article image"
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
              )}

              {/* END TEXT */}
              <ContainerRegular className="min-w-0 text-sm lg:text-base">
                {article.endText && (
                  <>
                    <PortableText value={article.endText} components={portableTextComponents} />
                  </>
                )}
              </ContainerRegular>
            </div>
            <aside className="min-w-0 space-y-6">
              <ContainerRegular className="min-w-0 text-sm lg:text-base">
                <div>aaa</div>
                aaa
              </ContainerRegular>
            </aside>
          </div>
        </section>
      </ContainerBig>
    </article>
  );
};

export default ArticleSingleComponent;

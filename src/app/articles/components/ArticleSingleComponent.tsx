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

  const sidebarPortableText = {
    block: {
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="text-body text-sm [overflow-wrap:anywhere] break-words whitespace-normal">
          {children}
        </p>
      ),
    },
  };

  const authorsTemp = [
    {
      name: 'Moana',
      description: 'Designation, University of Educational Sciences, Country Name',
      imgUrl: '/images/author1.png',
    },
    {
      name: 'Teressa',
      description: 'Designation Professional, University of Leadership Sciences, Residence Nation',
      imgUrl: '/images/author2.png',
    },
    {
      name: 'Lissa William',
      description: 'Designation, University of Educational Sciences, Country of Residence',
      imgUrl: '/images/author3.png',
    },
  ];

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
            <aside className="min-w-0 space-y-12">
              <section className="min-w-0 text-sm lg:text-base">
                <div className="inline-flex space-x-2 rounded-[6px] border border-black px-2 py-1">
                  {article.readingLength && (
                    <>
                      <img src="/images/time.svg" alt="" />
                      <span>
                        {article.readingLength} {article.readingLength > 1 ? 'minutes' : 'minute'}{' '}
                        {'Read'}
                      </span>
                    </>
                  )}
                </div>
              </section>
              <section className="min-w-0 text-sm lg:text-base">
                <div className="space-y-4">
                  {article.authors.length > 0 && <h3 className="mb-4">Authors</h3>}
                  {article.authors &&
                    authorsTemp.map((author) => (
                      <div key={author.imgUrl} className="flex flex-row items-center gap-x-4">
                        <img
                          src={author.imgUrl}
                          alt={author.name}
                          className="h-[70px] w-[70px] rounded-full"
                        />
                        <div className="flex flex-col">
                          <span>{author.name}</span>
                          <span className="text-xs">{author.description}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
              <section className="min-w-0 text-sm lg:text-base">
                <div>
                  {article.disclosureStatement && (
                    <>
                      <h3 className="mb-4">Disclosure Statement</h3>
                      <PortableText
                        value={article.disclosureStatement}
                        components={sidebarPortableText}
                      />
                    </>
                  )}
                </div>
              </section>
              <section className="min-w-0 text-sm lg:text-base">
                {article.partners && <h3 className="mb-4">Partners</h3>}
                {article.partners && (
                  <div
                    style={{ backgroundColor: '#D9D9D9' }}
                    className="mx-auto max-w-4xl rounded-[8px] p-4"
                  >
                    {/* Grid kafelków */}
                    <div className="grid max-w-[calc(2*150px+1rem)] grid-cols-2 gap-4">
                      {article.partners.slice(0, 4).map((partner) => (
                        <div
                          key={partner.title}
                          className="flex h-20 items-center justify-center rounded-lg bg-white p-4 shadow"
                        >
                          <img
                            src={partner.logo?.asset.url}
                            alt={partner.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Opis */}
                    <div className="mt-6 space-y-4 text-center text-sm text-gray-700">
                      <p>Leadership as the capacity of a human community to shape.</p>
                      <p>Leadership as the capacity of a human community to shape.</p>
                    </div>

                    {/* Button */}
                    <div className="mt-4 text-center">
                      <button className="rounded bg-black px-6 py-2 text-white">
                        View All Partners
                      </button>
                    </div>
                  </div>
                )}
              </section>
              <section className="min-w-0 text-sm lg:text-base">
                <div style={{ backgroundColor: '#D9D9D9' }} className="max-w-sm rounded-lg p-6">
                  {/* Logo */}
                  <div className="mb-4">
                    <img
                      src="/images/additionalLogo.svg"
                      alt="Creative Commons"
                      className="h-10 w-20"
                    />
                  </div>

                  {/* Tekst */}
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-semibold">
                      We believe in the free flow of information
                    </h2>
                    <p className="text-sm text-gray-700">
                      Republish our articles for free, online or in print, under Creative Commons
                      licence.
                    </p>
                  </div>

                  {/* Button */}
                  <button className="w-full rounded bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800">
                    Republish this article
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </ContainerBig>
    </article>
  );
};

export default ArticleSingleComponent;

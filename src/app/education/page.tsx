import ContainerBig from '@/components/ContainerBig';
import ContainerRegular from '@/components/ContainerRegular';
import SocialLink from '@/components/Social/SocialLink';
import { socialMediaConfig } from '@/components/Social/socialMediaConfig';
import { getArticles } from '../../../lib/article-fetch';
import { PortableText } from '@portabletext/react';

const EducationPage = async () => {
  const socials = socialMediaConfig;

  const articles = await getArticles();

  return (
    <>
      <div className="mt-18 mb-36">
        <ContainerBig>
          <ContainerRegular>
            <section className="mb-10">
              <h3 className="mb-3.5 text-[42px] font-semibold">Education</h3>
              <div className="flex flex-col flex-wrap gap-[22px]">
                <p>
                  Transforming education for global citizenship and sustainable The Global Citizen
                  ship Foundation continues commitment Preparing young people for a smart future.
                  <br />
                  <br />
                  We work to wards transforming education for global citizenship and development. We
                  work to wards transforming for global citizenship and sustainable. Firstly, the
                  purpose educational leadership and the pipeline of leaders must be dismantled, and
                  newly created to encompass a vision of possibilities, prioritizing learners
                  locally and globally. The metaphor of a trap door, a door that leads to another
                  hidden room, reflects the current stoppage The future lies behind that door, and
                  we are asked.
                </p>
                <button className="w-fit cursor-pointer rounded-lg border border-[#DFDFDF] px-[56px] py-[14px]">
                  View all topics
                </button>
                <div className="flex items-center justify-between border-y border-[#DFDFDF] p-2">
                  <span className="font-bold">Sharing:</span>

                  <div className="flex gap-3">
                    {socials.map((link) => (
                      <SocialLink
                        key={link.name}
                        href={`https://${link.name}.pl`}
                        icon={link.icon}
                        label={link.label}
                        variant="horizontal"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Articles</h3>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                {articles.map((article, index) => (
                  <article
                    key={article._id}
                    className={`relative h-64 overflow-hidden rounded-xl bg-gray-900 text-white sm:h-72 md:h-80 ${index > 0 ? 'hidden sm:block' : ''}`} // tylko pierwszy na mobile
                  >
                    <img
                      src={article.articleImage?.asset?.url}
                      alt="Article image"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 h-full p-4 text-white sm:p-5">
                      <div className="absolute top-1/2 right-4 left-4 -translate-y-1/2">
                        <span className="mb-1 block text-xs opacity-80 sm:text-sm">
                          Most Read · {article.readingLength} min read
                        </span>
                        <h3 className="text-sm leading-snug font-normal sm:text-base md:text-lg">
                          <PortableText
                            value={article.articleHeading}
                            components={{
                              block: {
                                normal: ({ children }) => <span>{children}</span>,
                                h1: ({ children }) => <span>{children}</span>,
                                h2: ({ children }) => <span>{children}</span>,
                                h3: ({ children }) => <span>{children}</span>,
                              },
                            }}
                          />
                        </h3>
                      </div>
                      <button className="absolute bottom-4 left-4 text-xs font-normal sm:text-sm">
                        Read More →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </ContainerRegular>
        </ContainerBig>
      </div>
    </>
  );
};

export default EducationPage;

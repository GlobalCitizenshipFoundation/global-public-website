import type { Metadata } from "next";
import Image from "next/image";
import { DataEventHome } from "@/features/home/ui/DataEventHome";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { Container } from "@/shared/ui/Container";
import { Newsletter } from "@/shared/ui/Newsletter";
// import { SwiperList } from "@/shared/ui/SwiperList";
import { SwiperInitiatives } from "@/shared/ui/SwiperInitiatives";
import { SwiperMagazine } from "@/shared/ui/SwiperMagazine";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  const educationButtons = ["Institutions", "Organizations", "Education Leaders", "Educators"];
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative min-h-130 w-full md:min-h-175">
          <Image
            src="/images/home-image.jpg"
            alt="Students and educators collaborating in a classroom"
            fill
            priority
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#060644_0%,rgba(6,6,68,0.9)_25%,rgba(25,25,25,0)_100%)]" />
          <Container
            variant="regular"
            className="relative z-10 flex min-h-130 items-end pb-12 md:min-h-175 md:pb-32"
          >
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <h1 className="text-background-primary text-4xl leading-tight font-semibold md:text-6xl">
                Transforming education for <span className="text-primary">everyone</span>.
              </h1>
              <div className="flex flex-col gap-6">
                <p className="text-background-primary text-lg md:text-1xl">
                  With our global mandate to realize United Nations&apos; Sustainable Development
                  Goal 4.7, we work towards transforming education for global citizenship and
                  sustainable development.
                </p>
                <ButtonPrimary className="w-77.5 max-w-full" href="/about">
                  Know more about us
                </ButtonPrimary>
              </div>
            </div>
          </Container>
        </div>
      </section>
      {/* EDUCATION */}
      <section className="bg-home-beige py-16 md:py-24">
        <Container variant="regular">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* image block */}
            <div className="relative max-w-[820px]">
              <div className="relative overflow-hidden rounded-[20px]">
                <div className="z-1 relative aspect-5/6 max-lg:aspect-6/3 w-full">
                  <Image
                    src="/images/home-education.jpg"
                    alt="Education program session"
                    fill
                    className="object-cover rounded-tr-full rounded-br-full rounded-bl-full"
                  />
                </div>
                <div className="z-2 bg-background-primary absolute top-6 left-6 rounded-[20px] max-lg:px-4 max-lg:py-2">
                  <div className="text-gray text-5xl max-lg:text-2xl leading-none font-bold">
                    70+
                  </div>
                  <div className="text-gray mt-1 text-lg max-lg:text-sm font-medium">countries</div>
                </div>
              </div>
              <Image
                src="/images/home-education-background.svg"
                alt=""
                aria-hidden="true"
                width={538}
                height={528}
                className="pointer-events-none absolute -bottom-10 -left-50 hidden lg:block z-0"
              />
            </div>
            {/* text block */}
            <div className="flex flex-col">
              <h2 className="text-gray mb-4 text-4xl font-semibold md:text-5xl">
                We work on education
              </h2>
              <p className="text-borders mb-6 text-lg md:text-1xl">
                We work towards transforming education for global citizenship and sustainable
                development.
              </p>
              <p className="text-gray mb-10 text-lg font-bold md:text-1xl">
                Since 2016, the Global Citizenship Foundation has been supporting educational
              </p>
              <div className="flex flex-col gap-3.5">
                {educationButtons.map((label) => (
                  <ButtonPrimary
                    key={label}
                    className="w-77.5 max-w-full sm:w-[253px]"
                    href="/education"
                  >
                    {label}
                  </ButtonPrimary>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* FEATURED EVENTS */}
      <section className="flex w-full flex-col items-center justify-center gap-27 py-16 md:py-24">
        <Container variant="regular">
          <DataEventHome
            title={"Featured\nEvents"}
            buttonTitle={"View All Events"}
            textDescription={
              "Take advantage of the excellent upcoming and featured learning and networking opportunities offered by some of researchers."
            }
            gap={30}
          />
        </Container>
        {/* <SwiperList /> */}
      </section>
      {/* NEWS CTA */}
      <section className="bg-dark-blue relative py-16 md:py-24">
        <Image
          src="/images/background-dark-blue.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        <Container variant="regular" className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center max-w-[555px]">
            <h2 className="text-background-primary mb-6 text-3xl font-semibold md:text-5xl">
              Global Citizenship Education in the News
            </h2>
            <p className="text-background-primary mb-10 text-lg md:text-1xl">
              A well informed community is an empowered one as well, so take a look at some of the
              important stories we’ve curated for you.
            </p>
            <ButtonPrimary className="w-77.5 max-w-full" href="/newsroom">
              Visit the Newsroom
            </ButtonPrimary>
          </div>
        </Container>
      </section>
      {/* DATA */}
      <section className="bg-background-primary py-16 md:py-24 relative">
        <div className="hidden min-[1701px]:block absolute top-10 left-0">
          <Image
            src="/images/arrow-section-right.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={200}
            className="h-auto w-full object-contain"
          />
        </div>
        <Container variant="regular">
          <div className="text-center">
            <h2 className="text-gray text-4xl font-semibold">Our 2021 Data</h2>
            <p className="text-gray mt-4 text-lg md:text-xl max-w-150 m-auto">
              Here is a look back at the Global Citizenship Foundation&apos;s achievements and
              milestones in 2021.
            </p>
          </div>
          <div className="flex justify-between max-[1024px]:justify-center flex-wrap items-center mt-10 gap-x-5 gap-y-10">
            {[
              { value: "9+", label: "Initiatives" },
              { value: "70+", label: "Countries" },
              { value: "20+", label: "Staff Nationalities" },
              { value: "4978+", label: "Young People" },
              { value: "20580+", label: "Education Leaders" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-3 w-40 max-[1024px]:w-full">
                <span className="text-gray text-3xl font-semibold md:text-[25px]">
                  {item.value}
                </span>
                <span className="border-t-home-liner text-gray border-t-2 pt-4 text-base md:text-s">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
        <div className="hidden min-[1701px]:block absolute top-10 right-0">
          <Image
            src="/images/arrow-section-left.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={200}
            className="h-auto w-full object-contain"
          />
        </div>
      </section>
      {/* INITIATIVES */}
      <section className="bg-background-darker py-16 md:py-24">
        <Container variant="regular">
          <DataEventHome
            title={"Our\nInitiatives"}
            buttonTitle="View All Initiatives"
            textDescription="Realizing United Nations' Sustainable Development Goals and the transformation."
            gap={30}
          />
          <div className="mt-12 overflow-hidden">
            <SwiperInitiatives slidesPerView={4} slidesWidth={235} />
          </div>
        </Container>
      </section>
      {/* MAGAZINE CTA */}
      <section className="py-16 md:py-24">
        <Container variant="regular">
          <DataEventHome
            title={"Explore the .ed\nMagazine"}
            buttonTitle="View All Editions"
            textDescription="The .ed Magazine is a carefully curated issue-based flagship digital publication."
            gap={30}
          />
          <div className="mt-12 overflow-hidden">
            <SwiperMagazine />
          </div>
        </Container>
      </section>
      {/* ANNOUNCEMENT */}
      <section className="relative bg-[#EEECE1] py-16 md:py-36">
        <div className="absolute top-0 right-0 h-full w-[60%] max-[1440px]:w-[80%] max-[768px]:hidden">
          <Image
            src="/images/announcement.png"
            alt="announcement"
            aria-hidden="true"
            width={400}
            height={200}
            className="object-left h-full w-full object-cover"
          />
        </div>
        <Container variant="regular">
          <div className="max-w-[400px]">
            <h2 className="whitespace-pre-line text-gray mb-0 w-full text-[40px]/[111%] font-semibold">
              Announcement of upcoming event
            </h2>
            <p className="py-8 text-1xl/[128%] font-normal">
              The .ed Magazine is a carefully curated issue-based flagship digital publication of
              the Global Citizenship Foundation.{" "}
            </p>
            {[
              "The Stadios Institute, a non-profit enterprise is launched in Germany",
              "Understanding of countries, communities, and cultures around the world",
              "Mentor-Intern Program now caters to more organizations",
            ].map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-5 mb-10">
                  <div className="w-20 h-20 shrink-0 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="26"
                      viewBox="0 0 31 26"
                      fill="none"
                    >
                      <path
                        d="M1.84564 16.5121C1.60173 16.4409 1.38747 16.2926 1.23503 16.0894C1.08258 15.8861 1.00017 15.6389 1.00017 15.3848V10.1006C1.00017 9.8465 1.08258 9.59928 1.23503 9.39602C1.38747 9.19276 1.60173 9.04442 1.84564 8.97328L27.6796 1.04697C27.8546 0.995927 28.039 0.98633 28.2184 1.01894C28.3978 1.05155 28.5671 1.12547 28.7129 1.23485C28.8587 1.34423 28.9771 1.48607 29.0586 1.64912C29.1402 1.81217 29.1826 1.99197 29.1826 2.17427V23.3111C29.1826 23.4934 29.1402 23.6732 29.0586 23.8363C28.9771 23.9993 28.8587 24.1411 28.7129 24.2505C28.5671 24.3599 28.3978 24.4338 28.2184 24.4664C28.039 24.499 27.8546 24.4894 27.6796 24.4384L1.84564 16.5121Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.87138 18.0529V23.3107C6.87138 23.6221 6.9951 23.9208 7.21531 24.141C7.43553 24.3613 7.73421 24.485 8.04565 24.485H12.7427C13.0542 24.485 13.3528 24.3613 13.5731 24.141C13.7933 23.9208 13.917 23.6221 13.917 23.3107V5.26953"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base text-gray font-medium">{item}</p>
                </div>
              );
            })}
            <div className="">
              <ButtonPrimary href="#" className="!w-[310px]">
                View the Magazine
              </ButtonPrimary>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Newsletter />
      </section>
    </>
  );
}

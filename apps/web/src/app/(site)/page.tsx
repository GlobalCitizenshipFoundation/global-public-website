import type { Metadata } from "next";
import Image from "next/image";
import { DataEventHome } from "@/features/home/ui/DataEventHome";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";
import { Container } from "@/shared/ui/Container";
import { Newsletter } from "@/shared/ui/Newsletter";
import { SwiperList } from "@/shared/ui/SwiperList";

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
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
          <Container
            variant="big"
            className="relative z-10 flex min-h-130 items-end pb-12 md:min-h-175 md:pb-16"
          >
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <h1 className="text-background-primary text-4xl leading-tight font-semibold md:text-6xl">
                Transforming education for everyone.
              </h1>
              <div className="flex flex-col gap-6">
                <p className="text-background-primary text-lg md:text-2xl">
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
        <Container variant="big">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* image block */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[20px]">
                <div className="relative aspect-5/6 w-full">
                  <Image
                    src="/images/home-education.jpg"
                    alt="Education program session"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-background-primary absolute top-6 left-6 rounded-[20px] px-8 py-6">
                  <div className="text-gray text-5xl leading-none font-bold">70+</div>
                  <div className="text-gray mt-1 text-lg font-medium">countries</div>
                </div>
              </div>
              <Image
                src="/images/home-education-background.svg"
                alt=""
                aria-hidden="true"
                width={538}
                height={528}
                className="pointer-events-none absolute -bottom-10 -left-10 hidden lg:block"
              />
            </div>
            {/* text block */}
            <div className="flex flex-col">
              <h2 className="text-gray mb-4 text-4xl font-semibold md:text-6xl">
                We work on education
              </h2>
              <p className="text-borders mb-6 text-lg md:text-2xl">
                We work towards transforming education for global citizenship and sustainable
                development.
              </p>
              <p className="text-gray mb-10 text-lg font-bold md:text-2xl">
                Since 2016, the Global Citizenship Foundation has been supporting educational
              </p>
              <div className="flex flex-col gap-3.5">
                {educationButtons.map((label) => (
                  <ButtonPrimary key={label} className="w-77.5 max-w-full" href="/education">
                    {label}
                  </ButtonPrimary>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* FEATURED EVENTS */}
      <section className="flex w-full flex-col items-center justify-center gap-27 py-56.25">
        <DataEventHome
          title={"Featured Events"}
          buttonTitle={"View All Events"}
          textDescription={
            "Take advantage of the excellent upcoming and featured learning and networking opportunities offered by some of researchers."
          }
          gap={177}
        />
        <SwiperList />
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
        <Container variant="big" className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-background-primary mb-6 text-3xl font-semibold md:text-6xl">
              Global Citizenship Education in the News
            </h2>
            <p className="text-background-primary mb-10 text-lg md:text-2xl">
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
      <section className="bg-background-primary py-16 md:py-24">
        <Container variant="big">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <div className="hidden lg:block">
              <Image
                src="/images/arrow-section-right.png"
                alt=""
                aria-hidden="true"
                width={400}
                height={200}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="text-center">
              <h2 className="text-gray text-4xl font-semibold md:text-6xl">Our 2021 Data</h2>
              <p className="text-gray mt-4 text-lg md:text-2xl">
                Here is a look back at the Global Citizenship Foundation&apos;s achievements and
                milestones in 2021.
              </p>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/arrow-section-left.png"
                alt=""
                aria-hidden="true"
                width={400}
                height={200}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {[
              { value: "9+", label: "Initiatives" },
              { value: "70+", label: "Countries" },
              { value: "20+", label: "Staff Nationalities" },
              { value: "4978+", label: "Young People" },
              { value: "20580+", label: "Education Leaders" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-3">
                <span className="text-gray text-3xl font-semibold md:text-[45px]">
                  {item.value}
                </span>
                <span className="border-t-home-liner text-gray border-t-2 pt-4 text-base md:text-xl">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* INITIATIVES */}
      <section className="bg-background-darker py-16 md:py-24">
        <Container variant="big">
          <DataEventHome
            title="Our Initiatives"
            buttonTitle="View All Initiatives"
            textDescription="Realizing United Nations' Sustainable Development Goals and the transformation."
            gap={300}
          />
        </Container>
      </section>
      {/* MAGAZINE CTA */}
      <section className="py-16 md:py-24">
        <Container variant="big">
          <DataEventHome
            title="Explore the .ed Magazine"
            buttonTitle="View All Editions"
            textDescription="The .ed Magazine is a carefully curated issue-based flagship digital publication of the Global Citizenship Foundation."
            gap={107}
          />
        </Container>
      </section>
      <section>
        <Newsletter />
      </section>
    </>
  );
}

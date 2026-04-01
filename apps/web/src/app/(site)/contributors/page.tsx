import { getContributors } from "@features/contributors/api/getContributors";
import { getTeamMembers } from "@features/contributors/api/getTeamMembers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { ContributorSwiper } from "@/features/contributors/ui/ContributorSwiper";
import { Newsletter } from "@/shared/ui/Newsletter";
import { Faq } from "@/shared/ui/Faq";

export const metadata: Metadata = {
  title: "Contributors",
};

const ContributorsPage = async () => {
  const contributors = await getContributors();
  const teamMembers = await getTeamMembers();

  return (
    <>
      <section className="relative">
        <div className="relative w-full md:min-h-175">
          <Image
            src="/images/volunteers.jpg"
            alt="Students and educators collaborating in a classroom"
            fill
            priority
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r
            from-[#0A0F3D] from-35%
            via-[#0A0F3D]/30 via-55%
            to-transparent"
          />
          <Container variant="big" className="relative z-10 flex py-12 md:min-h-175 md:py-32">
            <div className="">
              <h1 className="text-background-primary text-4xl leading-tight font-semibold md:text-6xl">
                Our team
              </h1>
              <p
                className="max-w-3xl
              text-background-primary
              text-2xl tracking-wide leading-[1.8]
              pt-6
              text-sm md:text-2xl"
              >
                We’re reimagining education to empower global citizens and shape a more just,
                inclusive, and sustainable future.
                <br /> Together, we believe
                <br /> that learning can transform lives — and the world.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-8 md:pt-14">
                <Link className="text-white bg-primary rounded-[10px] px-7 py-2" href="/">
                  Be Part of the Changes
                </Link>
                <Link
                  className="flex items-center gap-3 text-white border border-white px-7 py-2 rounded-[10px]"
                  href="/"
                >
                  Read more
                  <Image
                    width={8}
                    height={8}
                    src="/images/TriangleArrow-right.svg"
                    alt="next-slide"
                    className="translate-x-[2px]"
                  />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section className="py-8 md:py-12">
        <Container variant="big">
          <div className="">
            <h2 className="text-3xl md:text-5xl text-center">
              Our <span className="text-primary">Design</span> <br />
              Team Members
            </h2>
            <p className="text-l md:text-xl text-center text-light-gray font-normal max-w-220 mx-auto">
              Transforming education for global citizenship and sustainable development. We work to
              wards transforming education for global citizenship and sustainable.
            </p>
          </div>
          <div className="mt-10">
            <ContributorSwiper contributors={contributors} color="#C71C41" />
          </div>
        </Container>
      </section>
      <section className="py-8 md:py-12">
        <Container variant="big">
          <div className="">
            <h2 className="text-3xl md:text-5xl text-center">
              Our <span className="text-[#0000C0]">Development</span> <br />
              Team Members
            </h2>
            <p className="text-l md:text-xl text-center text-light-gray font-normal max-w-220 mx-auto">
              Transforming education for global citizenship and sustainable development. We work to
              wards transforming education for global citizenship and sustainable.
            </p>
          </div>
          <div className="mt-10">
            <ContributorSwiper contributors={teamMembers} color="#0000C0" />
          </div>
        </Container>
      </section>
      <section>
        <Newsletter />
      </section>
      <section>
        <Faq />
      </section>
    </>
  );
};

export default ContributorsPage;

// import { getContributors } from "@features/contributors/api/getContributors";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// import ContributorFrame from "@/features/contributors/ui/ContributorFrame";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: "Contributors",
};

const ContributorsPage = async () => {
  // const contributors = await getContributors();
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
          <Container variant="regular" className="relative z-10 flex py-12 md:min-h-175 md:py-32">
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
      {/* <Container variant="big" className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Our Team Members</h2>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work to
          wards transforming education for global citizenship and sustainable.
        </p>
      </Container>
      <div className="bg-background-darker py-36">
        <Container variant="big">
          <h3 className="mb-3.5 text-[42px] font-semibold">Designer Team</h3>
          <p className="text-font-normal mb-23 text-2xl/normal">
            Transforming education for global citizenship and sustainable The Global Citizen ship
            Foundation continues commitment Preparing young people for a smart future.
          </p>
          <div className="flex flex-wrap gap-10.5">
            {contributors.map((contributor) => (
              <ContributorFrame contributor={contributor} key={contributor._id} />
            ))}
          </div>
        </Container>
      </div> */}
    </>
  );
};

export default ContributorsPage;

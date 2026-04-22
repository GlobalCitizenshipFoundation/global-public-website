import type { Metadata } from "next";
import { Container } from "@/shared/ui/Container";
import Image from "next/image";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

export const metadata: Metadata = {
  title: "Who we are",
};

const WhoWeArePage = async () => {
  const advantage = {
    title: "Capacity-Building",
    icon: "#",
  };
  const event = {
    title: "Global Citizenship Education",
    text: "We are one of the pioneering international organizations established with a mandate to advance United Nations Sustainable Development Goal 4.7, that is, Global Citizenship Education.",
    href: "#",
  };
  const eventsArr = Array.from({ length: 6 }, () => event);
  const advantageArr = Array.from({ length: 6 }, () => advantage);

  return (
    <>
      <section className="relative">
        <div className="relative min-h-130 w-full md:min-h-175">
          <Image
            src="/images/who-we-are.png"
            alt="Workers meeting"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>
      <section className="py-10 lg:py-25">
        <Container variant="regular">
          <h1 className="text-4xl lg:text-6xl font-bold pb-5 lg:py-10">Who We Are</h1>
          <p className="text-xl lg:text-3xl text-black font-bold pb-8 lg:pb-16">
            Global Citizenship Foundation impacts educators young people, and organizations in over
            70+ countries, building their capacity to transform education and communities for human
            and planetary flourishing
          </p>
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div className="max-w-[600px] w-full flex-shrink-0 flex flex-col gap-6">
              {advantageArr.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#F6F4F0] px-6 py-5 rounded-xl flex items-center gap-4"
                  >
                    <div className="w-11 h-11 bg-[#CA1F43] rounded-full"></div>
                    <p className="text-black font-medium text-lg">{item.title}</p>
                  </div>
                );
              })}
            </div>
            <div className="max-w-[420px]">
              <p className="text-lg pb-10">
                We work to wards transforming education for global citizenship and sustainable
                development. We work to wards transforming education for global citizenship and
                sustainable development.
              </p>
              <div className="w-full h-90 relative">
                <Image
                  src="/images/meeting.jpg"
                  alt="Live meeting"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#F6F4F0] py-10 lg:py-25">
        <Container variant="regular">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            <div className="col-span-2 lg:col-span-2">
              <h2 className="text-4xl lg:text-6xl font-bold">Education 2030</h2>
              <p className="">
                The Global Citizenship Foundation provides strategic support to individuals,
                institutions, and organizations to help achieve our mandate in line with Education
                2030, as envisioned by the United Nations.{" "}
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:h-full h-80 relative">
              <Image
                src="/images/meeting-1.jpg"
                alt="Live meeting"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="relative h-80">
              <Image
                src="/images/meeting-2.jpg"
                alt="Live meeting"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="relative h-80">
              <Image
                src="/images/meeting-3.jpg"
                alt="Live meeting"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="py-10 lg:py-25">
        <Container variant="regular">
          <div className="col-span-2 lg:col-span-2 pb-10">
            <h2 className="text-4xl lg:text-6xl font-bold">Reimagining Education.</h2>
            <p className="max-w-[720px]">
              Global Citizenship Foundation impacts educators, young people, and organizations in
              over 70+ countries, building their capacity to transform education and communities for
              planetary.
            </p>
          </div>
          <div className="flex justify-between gap-10 flex-col md:flex-row">
            <div className="py-12 px-10 rounded-xl bg-[#F8F8F8] flex-1">
              <h3 className="pb-6 font-5xl">Manifesto</h3>
              <p className="pb-6">
                Global Citizenship Foundation’s endeavors to foster in learners “a mindset to care
                for humanity and the planet to undertake responsible actions when and where
                necessary”.
              </p>
              <p className="">
                The Global Citizenship Foundation strives to educate and empower individuals to
                understand their rights and to be responsible, respectful, and participatory
                citizens committed to inclusivity and justice in our societies.
              </p>
            </div>
            <div className="py-12 px-10 rounded-xl bg-[#0E82C5] flex-1">
              <h3 className="pb-6 font-5xl text-white">Mandate</h3>
              <p className="text-white">
                The Global Citizenship Foundation, in Delhi National Capital Region, India, was
                established as an independent, apolitical, and non-partisan organization with the
                mandate to achieve the United Nations’ Sustainable Development Goal (SDG) 4.7 that
                is Education for Global Citizenship and Sustainable Development towards shaping more
                inclusive, just, peaceful, prosperous, secure and sustainable societies guided by
                the vision of transforming education for human flourishing and aim of shaping a
                radically compassionate world for all.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F8F8] py-10 lg:py-25">
        <Container variant="regular">
          <div className="pb-25 flex md:flex-row flex-col gap-x-10 justify-between">
            <h2 className="max-w-[520px] text-4xl lg:text-6xl font-bold">
              The Global Citizenship Foundation Key Areas of Focus
            </h2>
            <div className="max-w-[520px]">
              <p className="pb-10">
                The Global Citizenship Foundation continues its commitment to transform education
                for human flourishing by developing global programs and initiatives to build
                capacity of education leaders, educators, and youth — in the six key areas of focus
                — towards realizing the United Nations' Sustainable Development Goals. Discover the
                Global Citizenship Foundation's crucial work in shaping a better future for all.
              </p>
              <ButtonPrimary href="/events">View All Events</ButtonPrimary>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 justify-between">
            {eventsArr.map((item, index) => {
              return (
                <div className="rounded-xl bg-white py-10 px-6" key={index}>
                  <h3 className="text-2xl pb-10">{item.title}</h3>
                  <p className="text-xl pb-10">{item.text}</p>
                  <ButtonPrimary className="!w-70" href={item.href}>
                    Read More
                  </ButtonPrimary>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      <section className="py-10 lg:py-25">
        <Container variant="regular">
          <div className="mb-10">
            <h2 className="text-4xl lg:text-6xl font-bold">Our Stakeholders</h2>
            <p className="max-w-[560px]">
              We work to wards transforming education for global citizenship and sustainable
              development. Our organization always appreciates the generosity.
            </p>
          </div>
          <div className="flex gap-6 justify-between lg:flex-row flex-col">
            <div className="rounded-2xl py-10 px-8 bg-[#0E82C5]">
              <p className="rounded-full text-white text-3xl mb-4 w-14 h-14 bg-[#2DA3E7] flex items-center justify-center">
                1
              </p>
              <h3 className="pb-4 text-2xl text-white">Leaders and Policymakers</h3>
              <p className="text-xl text-white">
                We assist and collaborate with policy-makers, school, university, and community
                leaders to implement and advance global citizenship education in formal.
              </p>
            </div>
            <div className="rounded-2xl py-10 px-8 bg-[#F2F2F2]">
              <p className="rounded-full text-white text-3xl mb-4 w-14 h-14 bg-[#313131] flex items-center justify-center">
                2
              </p>
              <h3 className="pb-4 text-2xl">Leaders and Policymakers</h3>
              <p className="text-xl">
                We assist and collaborate with policy-makers, school, university, and community
                leaders to implement and advance global citizenship education in formal.
              </p>
            </div>
            <div className="rounded-2xl py-10 px-8 bg-[#F2F2F2]">
              <p className="rounded-full text-white text-3xl mb-4 w-14 h-14 bg-[#313131] flex items-center justify-center">
                3
              </p>
              <h3 className="pb-4 text-2xl">Leaders and Policymakers</h3>
              <p className="text-xl">
                We assist and collaborate with policy-makers, school, university, and community
                leaders to implement and advance global citizenship education in formal.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#EEECE1] py-10 lg:py-25">
        <Container variant="regular">
          <h2 className="text-4xl lg:text-5xl font-bold text-center">Our Stakeholders</h2>
          <div className="max-w-[560px] m-auto md:mt-25 md:mb-20 mt-15 mb-10">
            <div className="relative w-full h-[1px] bg-[#898881]">
              <div className="absolute -bottom-2 left-0 rounded-full h-3 w-3 bg-[#0E82C5]">
                <span className="absolute -top-6 -left-[50%] text-sm">2014</span>
              </div>
              <div className="absolute -bottom-1.5 left-[20%] rounded-full h-3 w-3 bg-[#0E82C5]">
                <span className="absolute -top-6 -left-[50%] text-sm">2014</span>
              </div>
              <div className="absolute -bottom-1.5 left-[40%] rounded-full h-4 w-4 bg-[#CA1F43] outline-3 outline-white">
                <span className="absolute -top-6 -left-[50%] text-sm">2017</span>
              </div>
              <div className="absolute -bottom-1.5 left-[60%] rounded-full h-3 w-3 bg-[#0E82C5]">
                <span className="absolute -top-6 -left-[50%] text-sm">2014</span>
              </div>
              <div className="absolute -bottom-1.5 left-[80%] rounded-full h-3 w-3 bg-[#0E82C5]">
                <span className="absolute -top-6 -left-[50%] text-sm">2014</span>
              </div>
              <div className="absolute -bottom-1.5 right-0 rounded-full h-3 w-3 bg-[#0E82C5]">
                <span className="absolute -top-6 -left-[50%] text-sm">2014</span>
              </div>
            </div>
          </div>
          <p className="text-center max-w-[480px] m-auto">
            Global Citizenship Foundation’s endeavors to foster in learners “a mindset to care for
            humanity and the planet to undertake responsible actions when and where necessary”.
          </p>
        </Container>
      </section>
      <section className="bg-[#283F55] flex md:flex-row flex-col relative">
        <div className="md:h-auto md:w-[40%] h-50 w-full relative flex-shrink-0">
          <Image
            src="/images/way-forward.jpg"
            alt="Workers meeting"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="md:pl-15 md:pr-10 md:py-30 py-8 px-12.5 max-w-[680px]">
          <h2 className="text-4xl lg:text-6xl font-bold text-white">Way Forward</h2>
          <p className="text-white font-regular">
            With the manifesto, and mandate in mind, the Global Citizenship Foundation endeavors to
            mobilize all stakeholders to join hands to empower young people to become aware and
            engaged global citizens and leaders — of today and tomorrow — who have the right blend
            of skills, discretion, and strength essential to shaping a more inclusive, just,
            peaceful, prosperous, secure, and sustainable world.
          </p>
        </div>
      </section>
      <section className="bg-[#BCC0CB] py-10 md:px-12.5 lg:py-25">
        {/* <Container variant="regular"> */}
        <h2 className="text-4xl font-bold text-center">Our Name</h2>
        <div className="2xl:aspect-[3/1] md:aspect-[2/1] md:h-auto h-100 w-full relative">
          <Image
            src="/images/map.png"
            alt="Workers meeting"
            fill
            priority
            className="md:object-contain object-cover"
          />
        </div>
        {/* </Container> */}
      </section>
    </>
  );
};

export default WhoWeArePage;

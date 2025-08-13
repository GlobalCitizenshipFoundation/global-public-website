'use client';

import Link from 'next/link';
import Image from 'next/image';
import ButtonPrimary from '@/components/ButtonPrimary';
import { DataEventHome } from '@/components/Home/DataEventHome';
import Newsettler from '@/components/Newsettler';
import SwiperList from '@/components/SwiperList';

export default function Home() {
  const educationButtons = ['Institutions', 'Organizations', 'Education Leaders', 'Educators'];

  return (
    <>
      <div className="flex h-screen items-center justify-center gap-4">
        <Link href="/events" className="bg-primary rounded-lg p-10">
          <div className="cursor-pointer text-white">Go to event static page</div>
        </Link>
        <Link href="/contributors" className="rounded-lg bg-emerald-600 p-10">
          <div className="cursor-pointer text-white">Go to contributor static page</div>
        </Link>
        <Link href="/partners" className="rounded-lg bg-blue-900 p-10">
          <div className="cursor-pointer text-white">Go to partner static page</div>
        </Link>
      </div>
      <main>
        <section className="relative flex h-[750px] w-full flex-col">
          <Image
            src="/images/home-image.jpg"
            alt="Home-image"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060644] to-[#19191900]" />
          <div className="absolute inset-0 mx-auto flex max-w-[1200px] items-end justify-center gap-[140px] pb-[116px]">
            <h2 className="text-background-primary text-[80px]/[110%] font-semibold tracking-normal">
              Transforming education for everyone.
            </h2>
            <div className="flex flex-col gap-8">
              <p className="text-background-primary text-2xl font-normal">
                With our global mandate to realize United Nations' Sustainable Development Goal 4.7,
                we work towards transforming education for global citizenship and sustainable
                development.
              </p>
              <ButtonPrimary width={310} href="" children={'Know more about us'} />
            </div>
          </div>
        </section>
        <section className="bg-home-beige flex flex-row items-center justify-center gap-[70px] py-[250px] pr-[331px] pl-[178px]">
          <div className="relative flex w-[790px] justify-end">
            <div className="relative z-10 flex h-[770px] w-[605px] overflow-hidden rounded-tl-[20px] rounded-tr-[303px] rounded-b-[303px]">
              <Image
                src="/images/home-education.jpg"
                alt="Home-image"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="bg-background-primary absolute top-8 left-8 flex flex-col items-center justify-center rounded-[20px] px-8 py-6">
                <span className="text-gray text-[60px]/[116%] font-bold">70+</span>
                <span className="text-gray text-2xl/[142%] font-medium">countries</span>
              </div>
            </div>
            <Image
              src="/images/home-education-background.svg"
              alt="Education-background"
              width={538}
              height={528}
              className="absolute bottom-0 left-0"
            />
          </div>
          <div className="flex w-[552px] flex-col justify-start">
            <h2 className="text-gray mb-4 text-[80px]/[110%] font-semibold tracking-normal">
              We work on education
            </h2>
            <p className="text-borders mb-9 text-2xl/[142%]">
              We work towards transforming education for global citizenship and sustainable
              development.
            </p>
            <p className="text-gray mb-10 text-2xl/[128%] font-bold">
              Since 2016, the Global Citizenship Foundation has been supporting educational
            </p>
            <div className="flex flex-col gap-3.5">
              {educationButtons.map((button) => (
                <ButtonPrimary width={310} href="" children={button} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-[108px] py-[225px]">
          <DataEventHome
            title={'Featured Events'}
            buttonTitle={'View All Events'}
            textDescription={
              'Take advantage of the excellent upcoming and featured learning and networking opportunities offered by some of researchers.'
            }
            gap={177}
          />
          <SwiperList />
        </section>

        <section className="bg-dark-blue relative flex h-[750px] w-full">
          <Image
            src="/images/background-dark-blue.png"
            alt="Background-blue-dark"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 mx-auto flex max-w-[840px] flex-col items-center justify-center">
            <h2 className="text-background-primary mb-9 text-center text-7xl font-semibold">
              Global Citizenship Education in the News
            </h2>
            <p className="text-background-primary mb-14 text-center text-2xl">
              A well informed community is an empowered one as well, so take a look at some of the
              important stories we’ve curated for you.
            </p>
            <ButtonPrimary width={310} href="" children={'Visit the Newsroom'} />
          </div>
        </section>
        <section className="bg-background-primary flex w-full flex-col py-[186px]">
          <div className="flex gap-[50px]">
            <div className="relative flex h-[302px] w-full">
              <Image
                src="/images/arrow-section-right.png"
                alt="Arrow-right"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <h2 className="text-gray text-[75px] font-semibold">Our 2021 Data</h2>
              <p className="text-gray text-center text-2xl font-normal">
                Here is a look back at the Global Citizenship Foundation's achievements and
                milestones in 2021.
              </p>
            </div>
            <div className="relative flex h-[177px] w-full">
              <Image
                src="/images/arrow-section-left.png"
                alt="Arrow-left"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-[88px]">
            <div className="flex min-w-[168px] flex-col items-start justify-center gap-8.5">
              <span className="text-gray text-[45px] font-semibold">9+</span>
              <span className="border-t-home-liner text-gray w-full border-t-2 pt-4 text-xl font-normal">
                Initiaitves
              </span>
            </div>
            <div className="flex min-w-[168px] flex-col items-start justify-center gap-8.5">
              <span className="text-gray text-[45px] font-semibold">70+</span>
              <span className="border-t-home-liner text-gray w-full border-t-2 pt-4 text-xl font-normal">
                Countries
              </span>
            </div>
            <div className="flex min-w-[168px] flex-col items-start justify-center gap-8.5">
              <span className="text-gray text-[45px] font-semibold">20+</span>
              <span className="border-t-home-liner text-gray w-full border-t-2 pt-4 text-xl font-normal">
                Staff Nationalities
              </span>
            </div>
            <div className="flex min-w-[168px] flex-col items-start justify-center gap-8.5">
              <span className="text-gray text-[45px] font-semibold">4978+</span>
              <span className="border-t-home-liner text-gray w-full border-t-2 pt-4 text-xl font-normal">
                Young People
              </span>
            </div>
            <div className="flex min-w-[168px] flex-col items-start justify-center gap-8.5">
              <span className="text-gray text-[45px] font-semibold">20580+</span>
              <span className="border-t-home-liner text-gray w-full border-t-2 pt-4 text-xl font-normal">
                Education Leaders
              </span>
            </div>
          </div>
        </section>
        <section className="bg-background-darker flex w-full items-center justify-center py-[225px]">
          <DataEventHome
            title={'Our Initiatives'}
            buttonTitle={'View All Initiatives'}
            textDescription={`Realizing United Nations' Sustainable Development Goals and the transformation.`}
            gap={300}
          />
        </section>
        <section className="flex w-full items-center justify-center py-[225px]">
          <DataEventHome
            title={'Explore the .ed Magazine'}
            buttonTitle={'View All Editions'}
            textDescription={`The .ed Magazine is a carefully curated issue-based flagship digital publication of the Global Citizenship Foundation.`}
            gap={107}
          />
        </section>
        <section>
          <Newsettler />
        </section>
      </main>
    </>
  );
}

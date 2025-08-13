'use client';

import Link from 'next/link';
import Image from 'next/image';
import ButtonPrimary from '@/components/ButtonPrimary';
import { DataEventHome } from '@/components/Home/DataEventHome';
import Newsettler from '@/components/Newsettler';
import SwiperList from '@/components/SwiperList';

export default function Home() {
  const educationButtons = ['Institutions', 'Organizations', 'Education Leaders', 'Educators']

  return (
    <>
      <div className='h-screen flex justify-center items-center gap-4'>
        <Link href="/events" className='bg-primary p-10 rounded-lg'>
          <div className='cursor-pointer text-white'>Go to event static page</div>
        </Link>
        <Link href="/contributors" className='bg-emerald-600 p-10 rounded-lg'>
          <div className='cursor-pointer text-white'>Go to contributor static page</div>
        </Link>
        <Link href="/partners" className='bg-blue-900 p-10 rounded-lg'>
          <div className='cursor-pointer text-white'>Go to partner static page</div>
        </Link>
      </div>
      <main>
        <section className='flex flex-col relative w-full h-[750px] '>
          <Image
            src="/images/home-image.jpg"
            alt="Home-image"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060644] to-[#19191900]" />
          <div className='absolute inset-0 flex items-end justify-center gap-[140px] max-w-[1200px] mx-auto pb-[116px]'>
            <h2 className='text-[80px]/[110%] text-background-primary font-semibold tracking-normal'>Transforming education for everyone.</h2>
            <div className='flex flex-col gap-8'>
              <p className='text-2xl text-background-primary font-normal'>With our global mandate to realize United Nations' Sustainable Development Goal 4.7, we work towards transforming education for global citizenship and sustainable development.</p>
              <ButtonPrimary width={310} href='' children={'Know more about us'}/>
            </div>
          </div>
        </section>
        <section className='flex flex-row gap-[70px] justify-center items-center bg-home-beige py-[250px] pr-[331px] pl-[178px]'>
          <div className='flex w-[790px] relative justify-end'>
            <div className='flex w-[605px] h-[770px] rounded-b-[303px] rounded-tl-[20px] rounded-tr-[303px] overflow-hidden relative z-10'>
              <Image 
                src="/images/home-education.jpg"
                alt="Home-image"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className='flex flex-col absolute top-8 left-8 bg-background-primary justify-center items-center rounded-[20px] px-8 py-6'>
                <span className='text-[60px]/[116%] text-gray font-bold'>70+</span>
                <span className='text-2xl/[142%] text-gray font-medium'>countries</span>
              </div>
            </div>
            <Image 
              src="/images/home-education-background.svg"
              alt="Education-background"
              width={538}
              height={528}
              className="absolute bottom-0 left-0 "
            />
          </div>
          <div className='flex flex-col justify-start w-[552px]'>
            <h2 className='text-[80px]/[110%] text-gray font-semibold tracking-normal mb-4'>We work on education</h2>
            <p className='text-2xl/[142%] text-borders mb-9'>We work towards transforming education for global citizenship and sustainable development.</p>
            <p className='text-2xl/[128%] text-gray font-bold mb-10'>Since 2016, the Global Citizenship Foundation has been supporting educational</p>
            <div className='flex flex-col gap-3.5'>
              {educationButtons.map(button => (
                <ButtonPrimary width={310} href='' children={button}/>
              ))}
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-[108px] w-full justify-center items-center py-[225px]'>
          <DataEventHome 
            title={'Featured Events'}
            buttonTitle={'View All Events'}
            textDescription={'Take advantage of the excellent upcoming and featured learning and networking opportunities offered by some of researchers.'}
            gap={177}
          />
          <SwiperList />        
        </section>
        
        <section className='flex w-full h-[750px] bg-dark-blue relative'>
          <Image 
            src="/images/background-dark-blue.png"
            alt='Background-blue-dark'
            fill
            className="object-cover"
          />
          <div className='flex flex-col absolute inset-0 justify-center items-center max-w-[840px] mx-auto'>
            <h2 className='text-7xl text-background-primary font-semibold mb-9 text-center'>Global Citizenship Education in the News</h2>
            <p className='text-2xl text-background-primary text-center mb-14'>A well informed community is an empowered one as well, so take a look at some of the important stories we’ve curated for you.</p>
            <ButtonPrimary width={310} href='' children={'Visit the Newsroom'}/>
          </div>
        </section>
        <section className='flex flex-col w-full py-[186px] bg-background-primary'>
          <div className='flex gap-[50px]'>
            <div className='relative flex w-full h-[302px]'>
              <Image 
                src="/images/arrow-section-right.png"
                alt="Arrow-right"
                fill
                className="object-contain"
              />
            </div>
            <div className='flex flex-col items-center gap-4 w-full justify-center'>
              <h2 className='text-[75px] font-semibold text-gray'>Our 2021 Data</h2>
              <p className='text-2xl font-normal text-gray text-center'>Here is a look back at the Global Citizenship Foundation's achievements and milestones in 2021.</p>
            </div>
            <div className='relative flex w-full h-[177px]'>
              <Image 
                src="/images/arrow-section-left.png"
                alt="Arrow-left"            
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className='flex gap-[88px] w-full justify-center'>
              <div className='flex flex-col gap-8.5 justify-center items-start min-w-[168px]'>
                <span className='text-[45px] text-gray font-semibold'>9+</span>
                <span className='w-full pt-4 border-t-2 border-t-home-liner text-xl font-normal text-gray'>Initiaitves</span>
              </div>
              <div className='flex flex-col gap-8.5 justify-center items-start min-w-[168px]'>
                <span className='text-[45px] text-gray font-semibold'>70+</span>
                <span className='w-full pt-4 border-t-2 border-t-home-liner text-xl font-normal text-gray'>Countries</span>
              </div>
              <div className='flex flex-col gap-8.5 justify-center items-start min-w-[168px]'>
                <span className='text-[45px] text-gray font-semibold'>20+</span>
                <span className='w-full pt-4 border-t-2 border-t-home-liner text-xl font-normal text-gray'>Staff Nationalities</span>
              </div>
              <div className='flex flex-col gap-8.5 justify-center items-start min-w-[168px]'>
                <span className='text-[45px] text-gray font-semibold'>4978+</span>
                <span className='w-full pt-4 border-t-2 border-t-home-liner text-xl font-normal text-gray'>Young People</span>
              </div>
              <div className='flex flex-col gap-8.5 justify-center items-start min-w-[168px]'>
                <span className='text-[45px] text-gray font-semibold'>20580+</span>
                <span className='w-full pt-4 border-t-2 border-t-home-liner text-xl font-normal text-gray'>Education Leaders</span>
              </div>
          </div>
        </section>
        <section className='flex w-full bg-background-darker justify-center items-center py-[225px]'>
          <DataEventHome 
            title={'Our Initiatives'}
            buttonTitle={'View All Initiatives'}
            textDescription={`Realizing United Nations' Sustainable Development Goals and the transformation.`}
            gap={300}
          /> 
        </section>
        <section className='flex w-full justify-center items-center py-[225px]'>
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

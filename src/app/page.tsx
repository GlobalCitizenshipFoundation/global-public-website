'use client';

import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className='h-screen flex justify-center items-center gap-4'>
        <Link href="/event-single" className='bg-primary p-10 rounded-lg'>
          <button className='cursor-pointer text-white'>Go to event single page</button>
        </Link>
        <Link href="/contributor-single" className='bg-emerald-600 p-10 rounded-lg'>
          <button className='cursor-pointer text-white'>Go to contributor single page</button>
        </Link>
      </div>
    </>
  );
}

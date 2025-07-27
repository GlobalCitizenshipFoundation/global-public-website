'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className='h-screen flex justify-center items-center gap-4'>
        <Link href="/events" className='bg-primary p-10 rounded-lg'>
          <button className='cursor-pointer text-white'>Go to event single page</button>
        </Link>
        <Link href="/contributors" className='bg-emerald-600 p-10 rounded-lg'>
          <button className='cursor-pointer text-white'>Go to contributor single page</button>
        </Link>
      </div>
    </>
  );
}

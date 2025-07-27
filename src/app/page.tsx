'use client';

import Link from 'next/link';

export default function Home() {
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
    </>
  );
}

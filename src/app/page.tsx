'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className=' h-screen flex justify-center items-center'>
      <Link href="/event-single" className='bg-primary p-10 rounded-lg'>
        <button className='cursor-pointer text-white'>Go to event single page</button>
      </Link>
    </div>
  );
}

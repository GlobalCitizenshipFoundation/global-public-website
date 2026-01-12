import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">404</p>

      <h1 className="mt-3 text-3xl font-semibold text-neutral-900">This page does not exist</h1>

      <p className="mt-3 max-w-prose text-base text-neutral-600">
        The link may be broken, or the page may have been moved. Try going back home.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Go to homepage
        </Link>

        <Link
          href="/events"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          Browse events
        </Link>
      </div>
    </main>
  );
}

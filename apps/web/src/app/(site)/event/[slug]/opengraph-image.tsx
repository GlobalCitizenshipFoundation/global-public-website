import { ImageResponse } from 'next/og';
import { unstable_cache } from 'next/cache';
import { getEventBySlug } from '@/features/event/api/getEventBySlug';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Params = { slug: string };

function formatDateLabel(dateStr?: string | null) {
  if (!dateStr) return '';
  const dt = new Date(dateStr);
  if (Number.isNaN(dt.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dt);
}

function ogFallback(title = 'Event') {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        background: '#0B0B0B',
        color: 'white',
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      <div style={{ marginTop: 48, fontSize: 20, opacity: 0.65 }}>gcf.org</div>
    </div>,
    size
  );
}

function getEventCached(slug: string) {
  return unstable_cache(() => getEventBySlug(slug), ['event-og-image', slug], {
    revalidate: 60 * 60,
  })();
}

function getStartDateTime(event: unknown): string | null {
  if (!event || typeof event !== 'object') return null;

  const v = (event as Record<string, unknown>)['startDateTime'];
  return typeof v === 'string' ? v : null;
}

export default async function Image({ params }: { params: Params }) {
  const slug = params?.slug?.trim();
  if (!slug) return ogFallback('Event');

  let event: Awaited<ReturnType<typeof getEventBySlug>> = null;

  try {
    event = await getEventCached(slug);
  } catch {
    return ogFallback('Event');
  }

  if (!event) return ogFallback('Event not found');

  const title = event.eventHeading ?? 'Event';
  const dateLabel = formatDateLabel(getStartDateTime(event));

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        background: '#0B0B0B',
        color: 'white',
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -1,
          maxWidth: 980,
          whiteSpace: 'pre-wrap',
        }}
      >
        {title}
      </div>

      {dateLabel ? (
        <div style={{ marginTop: 22, fontSize: 30, opacity: 0.85 }}>{dateLabel}</div>
      ) : null}

      <div style={{ marginTop: 50, fontSize: 20, opacity: 0.65 }}>gcf.org</div>
    </div>,
    size
  );
}

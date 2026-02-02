'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setSearchParams } from '@/shared/lib/url';

type EventType = 'all' | 'conference' | 'consultation' | 'panel_discussion';

const TYPES: Array<{ label: string; value: EventType }> = [
  { label: 'All', value: 'all' },
  { label: 'Conference', value: 'conference' },
  { label: 'Consultation', value: 'consultation' },
  { label: 'Panel Discussion', value: 'panel_discussion' },
];

export default function EventTypeTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = (sp.get('type') as EventType) ?? 'all';

  const setType = (type: EventType) => {
    const query = setSearchParams(sp, {
      type: type === 'all' ? null : type,
      page: 1,
    });
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {TYPES.map((t) => {
        const active = t.value === current;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={[
              'h-9 rounded-md border px-3 text-sm',
              active ? 'border-black bg-black text-white' : 'bg-white text-black',
            ].join(' ')}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

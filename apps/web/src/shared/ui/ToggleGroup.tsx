'use client';

type Item<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  items: readonly Item<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function ToggleGroup<T extends string>({ items, value, onChange }: Props<T>) {
  return (
    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((t) => {
        const active = value === t.value;

        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              'h-9 shrink-0 rounded-md border px-3 text-sm',
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

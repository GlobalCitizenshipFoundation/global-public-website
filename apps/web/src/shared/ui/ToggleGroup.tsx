"use client";

import { cn } from "@/shared/lib/cn";

type Item<T extends string> = {
  label: string;
  value: T;
};

type Variant = "tabs" | "types";

type Props<T extends string> = {
  items: readonly Item<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: Variant;
};

export default function ToggleGroup<T extends string>({
  items,
  value,
  onChange,
  variant = "tabs",
}: Props<T>) {
  const wrapBase =
    "flex flex-nowrap items-center overflow-x-auto whitespace-nowrap " +
    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  const btnBase =
    "shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2";

  // TABS = biały blok bez bordera (60px), teksty (active=primary)
  if (variant === "tabs") {
    const wrap = cn(wrapBase, "h-[60px] gap-[18px] rounded-lg bg-white px-[18px]");

    const textBtn = cn(
      btnBase,
      "h-[44px] rounded-md px-[12px] text-[20px] font-medium leading-none",
      "text-ink",
      "hover:bg-[color-mix(in_oklch,var(--color-ink)_10%,transparent)]",
      "focus-visible:ring-primary/30",
    );

    return (
      <div className={wrap} aria-label="Tabs">
        {items.map((t) => {
          const isActive = value === t.value;

          return (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange(t.value)}
              className={cn(textBtn, isActive && "text-primary")}
              aria-pressed={isActive}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    );
  }

  // TYPES = “ink button” style
  const wrap = cn(wrapBase, "gap-[20px]");

  const btn = cn(
    btnBase,
    "h-[60px] rounded-lg border px-[20px] py-[14px] text-[20px] font-medium",
    "border-ink text-ink focus-visible:ring-ink/30",
  );

  return (
    <div className={wrap} aria-label="Types">
      {items.map((t) => {
        const isActive = value === t.value;

        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={cn(
              btn,
              isActive ? "bg-ink text-white" : "hover:bg-ink hover:text-white hover:border-ink",
            )}
            aria-pressed={isActive}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

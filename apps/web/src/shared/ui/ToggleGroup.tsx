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
  ariaLabel?: string;
};

export default function ToggleGroup<T extends string>({
  items,
  value,
  onChange,
  variant = "tabs",
  ariaLabel,
}: Props<T>) {
  const scrollWrapBase =
    "flex flex-nowrap items-center overflow-x-auto whitespace-nowrap " +
    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  const btnBase =
    "cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2";

  // TABS
  if (variant === "tabs") {
    const wrap = cn(
      "grid w-full grid-cols-3 items-center gap-[12px] rounded-lg bg-white p-[8px]",
      "lg:inline-flex lg:w-auto lg:gap-[18px] lg:px-[18px] lg:py-[8px]",
    );

    const tabBtn = cn(
      btnBase,
      "flex h-[44px] w-full items-center justify-center rounded-md px-[12px] text-center text-[16px] font-medium leading-none",
      "text-ink",
      "hover:bg-[color-mix(in_oklch,var(--color-ink)_10%,transparent)]",
      "focus-visible:ring-primary/30",
      "lg:w-auto lg:text-[20px]",
    );

    return (
      <div className={wrap} role="tablist" aria-label={ariaLabel ?? "Tabs"}>
        {items.map((t) => {
          const isActive = value === t.value;

          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(t.value)}
              className={cn(tabBtn, isActive && "text-primary")}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    );
  }

  // TYPES
  const wrap = cn(scrollWrapBase, "gap-[20px]");

  const btn = cn(
    btnBase,
    "shrink-0 h-[60px] rounded-lg border px-[20px] py-[14px] text-[20px] font-medium",
    "border-ink text-ink focus-visible:ring-ink/30",
  );

  return (
    <fieldset className={wrap}>
      <legend className="sr-only">{ariaLabel ?? "Types"}</legend>

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
    </fieldset>
  );
}

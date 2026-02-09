"use client";

import { useMemo } from "react";
import ToggleGroup from "@/shared/ui/ToggleGroup";
import { useQueryPatch } from "@/shared/hooks/useQueryPatch";
import SearchBox from "./SearchBox";

type EventType = "all" | "conference" | "consultation" | "panel_discussion" | "forum";
type Tab = "all" | "upcoming" | "past";

const TYPES = [
  { label: "All", value: "all" },
  { label: "Conference", value: "conference" },
  { label: "Consultation", value: "consultation" },
  { label: "Panel Discussion", value: "panel_discussion" },
  { label: "Forum", value: "forum" },
] as const satisfies readonly { label: string; value: EventType }[];

const TABS = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
] as const satisfies readonly { label: string; value: Tab }[];

type Props = {
  title?: string;
};

function getFirst(sp: URLSearchParams, key: string) {
  return sp.get(key) ?? "";
}

function patchIfChanged(
  sp: URLSearchParams,
  pushPatch: (p: Record<string, string | number | null | undefined>) => void,
  patch: Record<string, string | number | null | undefined>,
) {
  for (const [k, v] of Object.entries(patch)) {
    const next = v == null ? "" : String(v);
    const prev = getFirst(sp, k);

    if (next !== prev) {
      pushPatch(patch);
      return;
    }
  }
}

export default function EventsToolbar({ title }: Props) {
  const { sp, pushPatch } = useQueryPatch();

  const currentType = (sp.get("type") ?? "all") as EventType;
  const currentTab = (sp.get("tab") ?? "all") as Tab;
  const qFromUrl = sp.get("q") ?? "";

  const onDebouncedSearch = useMemo(
    () => (value: string) => {
      const nextQ = value.trim();
      patchIfChanged(sp, pushPatch, { q: nextQ || null, page: 1 });
    },
    [sp, pushPatch],
  );

  const onClear = useMemo(
    () => () => patchIfChanged(sp, pushPatch, { q: null, page: 1 }),
    [sp, pushPatch],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold md:text-[42px]">{title}</h1>

        <div className="w-full sm:w-auto">
          <SearchBox
            initialValue={qFromUrl}
            onDebouncedChange={onDebouncedSearch}
            onClear={onClear}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between gap-3 lg:items-center lg:gap-6">
        <ToggleGroup
          items={TABS}
          value={currentTab}
          onChange={(v) => patchIfChanged(sp, pushPatch, { tab: v === "all" ? null : v, page: 1 })}
        />

        <ToggleGroup
          items={TYPES}
          value={currentType}
          onChange={(v) => patchIfChanged(sp, pushPatch, { type: v === "all" ? null : v, page: 1 })}
        />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  initialValue: string;
  onDebouncedChange: (value: string) => void;
  onClear: () => void;
  debounceMs?: number;
};

export default function SearchBox({
  initialValue,
  onDebouncedChange,
  onClear,
  debounceMs = 250,
}: Props) {
  const [q, setQ] = useState(initialValue);
  const isEditingRef = useRef(false);

  const cbRef = useRef(onDebouncedChange);
  useEffect(() => {
    cbRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  useEffect(() => {
    if (isEditingRef.current) return;
    setQ(initialValue);
  }, [initialValue]);

  const didMountRef = useRef(false);

  useEffect(() => {
    // ✅ nie strzelaj debounced change przy pierwszym renderze
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    // ✅ wywołuj tylko gdy user edytuje (nie przy sync z URL)
    if (!isEditingRef.current) return;

    const t = setTimeout(() => {
      isEditingRef.current = false;
      cbRef.current(q);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [q, debounceMs]);

  return (
    <div className="flex items-center gap-2">
      <input
        value={q}
        onChange={(e) => {
          isEditingRef.current = true;
          setQ(e.target.value);
        }}
        placeholder="Search"
        className="h-10 w-full rounded-md border px-3 text-sm sm:w-72"
      />

      <button
        type="button"
        onClick={() => {
          isEditingRef.current = false;
          setQ('');
          onClear();
        }}
        className="h-10 rounded-md border px-3 text-sm"
      >
        Clear
      </button>
    </div>
  );
}

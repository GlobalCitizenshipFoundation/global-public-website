"use client";

import { useCallback, startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setSearchParams } from "@/shared/lib/url";

type QueryPatch = Record<string, string | number | null | undefined>;

export function useQueryPatch() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const pushPatch = useCallback(
    (patch: QueryPatch) => {
      const query = setSearchParams(sp, patch);

      startTransition(() => {
        router.replace(`${pathname}?${query}`, { scroll: false });
      });
    },
    [router, pathname, sp],
  );

  return { sp, pushPatch };
}

"use client";

import { useEffect } from "react";

export default function AxeDevClient() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let cancelled = false;

    (async () => {
      const axe = (await import("axe-core")).default;

      const run = async () => {
        if (cancelled) return;

        try {
          const results = await axe.run(document, {
            resultTypes: ["violations"],
          });

          console.log(`[a11y] axe finished: violations=${results.violations.length}`);

          if (results.violations.length) {
            console.group("[a11y] axe violations (all)");
            for (const v of results.violations) {
              console.log(`${v.impact ?? "unknown"}: ${v.id} - ${v.help}`);
              for (const n of v.nodes) console.log("node:", n.target, n.failureSummary);
            }
            console.groupEnd();
          }
        } catch (err) {
          console.error("[a11y] axe run failed", err);
        }
      };

      run();
      const t = window.setTimeout(run, 1500);
      return () => window.clearTimeout(t);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

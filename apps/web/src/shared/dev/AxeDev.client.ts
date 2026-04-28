"use client";

import { useEffect } from "react";

export default function AxeDevClient() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let cancelled = false;

    const runAxe = async () => {
      if (cancelled) return;

      try {
        const axe = (await import("axe-core")).default;

        if (cancelled) return;

        const results = await axe.run(document, {
          resultTypes: ["violations"],
        });

        console.info(`[a11y] axe finished: violations=${results.violations.length}`);

        if (results.violations.length) {
          console.group("[a11y] axe violations");

          for (const violation of results.violations) {
            console.info(`${violation.impact ?? "unknown"}: ${violation.id} - ${violation.help}`);

            for (const node of violation.nodes) {
              console.info("node:", node.target, node.failureSummary);
            }
          }

          console.groupEnd();
        }
      } catch (error) {
        console.error("[a11y] axe run failed", error);
      }
    };

    void runAxe();

    const timeoutId = window.setTimeout(() => {
      void runAxe();
    }, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}

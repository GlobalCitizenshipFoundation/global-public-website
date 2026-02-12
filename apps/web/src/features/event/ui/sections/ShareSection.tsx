import type React from "react";
import type { getSocialLinksFromCMS } from "@/features/social/ui/getSocialMediaFromCMS";
import SocialLink from "@/features/social/ui/SocialLink";
import { cn } from "@/shared/lib/cn";

type ShareSectionProps = {
  socialLinks: ReturnType<typeof getSocialLinksFromCMS>;
  variant: "mobile" | "desktop";
};

type PrintIconProps = React.SVGProps<SVGSVGElement>;

function PrintIcon({ className, ...props }: PrintIconProps) {
  return (
    <svg
      viewBox="0 0 2048 1992"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path
        d="m976 13h62l49 3 50 5 39 5 34 6 42 9 42 12 38 12 33 12 37 15 33 15 36 18 23 13 21 12 16 10 22 14 20 14 14 10 32 24 14 12 11 9 11 10 11 9 9 9 8 7 10 10 2 1v2l4 2 14 14v2l3 1 7 8 9 9 7 8 13 15 10 11 9 11 11 13 9 12 14 19 12 17 10 14 10 16 11 17 10 17 11 19 13 24 10 19 13 28 16 37 15 40 14 43 12 42 12 53 7 41 5 39 3 35 2 35v76l-3 55-4 41-7 45-7 36-11 46-13 43-14 41-18 45-13 29-16 33-12 23-14 24-13 22-12 19-10 15-24 34-10 13-11 14-11 13-11 14-13 15-12 13-15 16-26 26-8 7-9 9-8 7-15 13-10 9-28 22-13 10-19 14-42 28-35 21-23 13-27 14-16 8-29 14-34 14-29 11-38 13-49 14-29 7-39 8-39 6-41 5-52 4-28 1h-37l-47-2-47-4-47-6-39-7-49-11-31-9-39-12-30-11-31-12-25-11-20-9-40-20-23-13-21-12-26-16-10-7-19-13-14-10-19-14-14-11-13-11-11-9-12-11-11-9-17-16-7-7-8-7-26-26-7-8-13-14-7-8-24-28-13-16-14-19-13-18-14-20-11-17-13-21-14-24-10-18-12-23-15-31-11-25-11-27-11-30-12-36-12-41-7-28-11-53-6-44-6-63-2-38v-57l2-36 5-52 7-51 7-35 9-37 6-21 12-40 16-47 13-32 13-30 7-15 20-39 12-20 6-11 17-28 22-33 14-20 10-13 12-16 13-16 9-11 12-14 14-15 12-13 8-8 7-8 4-4h2l2-4 34-32 12-11 14-11 13-11 30-23 18-13 22-15 18-12 21-13 15-9 23-13 29-15 22-11 18-8 28-12 29-11 28-10 24-8 35-10 24-6 48-10 45-7 48-5 39-3zm-310 289-16 2-11 6-12 11-5 10-1 4-1 23v366l1 1h780l1-86-1-1-286-1-18-2-8-3-9-7-11-10-6-10-2-10-1-25v-67l1-199-1-1-22-1zm471 4 1 254 1 1 260-1-2-4-6-7-8-7-65-65-8-7-24-24-8-7-21-21-8-7-24-24-8-7-17-17-8-7-10-10-8-7-20-20-8-7-7-6zm-520 501-61 1-18 2-16 7-16 10-13 12-7 7-9 14-6 12-4 13-2 11-1 22v428l1 19 3 17 4 11 7 10 12 14 7 7 15 11 13 8 13 6h2v-120l1-189 4-9 8-11 11-9 7-4 69-1 204-1 497-1h69l23 1 13 3 11 7 10 9 5 10 1 7 1 309 5-1 15-6 16-8 11-7 12-11 7-7 7-10 6-14 4-13 2-11 1-14v-442l-2-17-5-16-8-16-7-11-11-12-11-9-12-7-15-6-13-3-10-1-28-1zm406 375-402 2-1 1v397l1 1 112 1h113l549-1 1-3v-397l-3-1z"
        fill="currentColor"
      />
      <path
        d="m890 1273h391l11 1 2 2v61l-1 13-1 1-54 1-379 1h-140l-7-1-3-4-1-5-1-14v-44l1-10 30-1z"
        fill="currentColor"
      />
      <path d="m710 1420h580l4 2v74l-2 1-40 1-430 1h-105l-7-2-1-2v-74z" fill="currentColor" />
      <path
        d="m1410 873h11l12 2 12 5 10 9 7 9 5 12 2 8v9l-2 9-6 12-12 14-10 7-9 4-5 1h-12l-13-4-10-6-10-10-7-12-4-14v-11l4-13 6-11 9-10 10-6 7-3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ShareSection({ socialLinks, variant }: ShareSectionProps) {
  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "flex flex-col gap-7 px-9" : "flex flex-col gap-7"}>
      <h3 className="font-semibold lg:text-3xl">Share the Event</h3>

      <div className="flex w-full justify-between">
        {socialLinks?.map((link) => (
          <SocialLink
            key={link.href}
            href={link.href}
            kind={link.kind}
            label={link.label}
            variant="button"
            className="w-7 h-7"
          />
        ))}
      </div>

      <button type="button" className="group inline-flex items-center gap-2.5">
        <PrintIcon className="h-9 w-9" />

        <span className="text-borders text-lg font-normal group-hover:text-titles">
          Print Event Details
        </span>
      </button>
    </div>
  );
}

"use client";

import { FaPrint } from "react-icons/fa6";
import SocialLink from "@/features/social/ui/SocialLink";
import type { SocialName } from "@/shared/config/social";
import { BreakLine } from "@/shared/ui/BreakLine";

type SocialItem = {
  kind: SocialName;
  href: string;
  label?: string;
};

type Props = {
  socialLinks: SocialItem[];
  title?: string;
};

export function Sharing({ socialLinks, title = "Sharing:" }: Props) {
  return (
    <>
      <BreakLine className="mt-7.5" />

      <section className="flex justify-between py-4.5">
        <p>{title}</p>

        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.href}
              href={link.href}
              kind={link.kind}
              label={link.label ?? "Share"}
              variant="inline"
            />
          ))}
          <button
            type="button"
            onClick={() => window.print()}
            className="group flex items-center gap-1.75 transition-all duration-300 ease-in-out"
            aria-label="Print"
          >
            <span className="group-hover:text-primary text-xl text-current transition-all duration-300 ease-in-out">
              <FaPrint aria-hidden={true} />
            </span>
            <span className="text-borders group-hover:text-primary text-[16px]">Print</span>
          </button>
          Print
        </div>
      </section>

      <BreakLine className="mb-30" />
    </>
  );
}

export default Sharing;

"use client";

import React from "react";
import { FaPrint } from "react-icons/fa6";

import BreakLine from "@/shared/ui/BreakLine";
import SocialLink from "@/features/social/ui/SocialLink";
import type { SocialName } from "@/shared/config/social";

type SocialItem = {
  kind: SocialName;
  href: string;
  label?: string;
};

type Props = {
  socialLinks: SocialItem[];
  title?: string;
};

const Sharing: React.FC<Props> = ({ socialLinks, title = "Sharing:" }) => {
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
        </div>
      </section>

      <BreakLine className="mb-30" />
    </>
  );
};

export default Sharing;

import Image from "next/image";
import Link from "next/link";

import SocialLink from "@/features/social/ui/SocialLink";
import { footer, subfooter } from "@/shared/config/footer";
import { cn } from "@/shared/lib/cn";
import { BreakLine } from "@/shared/ui/BreakLine";
import { Container } from "@/shared/ui/Container";
import { Logo } from "../header/Logo";

function slugifyId(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container as="footer" variant="footer" className="mt-12" aria-label="Site footer">
      <div className="flex flex-col lg:mb-12 lg:flex-row lg:flex-wrap lg:gap-x-30 lg:gap-y-10">
        <div className="mb-7.5 flex min-w-0 flex-col gap-6 lg:mb-0 lg:gap-5">
          <Logo />

          <p
            className={cn(
              "font-inter text-borders w-full text-sm leading-[142%] font-medium",
              "lg:mb-10 lg:max-w-107.5 lg:min-w-62.5",
              "min-w-0 wrap-break-word hyphens-auto",
            )}
          >
            The Global Citizenship Foundation is a registered not-for-profit specialist organization
            that fosters active global citizenship and global citizenship education (GCED). The seat
            of the Global Citizenship Foundation is the National Capital Territory of Delhi, India.
          </p>

          <Image width={192} height={80} src="/images/UE.png" alt="Compliance badges" />
        </div>

        <div className="mb-13 flex flex-wrap gap-x-25 gap-y-11 lg:mb-0">
          {footer.map((section) => {
            const labelId = `footer-${slugifyId(section.name)}`;

            return (
              <nav key={section.name} className="min-w-0" aria-labelledby={labelId}>
                <p
                  id={labelId}
                  className="font-inter text-gray mb-4 text-xl font-semibold text-nowrap"
                >
                  {section.name}
                </p>

                <ul className="font-inter flex min-w-0 flex-col gap-3.5 text-base font-normal">
                  {section.kind === "social"
                    ? section.content.map((link) => (
                        <li key={link.href} className="min-w-0">
                          <SocialLink
                            href={link.href}
                            kind={link.kind}
                            label={link.label}
                            variant="inline"
                          />
                        </li>
                      ))
                    : section.content.map((link) => (
                        <li key={link.label} className="min-w-0">
                          <Link
                            href={link.href}
                            className={cn(
                              "min-w-0 wrap-break-word hyphens-auto",
                              "text-borders transition-colors hover:text-gray",
                              "underline decoration-transparent underline-offset-4 hover:decoration-current",
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                </ul>
              </nav>
            );
          })}
        </div>
      </div>

      <BreakLine className="mb-6.5" />

      <div className="mb-5.5 flex flex-col gap-x-2 gap-y-5 text-center lg:flex-row lg:justify-between">
        <p className="font-inter text-borders text-sm font-normal">
          Copyright {currentYear} © Global Citizenship Foundation
        </p>

        <nav aria-label="Legal links">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {subfooter.map((data) => (
              <li key={data.name}>
                <Link
                  href={data.href}
                  className={cn(
                    "font-inter min-w-0 text-sm font-normal wrap-break-word",
                    "text-borders transition-colors hover:text-gray",
                    "underline decoration-transparent underline-offset-4 hover:decoration-current",
                  )}
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}

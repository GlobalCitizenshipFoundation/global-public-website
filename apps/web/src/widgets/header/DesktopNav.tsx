"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { header } from "@/shared/config/header";
import ButtonPrimary from "@/shared/ui/ButtonPrimary";

function normalizePath(path: string) {
  const withoutQuery = path.split("?")[0] ?? path;
  if (withoutQuery !== "/" && withoutQuery.endsWith("/")) return withoutQuery.slice(0, -1);
  return withoutQuery || "/";
}

function isActivePath(currentPath: string, hrefs: string | string[]) {
  const cur = normalizePath(currentPath);
  const list = Array.isArray(hrefs) ? hrefs : [hrefs];

  return list.some((h) => {
    const href = normalizePath(h);
    if (href === "/") return cur === "/";
    return cur === href || cur.startsWith(href + "/");
  });
}

const DesktopNav = () => {
  const pathname = usePathname() ?? "/";

  const links = header.filter((i) => i.type !== "button");
  const cta = header.find((i) => i.type === "button");

  return (
    <div className="hidden items-center gap-x-[clamp(16px,2vw,40px)] lg:flex">
      {links.map((item) => {
        const active = isActivePath(pathname, [item.href, ...(item.activeAlsoFor ?? [])]);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={[
              "font-inter relative text-[clamp(14px,1vw,18px)] font-medium whitespace-nowrap transition-colors",
              active ? "text-gray" : "text-gray/70 hover:text-gray",
              "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-current after:transition-transform after:duration-200",
              active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}

      {cta ? (
        <ButtonPrimary
          href={cta.href}
          className="h-[clamp(44px,4.5vw,60px)]"
          labelClassName="text-[clamp(14px,1.2vw,18px)]"
        >
          {cta.label}
        </ButtonPrimary>
      ) : null}
    </div>
  );
};

export default DesktopNav;

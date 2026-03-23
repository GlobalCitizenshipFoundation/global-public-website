"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { header } from "@/shared/config/header";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

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

export function DesktopNav() {
  const pathname = usePathname() ?? "/";
  const [openItem, setOpenItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = header.filter((i) => i.type !== "button");
  const cta = header.find((i) => i.type === "button");

  const handleMouseEnter = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenItem(href);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenItem(null), 150);
  };

  return (
    <div className="hidden items-center gap-x-[clamp(16px,2vw,40px)] lg:flex">
      {links.map((item) => {
        const active = isActivePath(pathname, [item.href, ...(item.activeAlsoFor ?? [])]);
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openItem === item.href;

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => hasChildren && handleMouseEnter(item.href)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "font-inter relative flex items-center gap-1 text-[clamp(14px,1vw,18px)] font-medium whitespace-nowrap transition-colors",
                active ? "text-gray" : "text-gray/70 hover:text-gray",
                "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-current after:transition-transform after:duration-200",
                active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
              ].join(" ")}
            >
              {item.label}
              {hasChildren && (
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>

            {hasChildren && isOpen && (
              <div className="absolute top-full left-1/2 z-50 mt-4 -translate-x-1/2">
                {/* trójkąt */}
                <div className="mx-auto mb-[-1px] h-2.5 w-4 overflow-hidden flex justify-center">
                  <div className="h-3 w-3 rotate-45 bg-white shadow-md" />
                </div>
                <div className="min-w-[180px] rounded-2xl bg-white py-3 shadow-xl ring-1 ring-black/5">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href + child.label}
                      href={child.href}
                      className="block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
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
}

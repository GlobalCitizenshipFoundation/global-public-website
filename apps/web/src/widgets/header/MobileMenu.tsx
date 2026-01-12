'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import ButtonPrimary from '@/shared/ui/ButtonPrimary';
import Portal from '@/shared/ui/Portal';
import { header } from '@/shared/config/header';
import { paths } from '@/shared/config/paths';

function getFocusable(container: HTMLElement) {
  const selectors = ['a[href]', 'button:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(
    ','
  );
  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );
}

function normalizePath(path: string) {
  const withoutQuery = path.split('?')[0] ?? path;
  if (withoutQuery !== '/' && withoutQuery.endsWith('/')) return withoutQuery.slice(0, -1);
  return withoutQuery || '/';
}

function isActivePath(currentPath: string, itemHref: string) {
  const cur = normalizePath(currentPath);
  const href = normalizePath(itemHref);

  if (href === '/') return cur === '/';
  return cur === href || cur.startsWith(href + '/');
}

const MobileMenu: React.FC = () => {
  const pathname = usePathname() ?? '/';

  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const drawer = drawerRef.current;
    if (drawer) {
      const focusables = getFocusable(drawer);
      (focusables[0] ?? drawer).focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      if (e.key !== 'Tab') return;
      const drawerEl = drawerRef.current;
      if (!drawerEl) return;

      const focusables = getFocusable(drawerEl);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!first || !last) return;

      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) burgerRef.current?.focus();
  }, [open]);

  const links = header.filter((i) => i.type !== 'button');
  const cta = header.find((i) => i.type === 'button');

  return (
    <>
      {/* Mobile controls */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <Link
          href={cta?.href ?? paths.contact}
          className="bg-primary flex h-11 w-24 items-center justify-center rounded-md"
        >
          <span className="text-[16px] font-medium text-white">{cta?.label ?? 'Contact'}</span>
        </Link>

        <button
          ref={burgerRef}
          type="button"
          className="bg-gray flex h-11 w-11 items-center justify-center rounded-md"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Image src="/images/burger.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {/* Drawer */}
      {open ? (
        <Portal>
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* overlay */}
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close menu overlay"
              onClick={close}
            />

            {/* panel */}
            <div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              tabIndex={-1}
              className="bg-background-primary absolute top-0 right-0 flex h-full w-[86%] max-w-[360px] flex-col p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-gray text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  className="bg-gray flex h-10 w-10 items-center justify-center rounded-md"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <span className="text-xl leading-none text-white">×</span>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {links.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={close}
                      className={[
                        'rounded-lg px-3 py-2 text-base font-medium transition-colors',
                        active
                          ? 'text-gray bg-black/5'
                          : 'text-gray/85 hover:text-gray hover:bg-black/5',
                      ].join(' ')}
                    >
                      <span className="relative inline-flex items-center gap-2">
                        {active ? (
                          <span className="bg-primary h-2 w-2 rounded-full" aria-hidden="true" />
                        ) : null}
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-6">
                <ButtonPrimary href={cta?.href ?? '/contact'} className="w-full" onClick={close}>
                  {cta?.label ?? 'Contact'}
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </Portal>
      ) : null}
    </>
  );
};

export default MobileMenu;

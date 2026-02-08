'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ButtonPrimary from '@/shared/ui/ButtonPrimary';
import Portal from '@/shared/ui/Portal';
import { header } from '@/shared/config/header';
import { paths } from '@/shared/config/paths';

type Phase = 'closed' | 'enter' | 'open' | 'exit';

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

function isActivePath(currentPath: string, hrefs: string | string[]) {
  const cur = normalizePath(currentPath);
  const list = Array.isArray(hrefs) ? hrefs : [hrefs];

  return list.some((h) => {
    const href = normalizePath(h);
    if (href === '/') return cur === '/';
    return cur === href || cur.startsWith(href + '/');
  });
}

const TRANSITION_MS = 250;
const DESKTOP_MQ = '(min-width: 1200px)';

const MobileMenu: React.FC = () => {
  const pathname = usePathname() ?? '/';
  const prevPathRef = useRef(pathname);

  const [phase, setPhase] = useState<Phase>('closed');

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const raf1 = useRef<number | null>(null);
  const raf2 = useRef<number | null>(null);
  const fallbackTimer = useRef<number | null>(null);

  const links = useMemo(() => header.filter((i) => i.type !== 'button'), []);
  const cta = useMemo(() => header.find((i) => i.type === 'button'), []);

  const isMounted = phase !== 'closed';
  const isOpen = phase === 'open';
  const isVisible = phase === 'enter' || phase === 'open' || phase === 'exit';
  const isSlidIn = phase === 'open';

  const clearRafs = useCallback(() => {
    if (raf1.current) window.cancelAnimationFrame(raf1.current);
    if (raf2.current) window.cancelAnimationFrame(raf2.current);
    raf1.current = null;
    raf2.current = null;
  }, []);

  const clearFallback = useCallback(() => {
    if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = null;
  }, []);

  const scheduleFallbackClose = useCallback(() => {
    clearFallback();
    fallbackTimer.current = window.setTimeout(() => {
      setPhase((p) => (p === 'exit' ? 'closed' : p));
    }, TRANSITION_MS + 120);
  }, [clearFallback]);

  const hardClose = useCallback(() => {
    clearRafs();
    clearFallback();
    setPhase('closed');
  }, [clearFallback, clearRafs]);

  const openMenu = useCallback(() => {
    clearRafs();
    clearFallback();

    setPhase((p) => {
      if (p === 'open' || p === 'enter') return p;
      return 'enter';
    });

    raf1.current = window.requestAnimationFrame(() => {
      raf2.current = window.requestAnimationFrame(() => {
        setPhase((p) => (p === 'enter' ? 'open' : p));
      });
    });
  }, [clearFallback, clearRafs]);

  const closeMenu = useCallback(() => {
    clearRafs();
    clearFallback();

    setPhase((p) => {
      if (p === 'closed' || p === 'exit') return p;
      return 'exit';
    });

    scheduleFallbackClose();
  }, [clearFallback, clearRafs, scheduleFallbackClose]);

  // ✅ zamykaj tylko kiedy pathname REALNIE się zmieni
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (phase !== 'closed') closeMenu();
    }
  }, [pathname, closeMenu, phase]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);

    const onChange = () => {
      if (!mq.matches) return;
      hardClose();
    };

    onChange();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, [hardClose]);

  useEffect(() => {
    if (!isOpen) return;

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
        closeMenu();
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
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (phase === 'closed') burgerRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    return () => {
      clearRafs();
      clearFallback();
    };
  }, [clearFallback, clearRafs]);

  const onPanelTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (e) => {
    if (e.propertyName !== 'transform') return;

    if (phase === 'exit') {
      clearFallback();
      setPhase('closed');
    }
  };

  return (
    <>
      <div className="flex items-center gap-2.5 lg:hidden">
        <Link
          href={cta?.href ?? paths.contact}
          className="bg-primary flex h-[clamp(44px,4.5vw,60px)] w-[clamp(96px,10vw,120px)] items-center justify-center rounded-md"
        >
          <span className="text-[clamp(14px,1.3vw,20px)] font-medium text-white">
            {cta?.label ?? 'Contact'}
          </span>
        </Link>

        <button
          ref={burgerRef}
          type="button"
          className={[
            'bg-gray relative flex h-[clamp(44px,4.5vw,60px)] w-[clamp(44px,4.5vw,60px)] items-center justify-center rounded-md',
            'z-[9999]',
            'transition-transform active:scale-[0.98]',
          ].join(' ')}
          aria-label={isVisible ? 'Close menu' : 'Open menu'}
          aria-expanded={isVisible}
          aria-controls="mobile-menu"
          onClick={() => {
            if (phase === 'open' || phase === 'enter') closeMenu();
            else openMenu();
          }}
        >
          <span className="relative block h-[clamp(18px,2vw,24px)] w-[clamp(18px,2vw,24px)]">
            <span
              className={[
                'absolute top-1/2 left-0 h-[2px] w-full rounded-full bg-white',
                'transition-transform duration-200 ease-out',
                isVisible ? 'translate-y-0 rotate-45' : '-translate-y-[7px] rotate-0',
              ].join(' ')}
              aria-hidden="true"
            />
            <span
              className={[
                'absolute top-1/2 left-0 h-[2px] w-full rounded-full bg-white',
                'transition-opacity duration-150 ease-out',
                isVisible ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
              aria-hidden="true"
            />
            <span
              className={[
                'absolute top-1/2 left-0 h-[2px] w-full rounded-full bg-white',
                'transition-transform duration-200 ease-out',
                isVisible ? 'translate-y-0 -rotate-45' : 'translate-y-[7px] rotate-0',
              ].join(' ')}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      {isMounted ? (
        <Portal>
          <div className="fixed inset-0 z-[100] lg:hidden">
            <button
              type="button"
              className={[
                'absolute inset-0 transition-opacity duration-200',
                'pointer-events-none bg-transparent opacity-0',
                'sm:bg-black/60',
                isVisible
                  ? 'sm:pointer-events-auto sm:opacity-100'
                  : 'sm:pointer-events-none sm:opacity-0',
              ].join(' ')}
              aria-label="Close menu overlay"
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              aria-hidden={!isOpen}
            />

            <div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              tabIndex={-1}
              onTransitionEnd={onPanelTransitionEnd}
              className={[
                'absolute inset-0 flex h-full w-full flex-col bg-white',
                'px-[clamp(20px,6vw,48px)] py-6 pt-25',
                'sm:inset-auto sm:top-0 sm:right-0 sm:h-full sm:w-[75%]',
                'sm:bg-background-primary sm:p-10 sm:shadow-2xl',
                'transition-transform duration-250 ease-out will-change-transform',
                isSlidIn
                  ? 'pointer-events-auto translate-x-0'
                  : 'pointer-events-none translate-x-full',
              ].join(' ')}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-gray text-lg font-semibold">Menu</span>
              </div>

              <div className="flex flex-col gap-1">
                {links.map((item, idx) => {
                  const active = isActivePath(pathname, [item.href, ...(item.activeAlsoFor ?? [])]);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={closeMenu}
                      style={{ transitionDelay: isOpen ? `${80 + idx * 35}ms` : '0ms' }}
                      className={[
                        'rounded-lg px-3 py-2 text-base font-medium',
                        'transition-all duration-200',
                        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0',
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
                <ButtonPrimary
                  href={cta?.href ?? '/contact'}
                  className="w-full"
                  onClick={closeMenu}
                >
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

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ButtonPrimary from '@/shared/ui/ButtonPrimary';
import { header } from '@/shared/config/header';

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

const DesktopNav = () => {
  const pathname = usePathname() ?? '/';

  const links = header.filter((i) => i.type !== 'button');
  const cta = header.find((i) => i.type === 'button');

  return (
    <div className="hidden items-center gap-x-10 lg:ml-auto lg:flex">
      {links.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={[
              'font-inter relative text-lg font-medium whitespace-nowrap transition-colors',
              active ? 'text-gray' : 'text-gray/70 hover:text-gray',
              'after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-current after:transition-transform after:duration-200',
              active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
            ].join(' ')}
          >
            {item.label}
          </Link>
        );
      })}

      {cta ? (
        <ButtonPrimary href={cta.href} className="w-46.75">
          {cta.label}
        </ButtonPrimary>
      ) : null}
    </div>
  );
};

export default DesktopNav;

import React from 'react';
import Link from 'next/link';

import type { EventSingleType } from '@gcf/types';
import { isValidHttpUrl } from '../../lib/isValidHttpUrl';

type Props = {
  secondary?: EventSingleType['buttonSecondary'];
  tertiary?: EventSingleType['buttonTertiary'];
};

export default function CtaButtons({ secondary, tertiary }: Props) {
  const buttons = [
    { variant: 'secondary' as const, data: secondary },
    { variant: 'tertiary' as const, data: tertiary },
  ].filter((x) => x.data?.label && isValidHttpUrl(x.data?.url));

  if (!buttons.length) return null;

  return (
    <div className="mb-11 flex w-full flex-col gap-4">
      {buttons.map(({ variant, data }, idx) => {
        const label = data!.label!;
        const url = data!.url!;
        const isFirst = idx === 0;

        const containerClass = [
          'group flex h-11 w-full items-center justify-center rounded-lg',
          'transition-all duration-300',
          isFirst ? 'border border-gray bg-white hover:bg-primary' : 'bg-gray hover:bg-primary',
        ].join(' ');

        const labelClass = [
          'text-base font-medium transition-colors duration-300',
          isFirst ? 'text-black group-hover:text-white' : 'text-white',
        ].join(' ');

        return (
          <Link
            key={`${variant}-${url}`}
            href={url}
            target="_blank"
            rel="noreferrer"
            className={containerClass}
          >
            <span className={labelClass}>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}

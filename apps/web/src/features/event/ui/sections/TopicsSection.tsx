import React from 'react';
import type { EventSingleType } from '@gcf/types';

import { Tags } from '@/shared/ui/Tags';
import Container from '@/shared/ui/Container';

type Props = {
  topics: NonNullable<EventSingleType['topics']>;
};

export default function TopicsSection({ topics }: Props) {
  return (
    <section className="bg-background-darker mx-0 px-0 lg:py-[78px]">
      <Container>
        <h2 className="text-titles mb-2.5 text-2xl lg:mb-5 lg:text-[42px]">Topics</h2>
        <Tags tags={topics} />
      </Container>
    </section>
  );
}

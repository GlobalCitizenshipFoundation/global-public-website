import React from 'react';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

interface Person {
  imageURL: string;
  name: string;
  position: string;
  organization: string;
}

interface Props {
  description: PortableTextBlock[];
  peopleList: Person[];
  type: string;
}

export const PeopleList: React.FC<Props> = ({ description, peopleList, type }) => {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <h2 className="text-titles text-[clamp(22px,3vw,42px)] font-semibold">{type}</h2>
        <div className="prose max-w-none">
          <PortableText value={description} />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {peopleList.map((person) => (
          <article key={person.name + person.imageURL} className="flex flex-col">
            <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-lg">
              <Image
                src={person.imageURL}
                alt={person.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>

            <h3 className="text-titles text-[clamp(16px,1.6vw,20px)] font-semibold">
              {person.name}
            </h3>

            <p className="text-primary mt-1 text-[clamp(14px,1.4vw,18px)]">{person.position}</p>

            <p className="text-body mt-2 text-[clamp(12px,1.2vw,16px)] leading-snug">
              <span className="font-medium">Organization</span>
              <br />
              {person.organization}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

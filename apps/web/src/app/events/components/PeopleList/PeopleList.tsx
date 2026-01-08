import React from 'react';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';

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
    <>
      <h2 className="text-titles mb-1.5 text-2xl">{type}</h2>
      <div className="mb-10">
        <PortableText value={description} />
      </div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 lg:grid-cols-4">
        {peopleList.map((person, index) => (
          <div key={index + person.name} className="flex flex-col">
            <img
              className="mb-5 flex w-full rounded-lg"
              src={person.imageURL}
              alt={`Image-speaker--${index + person.name}`}
            />
            <h3 className="mb-2">{person.name}</h3>
            <span className="text-primary mb-2.5 text-lg font-normal">{person.position}</span>
            <span>
              Organization
              <br />
              {person.organization}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

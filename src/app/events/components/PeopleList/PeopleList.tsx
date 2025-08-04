import React from "react";
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from "@portabletext/react";

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
};

export const PeopleList: React.FC<Props> = ({description, peopleList, type}) => {
    return (
        <>
            <h2 className='text-2xl text-titles mb-1.5'>
              {type}
            </h2>
            <div className='mb-10'>
              <PortableText value={description}/>
            </div>
            <div className='lg:grid-cols-4 grid grid-cols-2 gap-x-3.5 gap-y-8'>
              {peopleList.map((person, index) => (
                <div key={index + person.name} className='flex flex-col'>
                  <img className='flex rounded-lg w-full mb-5' src={person.imageURL} alt={`Image-speaker--${index + person.name}`} />
                  <h3 className='mb-2'>{person.name}</h3>
                  <span className='font-normal text-lg text-primary mb-2.5'>{person.position}</span>
                  <span>Organization
                    <br />
                    {person.organization}
                  </span>
                </div>
              ))}
            </div>
        </>
    )
}
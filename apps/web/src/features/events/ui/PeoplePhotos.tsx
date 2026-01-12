import type { RelatedContributorsType } from '@gcf/types';
import Image from 'next/image';

interface Props {
  people: RelatedContributorsType[];
}

export const PeoplePhotos: React.FC<Props> = ({ people }) => {
  const lgRowCount = Math.ceil(people.length / 10);
  const mbRowCount = Math.ceil(people.length / 5);

  return (
    <div
      className={`grid grid-cols-5 grid-rows-${mbRowCount} gap-2.5 lg:grid-cols-10 lg:grid-rows-${lgRowCount}`}
    >
      {people.map((person, index) => {
        const photoUrl = person.photo?.asset?.url;
        if (!photoUrl) return null;

        return (
          <Image
            key={person._id ?? `${index}`}
            className="flex h-15 w-17 rounded-md object-cover lg:h-23.25 lg:w-23.25"
            src={photoUrl}
            alt={person.name ? `Photo of ${person.name}` : 'Person photo'}
            width={93}
            height={93}
          />
        );
      })}
    </div>
  );
};

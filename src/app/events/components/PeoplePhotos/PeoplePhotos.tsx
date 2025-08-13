import { RelatedContributorsType } from '../../../../../utils/contributor-singleTypes';

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
      {people.map((person) => (
        <img
          key={person._id}
          className="flex h-[60px] w-[68px] rounded-md object-cover lg:h-[93px] lg:w-[93px]"
          src={person.photo?.asset.url}
          alt={`Image-person--${person.name}`}
        />
      ))}
    </div>
  );
};

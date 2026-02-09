import type { RelatedContributorsType } from "@gcf/types";
import Image from "next/image";

interface Props {
  people: RelatedContributorsType[];
}

export const PeoplePhotos: React.FC<Props> = ({ people }) => {
  const visiblePeople = people.slice(0, 30);

  return (
    <div className={["w-full", "grid grid-cols-5 gap-2.5", "lg:grid-cols-10"].join(" ")}>
      {visiblePeople.map((person, index) => {
        const photoUrl = person.photo?.asset?.url;
        if (!photoUrl) return null;

        // mobile pokazujemy tylko 10
        const hiddenOnMobile = index >= 10 ? "hidden lg:block" : "";

        return (
          <div
            key={person._id ?? `${index}`}
            className={[
              "relative aspect-square w-full overflow-hidden rounded-md",
              hiddenOnMobile,
            ].join(" ")}
          >
            <Image
              src={photoUrl}
              alt={person.name ? `Photo of ${person.name}` : "Person photo"}
              fill
              sizes="(max-width: 1023px) 20vw, 10vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

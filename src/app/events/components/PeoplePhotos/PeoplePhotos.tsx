interface Speaker {
    imageURL: string;
    name: string;
    position: string;
    organization: string;
}

interface Props {
    people: Speaker[];
};

export const PeoplePhotos: React.FC<Props> = ({people}) => {
    return (
        <div className="grid grid-cols-5 grid-rows-2 gap-2.5 lg:grid-cols-10 lg:grid-rows-3">
            {people.map((person, index) => (
                <img 
                    key={index + person.name} 
                    className="flex rounded-md w-full" 
                    src={person.imageURL} 
                    alt={`Image-person--${index} + ${person.name}`} 
                />
            ))}
        </div>
    )
};
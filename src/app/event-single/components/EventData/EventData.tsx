interface Props {
    data: string;
}

const months: { [key: number]: string } = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};

const EventData: React.FC<Props> = ({ data }) => {
    const date = new Date(data);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth() + 1];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return (
        <div className="flex flex-col">
          <span className="text-subtitles font-semibold text-2xl">{day} {month}, {year}</span>
          <span className="text-subtitles font-medium text-xl">{hours}:{minutes} hrs CET</span>
        </div>
    );
};

export default EventData;
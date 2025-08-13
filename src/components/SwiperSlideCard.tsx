import Image from 'next/image';
import { eventData } from '../../lib/event-date';
import ButtonPrimary from './ButtonPrimary';

interface Props {
  src: string;
  kind: string;
  data: string;
  title: string;
  buttonTitle: string;
}

export const SwiperSlideCard: React.FC<Props> = ({ src, kind, data, title, buttonTitle }) => {
  const formattedStartDate = eventData(data);

  return (
    <div className="flex max-w-[506px] flex-col">
      <Image
        src={src}
        alt="Home-image"
        width={506}
        height={325}
        style={{ objectFit: 'contain' }}
        className="mb-10 rounded-[10px]"
      />
      <div className="mb-6 flex justify-between">
        <span className="text-gray bg-background-beige flex rounded-[33px] px-5 py-2.5 text-xl/[142%] font-medium">
          {kind}
        </span>
        <span className="text-gray flex items-center text-xl/[142%] font-medium">
          {formattedStartDate}
        </span>
      </div>
      <h3 className="text-gray mb-[68px] text-3xl/[125%] font-semibold">{title}</h3>
      <ButtonPrimary width={310} href="" children={buttonTitle} />
    </div>
  );
};

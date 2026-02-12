import { formatEventDate } from "@features/events/lib/formatters";
import Image from "next/image";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

interface Props {
  src: string;
  kind: string;
  data: string;
  title: string;
  buttonTitle: string;
}

export function SwiperSlideCard({ src, kind, data, title, buttonTitle }: Props) {
  const formattedStartDate = formatEventDate(data);

  return (
    <div className="flex max-w-126.5 flex-col">
      <Image
        src={src}
        alt="Home-image"
        width={506}
        height={325}
        style={{ objectFit: "contain" }}
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
      <h3 className="text-gray mb-17 text-3xl/[125%] font-semibold">{title}</h3>
      <ButtonPrimary className="w-77.5" href="">
        {buttonTitle}
      </ButtonPrimary>
    </div>
  );
}

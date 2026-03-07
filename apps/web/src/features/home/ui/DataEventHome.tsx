import { paths } from "@/shared/config/paths";
import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

interface Props {
  title: string;
  buttonTitle: string;
  textDescription: string;
  gap: number;
}

export function DataEventHome({ title, buttonTitle, textDescription, gap }: Props) {
  return (
    <div className={`flex justify-between flex-wrap`} style={{ gap: `${gap}px` }}>
      <h2 className="whitespace-pre-line text-gray mb-0 w-full text-[40px]/[111%] font-semibold max-w-[520px]">
        {title}
      </h2>
      <div className="flex w-full max-w-[450px] flex-col gap-4">
        <ButtonPrimary className="!w-[310px]" href={paths.events}>
          {buttonTitle}
        </ButtonPrimary>
        <p className="text-gray text-1xl/[128%] font-normal">{textDescription}</p>
      </div>
    </div>
  );
}

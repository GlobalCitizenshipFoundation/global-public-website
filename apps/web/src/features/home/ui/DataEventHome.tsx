import { paths } from '@/shared/config/paths';
import ButtonPrimary from '@/shared/ui/ButtonPrimary';

interface Props {
  title: string;
  buttonTitle: string;
  textDescription: string;
  gap: number;
}

export const DataEventHome: React.FC<Props> = ({ title, buttonTitle, textDescription, gap }) => {
  return (
    <div className={`flex max-w-307.25 items-center`} style={{ gap: `${gap}px` }}>
      <h2 className="text-gray mb-0 w-full text-[80px]/[110%] font-semibold">{title}</h2>
      <div className="flex w-full flex-col gap-4">
        <ButtonPrimary className="w-[310px]" href={paths.events}>
          {buttonTitle}
        </ButtonPrimary>
        <p className="text-gray text-2xl/[128%] font-normal">{textDescription}</p>
      </div>
    </div>
  );
};

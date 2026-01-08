import ButtonPrimary from '../ButtonPrimary';

interface Props {
  title: string;
  buttonTitle: string;
  textDescription: string;
  gap: number;
}

export const DataEventHome: React.FC<Props> = ({ title, buttonTitle, textDescription, gap }) => {
  return (
    <div className={`flex max-w-[1229px] items-center`} style={{ gap: `${gap}px` }}>
      <h2 className="text-gray mb-0 w-full text-[80px]/[110%] font-semibold">{title}</h2>
      <div className="flex w-full flex-col gap-4">
        <ButtonPrimary width={310} href="/events">
          {buttonTitle}
        </ButtonPrimary>
        <p className="text-gray text-2xl/[128%] font-normal">{textDescription}</p>
      </div>
    </div>
  );
};

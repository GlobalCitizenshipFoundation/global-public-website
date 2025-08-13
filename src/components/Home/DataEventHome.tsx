import ButtonPrimary from "../ButtonPrimary"

interface Props {
    title: string;
    buttonTitle: string;
    textDescription: string;
    gap: number;
}

export const DataEventHome: React.FC<Props> = ({title, buttonTitle, textDescription, gap}) => {
    return (
        <div className={`flex items-center max-w-[1229px]`} style={{ gap: `${gap}px` }}>
            <h2 className='text-[80px]/[110%] text-gray font-semibold mb-0 w-full'>{title}</h2>
            <div className='flex flex-col gap-4 w-full'>
              <ButtonPrimary width={310} href='' children={buttonTitle}/>
              <p className='text-2xl/[128%] text-gray font-normal'>{textDescription}</p>
            </div>
        </div> 
    )
}
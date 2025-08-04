import React from "react";

interface Props {
    audienceLabels: any;
    audience: string[];
}

export const Tags: React.FC<Props> = ({ audienceLabels, audience }) => {
    return (
        <div className='flex flex-wrap gap-2.5'>
          {audience?.map((element, index) => (
            <div key={index + element} className='flex justify-center items-center py-2.5 px-4 border-1 rounded-4xl border-secondary-borders'>
              <span>{audienceLabels[element] ?? element}</span>
            </div> 
          ))}
        </div>
    )
}
import React from "react";
import { formatLabels } from "../../lib/format-tags";

interface Props {
    tags: string[];
}

export const Tags: React.FC<Props> = ({ tags }) => {
  const tagsLabels = formatLabels(tags);

  return (
      <div className='flex flex-wrap gap-2.5'>
        {tags?.map((tag, index) => (
          <div key={index + tag} className='flex justify-center items-center py-2.5 px-4 border-1 rounded-4xl border-secondary-borders'>
            <span>{tagsLabels[tag] ?? tag}</span>
          </div> 
        ))}
      </div>
  )
}
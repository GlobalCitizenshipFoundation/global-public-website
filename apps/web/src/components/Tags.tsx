import React from 'react';
import { formatLabels } from '../lib/format-tags';

interface Props {
  tags: string[];
}

export const Tags: React.FC<Props> = ({ tags }) => {
  const tagsLabels = formatLabels(tags);

  return (
    <div className="flex flex-wrap gap-2.5">
      {tags?.map((tag, index) => (
        <div
          key={index + tag}
          className="border-secondary-borders flex items-center justify-center rounded-4xl border-1 px-4 py-2.5"
        >
          <span>{tagsLabels[tag] ?? tag}</span>
        </div>
      ))}
    </div>
  );
};

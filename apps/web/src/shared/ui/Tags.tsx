import type { TagSingleType } from "@gcf/types";

interface Props {
  tags: TagSingleType[];
}

export function Tags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag, index) => (
        <div
          key={index + tag._id}
          className={[
            "group",
            "cursor-default select-none",
            "hover:bg-white",
            "border-secondary-borders flex items-center justify-center rounded-4xl border px-4 py-2.5",
            "transition-colors",
          ].join(" ")}
        >
          <span className="group-hover:text-primary transition-colors">{tag.title}</span>
        </div>
      ))}
    </div>
  );
}

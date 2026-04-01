import { formatLabels } from "@/shared/lib/strings";

interface Props {
  tags: string[];
}

export function Tags({ tags }: Props) {
  const tagsLabels = formatLabels(tags);

  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag, index) => (
        <div
          key={index + tag}
          className={[
            "group",
            "cursor-default select-none",
            "hover:bg-white",
            "border-secondary-borders flex items-center justify-center rounded-4xl border px-4 py-2.5",
            "transition-colors",
          ].join(" ")}
        >
          <span className="group-hover:text-primary transition-colors">
            {tagsLabels[tag] ?? tag}
          </span>
        </div>
      ))}
    </div>
  );
}

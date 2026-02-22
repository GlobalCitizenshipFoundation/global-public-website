import type { EventSingleType } from "@gcf/types";
import Link from "next/link";

import { cn } from "@/shared/lib/cn";
import { isValidHttpUrl } from "../../lib/isValidHttpUrl";

type ButtonData = {
  label: string;
  url: string;
};

type Props = {
  secondary?: EventSingleType["buttonSecondary"];
  tertiary?: EventSingleType["buttonTertiary"];
};

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function hasValidCta(value: unknown): value is ButtonData {
  if (!isObject(value)) return false;

  if (!("label" in value) || !("url" in value)) return false;

  const label = (value as { label: unknown }).label;
  const url = (value as { url: unknown }).url;

  return (
    typeof label === "string" &&
    label.trim().length > 0 &&
    typeof url === "string" &&
    isValidHttpUrl(url)
  );
}

export default function CtaButtons({ secondary, tertiary }: Props) {
  const buttons = [
    { variant: "secondary" as const, data: secondary },
    { variant: "tertiary" as const, data: tertiary },
  ].filter((x): x is { variant: "secondary" | "tertiary"; data: ButtonData } =>
    hasValidCta(x.data),
  );

  if (!buttons.length) return null;

  return (
    <div className="mb-11 flex w-full flex-col gap-4">
      {buttons.map(({ variant, data }, idx) => {
        const isFirst = idx === 0;

        return (
          <Link
            key={`${variant}-${data.url}`}
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex h-11 w-full items-center justify-center rounded-lg",
              "transition-all duration-300",
              isFirst ? "border border-gray bg-white hover:bg-primary" : "bg-gray hover:bg-primary",
            )}
          >
            <span
              className={cn(
                "text-base font-medium transition-colors duration-300",
                isFirst ? "text-black group-hover:text-white" : "text-white",
              )}
            >
              {data.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

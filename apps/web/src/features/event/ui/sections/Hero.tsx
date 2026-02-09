import React from "react";
import Image from "next/image";

type Props = {
  imageUrl: string | null;
  alt?: string | null;
};

export default function Hero({ imageUrl, alt }: Props) {
  const safeAlt = alt ?? "Event image";
  const hasImage = Boolean(imageUrl);

  return (
    <div className="mb-10">
      <div
        className={[
          "relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-dvw",
          "lg:static lg:right-auto lg:left-auto lg:mr-0 lg:ml-0 lg:w-full",
        ].join(" ")}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-none xl:rounded-[10px]">
          {/* Image layer */}
          <div className={hasImage ? "absolute inset-0" : "invisible absolute inset-0"}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={safeAlt}
                fill
                sizes="(max-width: 1200px) 100vw, 1050px"
                className="object-cover"
                priority
              />
            ) : null}
          </div>

          {/* Placeholder layer */}
          <div
            className={[
              "absolute inset-0 flex items-center justify-center border border-white/10 bg-black/25",
              hasImage ? "invisible" : "visible",
            ].join(" ")}
          >
            <span className="text-borders/80 text-sm font-medium">No image</span>
          </div>
        </div>
      </div>
    </div>
  );
}

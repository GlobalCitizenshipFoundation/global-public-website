"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProfileCardType } from "@gcf/types";
import { paths, path } from "@/shared/config/paths";
import { useState } from "react";
import { cn } from "@/shared/lib/cn";

type FrameProps = {
  profile: ProfileCardType;
};

export const ProfileCard: React.FC<FrameProps> = ({ profile }) => {
  const [hover, setHover] = useState(false);
  const slug = profile.slug?.current;
  const photoUrl = profile.photo?.asset?.url;

  function getHref(slug: string | undefined) {
    if (profile.member === "contributor") {
      return slug ? path.contributor(slug) : paths.contributors;
    }

    return slug ? path.teamMember(slug) : paths.teamMembers;
  }

  const name = profile.name ?? "";
  const role = profile.designation ?? "";

  const socialMedia = [
    {
      title: "youtube",
      href: "youtube.com",
      img: "/images/youtube.svg",
    },
    {
      title: "instagramm",
      href: "/",
      img: "/images/insta.svg",
    },
    {
      title: "linkedin",
      href: "/",
      img: "/images/linkedin.svg",
    },
    {
      title: "x",
      href: "/",
      img: "/images/x.svg",
    },
  ];

  const openMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHover(!hover);
  };

  return (
    <div className="relative w-full flex flex-col max-w-85">
      <Link
        href={getHref(slug)}
        className={cn(
          "overflow-hidden bg-[#DFDFDF] h-full flex flex-col rounded-[12px] w-full transition duration-300",
          { "bg-[#BDBDBD]": hover },
        )}
      >
        <div className="relative h-80 max-[768px]:h-65">
          <Image
            src={photoUrl || ""}
            alt={name || "Person"}
            fill
            className="absolute object-cover rounded-[12px]"
          />
          <div
            className={cn(
              "opacity-0 transition duration-300 w-50 h-50 bottom-0 -left-10 absolute bg-[radial-gradient(circle,_rgba(7,177,147,0.9)_0%,_rgba(7,177,147,0.5)_40%,_transparent_80%)]",
              { "opacity-80": hover },
            )}
          ></div>
        </div>
        <div className="px-4 py-6 flex-1 flex flex-col justify-end">
          <h3 className={cn("text-black pb-2 transition duration-300", { "text-white": hover })}>
            {name}
          </h3>
          <p className={cn("text-black transition duration-300", { "text-white": hover })}>
            {role}
          </p>
        </div>
      </Link>

      <div
        onClick={(event) => openMenu(event)}
        className="absolute top-75 max-[768px]:top-60 right-5"
      >
        <div
          className={cn(
            "absolute bottom-12 flex translate-y-2 gap-2 flex-col opacity-0 transition duration-300 pointer-events-none",
            {
              ["opacity-100 pointer-events-auto translate-y-0"]: hover,
            },
          )}
        >
          {socialMedia.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.title}
                className="rounded-full w-10 h-10 bg-[#BDBDBD] shadow-[0_6px_15px_rgba(0,0,0,0.7)]"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width="40"
                  height="40"
                  className="object-cover rounded-full"
                />
              </Link>
            );
          })}
        </div>
        <div
          className={cn(
            "cursor-pointer relative rounded-full w-10 h-10 bg-black transition duration-300 hover:bg-[#3DB4A0]",
            {
              ["bg-[#3DB4A0] rotate-45"]: hover,
            },
          )}
        >
          <span className="rounded-full absolute w-5 h-0.5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
          <span className="rounded-full absolute w-0.5 h-5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        </div>
      </div>
    </div>
  );
};

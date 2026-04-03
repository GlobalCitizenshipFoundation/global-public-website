"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProfileCardType } from "@gcf/types";
import type { IconType } from "react-icons";
import { paths, path } from "@/shared/config/paths";
import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

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

  const socialLinks = [
    {
      type: "facebook",
      url: profile.facebook,
      img: FaFacebook,
    },
    {
      type: "instagram",
      url: profile.instagram,
      img: FaInstagram,
    },
    {
      type: "linkedin",
      url: profile.linkedin,
      img: FaLinkedin,
    },
    {
      type: "twitter",
      url: profile.twitter,
      img: FaXTwitter,
    },
    {
      type: "website",
      url: profile.website,
      img: FaGlobe,
    },
  ].filter(
    (link): link is { type: string; url: string; img: IconType } => typeof link.url === "string",
  );

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

      {socialLinks && socialLinks.length > 0 ? (
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
            {socialLinks.map((item) => {
              const Icon = item.img;

              return (
                <Link
                  href={item.url}
                  key={item.type}
                  className="flex items-center justify-center rounded-full w-10 h-10 bg-[#BDBDBD] shadow-[0_6px_15px_rgba(0,0,0,0.7)]"
                >
                  <Icon size={20} color="#000" />
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
      ) : null}
    </div>
  );
};

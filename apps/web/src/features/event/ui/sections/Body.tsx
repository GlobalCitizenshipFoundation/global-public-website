import React from "react";
import { PortableText } from "@portabletext/react";
import type { EventSingleType } from "@gcf/types";

import SectionHeading from "../components/SectionHeading";
import { createPortableTextComponents } from "../../lib/portableTextComponents";

type Props = {
  heading: string;
  value: NonNullable<EventSingleType["body"]>;
};

export default function Body({ heading, value }: Props) {
  return (
    <section className="mb-11 text-sm lg:text-2xl">
      <SectionHeading>{heading}</SectionHeading>
      <PortableText value={value} components={createPortableTextComponents()} />
    </section>
  );
}

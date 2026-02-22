import type { EventSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import { createPortableTextComponents } from "../../lib/portableTextComponents";
import SectionHeading from "../components/SectionHeading";

type Props = {
  heading: string;
  value: NonNullable<EventSingleType["introText"]>;
};

export default function Intro({ heading, value }: Props) {
  return (
    <section className="py-9.25">
      <SectionHeading>{heading}</SectionHeading>
      <PortableText value={value} components={createPortableTextComponents()} />
    </section>
  );
}

import type { EventPartnerGroup, EventSingleType } from "@gcf/types";
import { PortableText } from "@portabletext/react";
import { PARTNER_LABEL } from "../../lib/constants";
import { createPortableTextComponents } from "../../lib/portableTextComponents";
import SectionHeading from "../components/SectionHeading";
import { ConferencePartners } from "./ConferencePartners";

type Props = {
  heading: string;
  text?: EventSingleType["partnersText"];
  groups: EventPartnerGroup[];
};

export default function PartnersSection({ heading, text, groups }: Props) {
  const show = groups.length > 0 || Boolean(text?.length);
  if (!show) return null;

  return (
    <section className="flex flex-col lg:mb-18 lg:gap-15">
      <div className="flex flex-col">
        <SectionHeading>{heading}</SectionHeading>
        {text?.length ? (
          <PortableText value={text} components={createPortableTextComponents()} />
        ) : null}
      </div>

      {groups.length ? (
        <div className="flex flex-col gap-[clamp(28px,4vw,60px)]">
          {groups.map((g) => (
            <ConferencePartners key={g._key} title={PARTNER_LABEL[g.type]} partners={g.items} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

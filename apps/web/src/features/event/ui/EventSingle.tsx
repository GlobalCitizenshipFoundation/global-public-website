import React from "react";
import { PortableText } from "@portabletext/react";

import { Tags } from "@/shared/ui/Tags";

import type { EventSingleType } from "@gcf/types";

import { PeoplePhotos } from "./sections/PeoplePhotos";
import { PanelDiscussion } from "./sections/PanelDiscussion";

import { buildEventSingleVM } from "../model/buildEventSingleVM";

import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Video from "./sections/Video";
import Body from "./sections/Body";
import Agenda from "./sections/Agenda";
import PeopleSection from "./sections/PeopleSection";
import PartnersSection from "./sections/PartnersSection";
import ShareSection from "./sections/ShareSection";
import TopicsSection from "./sections/TopicsSection";

import SectionHeading from "./components/SectionHeading";
import CtaButtons from "./components/CtaButtons";

import { createPortableTextComponents } from "../lib/portableTextComponents";
import Container from "@/shared/ui/Container";

type Props = { event: EventSingleType };

const EventSingle: React.FC<Props> = ({ event }) => {
  if (!event) return <p>Event not found.</p>;

  const vm = buildEventSingleVM(event);

  const renderPanel = () => {
    if (event.pricing === "paid") {
      if (!event.price) {
        return (
          <div className="rounded-xl border border-white/10 bg-black/20 p-5 text-sm text-white/80">
            This event is marked as paid, but price is missing in CMS.
          </div>
        );
      }
      return <PanelDiscussion {...vm.panelBase} pricing="paid" price={event.price} />;
    }

    return <PanelDiscussion {...vm.panelBase} pricing={event.pricing} />;
  };

  return (
    <section className="bg-background-primary overflow-x-hidden">
      <Container variant="big">
        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(460px,500px)] lg:items-start">
          <div className="min-w-0">
            <Hero imageUrl={vm.hero.imageUrl} alt={vm.hero.alt} />

            <PeoplePhotos people={vm.combinedParticipants} />

            {vm.show.intro ? <Intro heading={vm.headings.intro} value={event.introText!} /> : null}

            <section className="lg:hidden">{renderPanel()}</section>

            {vm.show.video ? (
              <Video
                heading={vm.headings.video}
                url={event.videoLink!}
                title={event.eventHeading ?? "Intro"}
              />
            ) : null}

            {vm.show.body ? <Body heading={vm.headings.body} value={event.body!} /> : null}

            {vm.show.audience ? (
              <section className="lg:border-lines mb-11 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:border-y-[1.5px] lg:py-4.5">
                <h2 className="text-titles mb-0 text-2xl">Who is this event for:</h2>
                <Tags tags={vm.audience} />
              </section>
            ) : null}

            {vm.show.agenda ? (
              <Agenda
                heading={vm.headings.agenda}
                description={event.agendaDescription}
                agenda={event.agenda}
              />
            ) : null}

            <PeopleSection
              heading={vm.headings.speakers}
              text={event.speakersText}
              people={vm.speakers}
            />
            <PeopleSection
              heading={vm.headings.steering}
              text={event.steeringCommitteeText}
              people={vm.steering}
            />

            <PartnersSection
              heading={vm.headings.partners}
              text={event.partnersText}
              groups={vm.partnerGroups}
            />

            {vm.show.registration ? (
              <section className="mb-11 flex flex-col gap-3">
                <SectionHeading>{vm.headings.registration}</SectionHeading>
                <PortableText
                  value={event.registrationText!}
                  components={createPortableTextComponents()}
                />
              </section>
            ) : null}

            <div className="lg:hidden">
              <ShareSection socialLinks={vm.socialLinks} variant="mobile" />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[clamp(16px,2vw,28px)]">
              {renderPanel()}

              <div className="px-9">
                <CtaButtons secondary={event.buttonSecondary} tertiary={event.buttonTertiary} />
              </div>

              <ShareSection socialLinks={vm.socialLinks} variant="desktop" />
            </div>
          </aside>
        </div>
      </Container>

      {vm.show.topics ? <TopicsSection topics={event.topics!} /> : null}
    </section>
  );
};

export default EventSingle;

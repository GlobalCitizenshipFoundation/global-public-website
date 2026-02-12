import type { EventSingleType } from "@gcf/types";
import { Container } from "@/shared/ui/Container";
import { Tags } from "@/shared/ui/Tags";

type Props = {
  topics: NonNullable<EventSingleType["topics"]>;
};

export default function TopicsSection({ topics }: Props) {
  return (
    <section className="bg-background-darker mx-0 mt-6 px-0 py-10 lg:py-19.5">
      <Container>
        <h2 className="text-titles mb-2.5 text-2xl lg:mb-5 lg:text-[42px]">Topics</h2>
        <Tags tags={topics} />
      </Container>
    </section>
  );
}

import EventsToolbar from "./components/EventsToolbar";
import EventsGrid from "./components/EventsGrid";
import EventsPagination from "./components/EventsPagination";
import type { EventCard } from "@gcf/types";
import Container from "@/shared/ui/Container";

type Props = {
  title?: string;
  items: EventCard[];
  total: number;
  page: number;
  perPage: number;
};

export default function EventsListPage({
  title = "All Events",
  items,
  total,
  page,
  perPage,
}: Props) {
  return (
    <div className="bg-background-darker py-16 md:py-24">
      <Container>
        <EventsToolbar title={title} />
        <EventsGrid items={items} />
        <EventsPagination page={page} total={total} perPage={perPage} />
      </Container>
    </div>
  );
}

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
    <div className="bg-background-darker pt-29 pb-33">
      <Container>
        <div className="flex flex-col gap-[60px]">
          <EventsToolbar title={title} />
          <EventsGrid items={items} />
          <EventsPagination page={page} total={total} perPage={perPage} />
        </div>
      </Container>
    </div>
  );
}

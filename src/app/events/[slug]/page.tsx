import { notFound } from "next/navigation"
import { getEventBySlug } from "../../../../lib/events-fetch";
import { getContributors } from "../../../../lib/contributors-fetch";
import EventSingleComponent from "../components/EventSingleComponent";

export const dynamic = 'force-dynamic';

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return notFound();
  return <EventSingleComponent event={event} />;
}

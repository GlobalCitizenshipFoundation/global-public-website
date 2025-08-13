import { notFound } from 'next/navigation';
import { getContributorBySlug } from '../../../../lib/contributors-fetch';
import PartnerSingleComponent from '../components/PartnerSingleComponent';
import { getPartnerBySlug } from '../../../../lib/partners-fetch';

export const dynamic = 'force-dynamic';

export default async function PartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);
  if (!partner) return notFound();
  return <PartnerSingleComponent partner={partner} />;
}

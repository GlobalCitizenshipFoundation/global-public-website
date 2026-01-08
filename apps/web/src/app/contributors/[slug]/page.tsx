import { notFound } from 'next/navigation';
import { getContributorBySlug } from '../../../lib/contributors-fetch';
import ContributorSingleComponent from '../components/ContributorSingleComponent';

export const dynamic = 'force-dynamic';

export default async function ContributorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contributor = await getContributorBySlug(slug);
  if (!contributor) return notFound();
  return <ContributorSingleComponent contributor={contributor} />;
}

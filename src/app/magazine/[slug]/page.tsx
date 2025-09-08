import { notFound } from 'next/navigation';
import { getMagazinBySlug } from '../../../../lib/magazinSingle-fetch';
import MagazineSingleComponent from '../components/MagazineSingleComponent';

export const dynamic = 'force-dynamic';

export default async function MagazinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const magazine = await getMagazinBySlug(slug);
  if (!magazine) return notFound();
  return <MagazineSingleComponent magazine={magazine} />;
}

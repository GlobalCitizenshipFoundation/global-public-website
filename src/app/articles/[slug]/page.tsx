import { notFound } from 'next/navigation';
import ArticleSingleComponent from '../components/ArticleSingleComponent';
import { getArticleBySlug } from '../../../../lib/article-fetch';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return notFound();
  return <ArticleSingleComponent article={article} />;
}
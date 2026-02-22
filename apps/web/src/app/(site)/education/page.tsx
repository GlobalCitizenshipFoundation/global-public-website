import { getArticles } from "@features/education/api/getArticles";
import type { Metadata } from "next";

import ArticleListPage from "@/features/education/ui/ArticleListPage";
import { socialPlatforms } from "@/shared/config/social";

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function parseEducationSearchParams(sp: { page?: string }) {
  const pageNum = Number(sp.page);
  const page = Number.isFinite(pageNum) && pageNum > 1 ? Math.floor(pageNum) : 1;
  return { page };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const { page } = parseEducationSearchParams(sp);

  return {
    title: page > 1 ? `Education - Page ${page}` : "Education",
  };
}

export default async function EducationPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { page } = parseEducationSearchParams(sp);

  const perPage = 8;

  const { items, total } = await getArticles({ page, perPage });

  return (
    <ArticleListPage
      page={page}
      perPage={perPage}
      total={total}
      items={items}
      socials={socialPlatforms}
    />
  );
}

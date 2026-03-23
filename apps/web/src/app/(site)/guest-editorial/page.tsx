import { getArticles } from "@features/education/api/getArticles";
import { getCategories } from "@features/guest-editorial/api/getCategories";
import type { Metadata } from "next";
import { Container } from "@/shared/ui/Container";
import ArticleList from "@/features/guest-editorial/ui/ArticleList";

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

function getCategoryPage(sp: Record<string, string>, categoryId: string): number {
  const key = `page_${categoryId}`;
  const pageNum = Number(sp[key]);
  return Number.isFinite(pageNum) && pageNum > 1 ? Math.floor(pageNum) : 1;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const { page } = parseEducationSearchParams(sp);
  return {
    title: page > 1 ? `Guest Editorial - Page ${page}` : "Guest Editiorial",
  };
}

export default async function GuestEditorial({ searchParams }: PageProps) {
  const sp = await searchParams;
  const perPage = 8;

  const categories = await getCategories();

  const categoriesWithItems = await Promise.all(
    categories.map(async (cat) => {
      const page = getCategoryPage(sp as Record<string, string>, cat._id);
      const { items, total } = await getArticles({
        page,
        perPage,
        categoryId: cat._id,
      });
      return { cat, items, total, page };
    }),
  );

  return (
    <div className="mt-18 mb-36">
      <Container variant="big">
        {categoriesWithItems.map(({ cat, items, total, page }) => (
          <section key={cat._id} className="mb-10">
            <h3 className="mb-3.5 text-[42px] font-semibold">{cat.name}</h3>
            {cat.description && <p className="mb-3.5">{cat.description}</p>}
            <ArticleList
              page={page}
              perPage={perPage}
              total={total}
              items={items}
              categoryId={cat._id}
            />
          </section>
        ))}
      </Container>
    </div>
  );
}

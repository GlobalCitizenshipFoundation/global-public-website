import Pagination from "@/features/events/ui/pagination/Pagination";

type Props = {
  page: number;
  total: number;
  perPage: number;
  categoryId?: string;
};

export default function EducationPagination({ page, total, perPage, categoryId }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;

  const pageParamKey = categoryId ? `page_${categoryId}` : "page";

  return <Pagination page={page} totalPages={totalPages} pageParamKey={pageParamKey} />;
}

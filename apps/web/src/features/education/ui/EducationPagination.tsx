import Pagination from "@/features/events/ui/pagination/Pagination";

type Props = {
  page: number;
  total: number;
  perPage: number;
};

export default function EducationPagination({ page, total, perPage }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;

  return <Pagination page={page} totalPages={totalPages} />;
}

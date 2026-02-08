import Pagination from '../pagination/Pagination';

type Props = {
  page: number;
  total: number;
  perPage: number;
};

export default function EventsPagination({ page, total, perPage }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;
  return <Pagination page={page} totalPages={totalPages} />;
}

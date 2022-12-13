import { usePagination } from "../hooks/usePagination";

export default function Pagination(props: any) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    // if the current page is the last page go back to the first page
    if (currentPage === paginationRange[paginationRange.length - 1]) {
      onPageChange(1);
    } else {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <button
      onClick={() => onNext()}
      className="mx-auto text-center text-gray-600 bg-gray-100 px-4 py-2 rounded-md shadow text-xl"
    >
      Voir plus
    </button>
  );
}

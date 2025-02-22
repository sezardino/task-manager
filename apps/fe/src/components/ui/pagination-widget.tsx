import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationProps,
} from "@/components/ui/pagination";

type PaginationWidgetProps = PaginationProps & {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export const PaginationWidget = (props: PaginationWidgetProps) => {
  const { page, totalPages, onPageChange, ...rest } = props;

  const renderPages = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === page}
              disabled={i === page}
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === page - delta - 1 || i === page + delta + 1) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination {...rest}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => onPageChange(Math.max(page - 1, 1))}
          />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext
            disabled={page === totalPages}
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

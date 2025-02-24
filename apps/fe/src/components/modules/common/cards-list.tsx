import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/shadcn";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface ListItem {
  id: string;
}

export interface CardsListProps<T extends ListItem>
  extends ComponentPropsWithoutRef<"div"> {
  items: T[];
  selectedItemId?: number | string;
  render: (item: T) => ReactNode;
  isLoading: boolean;
  emptyState: ReactNode;
}

export const CardsList = <T extends ListItem>(props: CardsListProps<T>) => {
  const { isLoading, emptyState, items, render, className, ...rest } = props;

  const isEmptyStateShowed = !isLoading && items.length == 0;

  return (
    <div
      {...rest}
      className={cn(
        "min-h-80",
        isEmptyStateShowed && "flex items-center justify-center",
        className
      )}
    >
      {(!!items.length || isLoading) && (
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {!isLoading &&
            items.map((item) => <li key={item.id}>{render({ ...item })}</li>)}
          {isLoading && (
            <>
              {new Array(3).fill(null).map((_, index) => (
                <li key={index}>
                  <Skeleton className="w-full h-60" />
                </li>
              ))}
            </>
          )}
        </ul>
      )}

      {isEmptyStateShowed && !isLoading && emptyState}
    </div>
  );
};

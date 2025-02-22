import { Spinner } from "@/components/ui/spinner";
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

  const hasItems = !isLoading && !!items.length;

  return (
    <div
      {...rest}
      className={cn(
        "min-h-80",
        !hasItems && "flex items-center justify-center",
        className
      )}
    >
      {isLoading && <Spinner className="mx-auto mt-10" />}

      {hasItems && (
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => (
            <li key={item.id}>{render({ ...item })}</li>
          ))}
        </ul>
      )}

      {!hasItems && emptyState}
    </div>
  );
};

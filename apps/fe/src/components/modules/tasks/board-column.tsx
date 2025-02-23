import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TASK_STATUSES_COPY } from "@/const/task-statuses-copy";
import { TaskStatus } from "@/types/enums";
import { cn } from "@/utils/shadcn";
import { PlusCircle } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

export type BoardColumnProps = ComponentPropsWithoutRef<"div"> & {
  status: TaskStatus;
  onAddTaskClick: () => void;
};

export const BoardColumn = (props: BoardColumnProps) => {
  const { status, onAddTaskClick, className, children, ...rest } = props;

  return (
    <Card {...rest} className={cn("pb-2 pt-4 h-full flex flex-col", className)}>
      <CardHeader className="px-4 flex flex-row items-center justify-between">
        <CardTitle>{TASK_STATUSES_COPY[status]}</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} onClick={onAddTaskClick}>
              <PlusCircle />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add task</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="px-2 h-full overflow-auto">
        {children}
      </CardContent>
      <CardFooter className="mt-auto px-2 py-2">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full"
          onClick={onAddTaskClick}
        >
          <PlusCircle className="mr-2" /> Add task
        </Button>
      </CardFooter>
    </Card>
  );
};

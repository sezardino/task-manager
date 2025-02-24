import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserData } from "@/components/ui/user-data";
import { TASK_STATUSES_COPY } from "@/const/task-statuses-copy";
import { UserEntity } from "@/types/entity";
import { TaskStatus } from "@/types/enums";
import { getNextPrevTaskStatus } from "@/utils/gen-next-prev-task-status";
import { cn } from "@/utils/shadcn";
import { MoreVertical } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

export type TaskCardProps = ComponentPropsWithoutRef<"div"> & {
  assignee: Pick<UserEntity, "email" | "firstName" | "lastName">;
  title: string;
  status: TaskStatus;
  onChangeStatus: (status: TaskStatus) => void;
  href: string;
  onUpdateTask: () => void;
};

export const TaskCard = (props: TaskCardProps) => {
  const {
    href,
    assignee,
    title,
    status,
    onChangeStatus,
    onUpdateTask,
    className,
    ...rest
  } = props;

  const { nextStatus, prevStatus } = getNextPrevTaskStatus(status);

  return (
    <Card {...rest} className={cn("p-4 gap-2", className)}>
      <CardHeader className="p-0 flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-md">{title}</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant="outline">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="sr-only">
              Task actions
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to={href}>Show task details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onUpdateTask}>Edit</DropdownMenuItem>
            {prevStatus && (
              <DropdownMenuItem onClick={() => onChangeStatus(prevStatus)}>
                Back to
                <span className="font-bold">
                  {TASK_STATUSES_COPY[prevStatus]}
                </span>
              </DropdownMenuItem>
            )}
            {nextStatus && (
              <DropdownMenuItem onClick={() => onChangeStatus(nextStatus)}>
                Change to
                <span className="font-bold">
                  {TASK_STATUSES_COPY[nextStatus]}
                </span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardFooter className="p-0">
        <UserData
          email={assignee.email}
          firstName={assignee.firstName}
          lastName={assignee.firstName}
        />
      </CardFooter>
    </Card>
  );
};

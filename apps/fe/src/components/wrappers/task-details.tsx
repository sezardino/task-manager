import { useProjectTaskQuery } from "@/hooks/tanstack/query/task/one";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { UserData } from "../ui/user-data";

export type TaskDetailsWrapperProps = {
  projectId: string;
  organizationId: string;
  taskId: string | null;
  onClose: () => void;
};

export const TaskDetailsWrapper = (props: TaskDetailsWrapperProps) => {
  const { projectId, organizationId, onClose, taskId } = props;

  const { data } = useProjectTaskQuery({
    id: taskId!,
    organizationId,
    projectId,
  });

  if (!data) return null;

  return (
    <Dialog open={!!data} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            readOnly
            rows={10}
            defaultValue={
              data.description ? data.description : "Description not provided"
            }
            className="resize-none"
          />

          <div>
            <p>Assignee:</p>
            <UserData
              email={data.assignee.email}
              firstName={data.assignee.firstName}
              lastName={data.assignee.lastName}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={"sm"} variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

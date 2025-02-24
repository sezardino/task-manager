import { TASK_STATUSES_ORDER } from "@/const/task-statuses-order";
import { TaskStatus } from "@/types/enums";

export const getNextPrevTaskStatus = (
  status: TaskStatus
): { nextStatus: TaskStatus | null; prevStatus: TaskStatus | null } => {
  const index = TASK_STATUSES_ORDER.indexOf(status);

  if (index === -1) return { nextStatus: null, prevStatus: null };

  const prevStatus = index > 0 ? TASK_STATUSES_ORDER[index - 1] : null;

  const nextStatus =
    index < TASK_STATUSES_ORDER.length - 1
      ? TASK_STATUSES_ORDER[index + 1]
      : null;

  return { prevStatus, nextStatus };
};

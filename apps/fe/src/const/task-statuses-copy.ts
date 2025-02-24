import { TaskStatus } from "@/types/enums";

export const TASK_STATUSES_COPY: Record<TaskStatus, string> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In progress",
  IN_REVIEW: "In Review",
  COMPLETED: "Completed",
};

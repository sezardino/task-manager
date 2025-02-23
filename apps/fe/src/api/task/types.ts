import { TaskEntity } from "@/types/entity";
import { TaskStatus } from "@/types/enums";
import { GQLPayload } from "@/types/gql";

export type CreateTaskInput = {
  title: string;
  description?: string;
  assigneeId: string;
  projectId: string;
  organizationId: string;
};

export type CreateTaskPayload = GQLPayload<{
  createTask: Pick<TaskEntity, "id" | "title">;
}>;

export type ProjectTasksInput = {
  organizationId: string;
  projectId: string;
};

export type ProjectTasksPayload = GQLPayload<{
  tasks: TaskEntity[];
}>;

export type ProjectTaskInput = {
  id: string;
  projectId: string;
  organizationId: string;
};

export type ProjectTaskPayload = GQLPayload<{
  task: TaskEntity;
}>;

export type UpdateTaskInput = {
  id: string;
  title?: string;
  description?: string;
  assigneeId?: string;
  status?: TaskStatus;
};

export type UpdateTaskPayload = GQLPayload<{
  updateTask: TaskEntity;
}>;

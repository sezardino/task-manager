import { fetchGQL } from "@/utils/fetch-gql";
import {
  CREATE_TASK_QUERY,
  PROJECT_TASK_QUERY,
  PROJECT_TASKS_QUERY,
  UPDATE_TASK_QUERY,
} from "./queries";
import {
  CreateTaskInput,
  CreateTaskPayload,
  ProjectTaskInput,
  ProjectTaskPayload,
  ProjectTasksInput,
  ProjectTasksPayload,
  UpdateTaskInput,
  UpdateTaskPayload,
} from "./types";

export class TaskApiService {
  static create(input: CreateTaskInput) {
    return fetchGQL<CreateTaskPayload>({
      query: CREATE_TASK_QUERY,
      variables: { input },
    }).then((r) => r.data.data.createTask);
  }

  static one(input: ProjectTaskInput) {
    return fetchGQL<ProjectTaskPayload>({
      query: PROJECT_TASK_QUERY,
      variables: { input },
    }).then((r) => r.data.data.task);
  }

  static list(input: ProjectTasksInput) {
    return fetchGQL<ProjectTasksPayload>({
      query: PROJECT_TASKS_QUERY,
      variables: { input },
    }).then((r) => r.data.data.tasks);
  }

  static update(input: UpdateTaskInput) {
    return fetchGQL<UpdateTaskPayload>({
      query: UPDATE_TASK_QUERY,
      variables: { input },
    }).then((r) => r.data.data.updateTask);
  }
}

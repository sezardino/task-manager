import { TaskStatus } from "./enums";

export type UserEntity = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

export type OrganizationEntity = {
  id: string;
  name: string;
  membersCount: number;
};

export type ProjectEntity = {
  id: string;
  name: string;
  description: string;
  owner: Pick<UserEntity, "email" | "firstName" | "lastName">;
  membersCount: number;
};

export type TaskEntity = {
  assignee: Pick<UserEntity, "email" | "firstName" | "lastName">;
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
};

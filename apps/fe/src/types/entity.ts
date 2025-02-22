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

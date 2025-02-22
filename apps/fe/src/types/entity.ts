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

import { GQLPayload } from "@/types/gql";

export enum UserRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
  MODERATOR = "MODERATOR",
}

export type CurrentUserPayload = GQLPayload<{
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}>;

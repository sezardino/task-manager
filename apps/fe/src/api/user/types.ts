import { UserRole } from "@/types/enums";
import { GQLPayload } from "@/types/gql";

export type CurrentUserPayload = GQLPayload<{
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}>;

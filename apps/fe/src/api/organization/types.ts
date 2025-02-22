import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type CreateOrganizationPayload = GQLPayload<{
  createOrganization: {
    id: string;
  };
}>;

export type CreateOrganizationInput = {
  name: string;
};

export type OrganizationsListPayload = GQLPayload<
  PaginationPayload & {
    organizations: {
      organizations: {
        id: string;
        name: string;
        membersCount: number;
        owner: {
          email: string;
          firstName: string;
          lastName: string;
        };
      }[];
    };
  }
>;

export type OrganizationsListInput = PaginationInput;

export type OneOrganizationPayload = GQLPayload<{
  organization: {
    id: string;
    name: string;
    membersCount: number;
    owner: {
      email: string;
      firstName: string;
      lastName: string;
    };
  };
}>;

export type OneOrganizationInput = {
  name: string;
};

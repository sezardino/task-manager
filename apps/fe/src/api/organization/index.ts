import { fetchGQL } from "@/utils/fetch-gql";
import {
  CREATE_ORGANIZATION_MUTATION_QUERY,
  ORGANIZATIONS_LIST_QUERY,
} from "./queries";
import {
  CreateOrganizationInput,
  CreateOrganizationPayload,
  OneOrganizationInput,
  OneOrganizationPayload,
  OrganizationsListInput,
  OrganizationsListPayload,
} from "./types";

export class OrganizationApiService {
  static create(input: CreateOrganizationInput) {
    return fetchGQL<CreateOrganizationPayload>({
      query: CREATE_ORGANIZATION_MUTATION_QUERY,
      variables: { input },
    }).then((res) => res.data.data.createOrganization);
  }

  static list(input: OrganizationsListInput) {
    return fetchGQL<OrganizationsListPayload>({
      query: ORGANIZATIONS_LIST_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizations);
  }

  static one(input: OneOrganizationInput) {
    return fetchGQL<OneOrganizationPayload>({
      query: CREATE_ORGANIZATION_MUTATION_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organization);
  }
}

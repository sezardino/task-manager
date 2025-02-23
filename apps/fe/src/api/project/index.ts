import { fetchGQL } from "@/utils/fetch-gql";
import {
  CREATE_PROJECT_QUERY,
  ORGANIZATION_PROJECT_QUERY,
  ORGANIZATION_PROJECTS_QUERY,
} from "./queries";
import {
  CreateProjectInput,
  CreateProjectPayload,
  OrganizationProjectInput,
  OrganizationProjectPayload,
  OrganizationProjectsInput,
  OrganizationProjectsPayload,
} from "./types";

export class ProjectApiService {
  static create(input: CreateProjectInput) {
    return fetchGQL<CreateProjectPayload>({
      query: CREATE_PROJECT_QUERY,
      variables: { input },
    }).then((r) => r.data.data.createProject);
  }

  static list(input: OrganizationProjectsInput) {
    return fetchGQL<OrganizationProjectsPayload>({
      query: ORGANIZATION_PROJECTS_QUERY,
      variables: { input },
    }).then((r) => r.data.data.projects);
  }

  static one(input: OrganizationProjectInput) {
    return fetchGQL<OrganizationProjectPayload>({
      query: ORGANIZATION_PROJECT_QUERY,
      variables: { input },
    }).then((r) => r.data.data.project);
  }
}

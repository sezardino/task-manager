import { fetchGQL } from "@/utils/fetch-gql";
import {
  ADD_MEMBERS_TO_PROJECT_QUERY,
  CREATE_PROJECT_QUERY,
  ORGANIZATION_PROJECT_QUERY,
  ORGANIZATION_PROJECTS_QUERY,
} from "./queries";
import {
  AddMembersToProjectInput,
  AddMembersToProjectPayload,
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

  static addMembers(input: AddMembersToProjectInput) {
    return fetchGQL<AddMembersToProjectPayload>({
      query: ADD_MEMBERS_TO_PROJECT_QUERY,
      variables: { input },
    }).then((r) => r.data.data.addMembersToProject);
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

export const CREATE_PROJECT_QUERY = `
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
  }
}
`;

export const ORGANIZATION_PROJECTS_QUERY = `
query OrganizationProjects($input: AllProjectsInput!) {
  projects(input: $input) {
    meta {
      page
      totalCount
      totalPages
      limit
    }
    projects {
      id
      name
      description
      owner {
        email
        firstName
        lastName
      }
    }
  }
}`;

export const ORGANIZATION_PROJECT_QUERY = `
query OrganizationProject($input: OneProjectInput!) {
  project(input: $input) {
    id
    name
    description
  }
}`;

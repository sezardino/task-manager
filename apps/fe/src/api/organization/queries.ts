export const CREATE_ORGANIZATION_MUTATION_QUERY = `
mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
  }
}
`;

export const ORGANIZATIONS_LIST_QUERY = `
query Organizations($input: OrganizationsListInput!) {
  organizations(input: $input) {
    meta {
      page
      totalCount
      totalPages
      limit
    }
    organizations {
      id
      name
      membersCount
      owner {
        email
        firstName
        lastName
      }
    }
  }
}
`;

export const ORGANIZATION_QUERY = `
query Organizations($input: OneOrganizationInput!) {
  organization(input: $input) {
    id
    name
    membersCount
    owner {
      email
      firstName
      lastName
    }
  }
}
`;

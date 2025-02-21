export const ORGANIZATION_MEMBERS_QUERY = `
query OrganizationMembers($input: OrganizationMembersInput) {
  organizationMembers(input: $input) {
    meta {
      totalCount
      page
      limit
      totalPages
    }
    members {
      id
      email
      firstName
      lastName
      role
    }
  }
}
`;

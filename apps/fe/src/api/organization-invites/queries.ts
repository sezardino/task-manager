export const INVITE_USER_QUERY = `
mutation InviteUser($input: CreateOrganizationInviteInput!) {
  createOrganizationInvite(input: $input) {
    token
  }
}
`;

export const ORGANIZATION_INVITES_QUERY = `
query OrganizationInvites($input: OrganizationInvitesInput) {
  organizationInvites(input: $input) {
    meta {
      page
      totalCount
      totalPages
      limit
    }
    invites {
      id
      status
      name
      role
      createdAt
      decideAt
    }
  }
}

`;

export const VERIFY_ORGANIZATION_INVITE_QUERY = `
query VerifyOrganizationInvite($input: VerifyOrganizationInviteInput!) {
  verifyOrganizationInvite(input: $input) {
    members
    name
    createdAt
    owner {
      email
      firstName
      lastName
    }
  }
}
`;

export const PROCESS_ORGANIZATION_INVITE_QUERY = `
mutation ProcessOrganizationInvite($input: ProcessOrganizationInviteInput!) {
  processOrganizationInvite(input: $input) {
    email
  }
}`;

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

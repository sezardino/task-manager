export const CURRENT_USER_QUERY = `
query CurrentUser {
  user {
    id
    email
    role
  }
}
`;

export const ORGANIZATION_USERS_QUERY = `
query OrganizationUsers($input: OrganizationUsersInput!) {
  organizationUsers(input: $input) {
    meta {
      totalCount
      page
      limit
      totalPages
    }
    users {
      userId
      memberId
      email
      firstName
      lastName
      userRole
      organizationRole
    }
  }
}
`;

export const ORGANIZATION_USER_QUERY = `
query OrganizationUser($input: OrganizationUserInput!) {
  organizationUser(input: $input) {
    userId
    memberId
    email
    firstName
    lastName
    userRole
  }
}
`;

export const PROJECT_USERS_QUERY = `
query ProjectUsers($input: ProjectUsersInput!) {
  projectUsers(input: $input) {
    meta {
      totalCount
      page
      limit
      totalPages
    }
    users {
      userId
      memberId
      email
      firstName
      lastName
      userRole
      organizationRole
      projectRole
    }
  }
}
`;

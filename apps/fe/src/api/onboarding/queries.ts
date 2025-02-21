export const ORGANIZATION_MUTATION_QUERY = `
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
    }
}
`;

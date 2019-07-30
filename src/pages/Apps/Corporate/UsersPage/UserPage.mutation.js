import gql from 'graphql-tag';

export const ACTIVATE_USER = gql`
  mutation activateUser($id: ID!) {
    activateUser(id: $id) {
      success
      message
    }
  }
`;

export const IMPERSONATE_USER = gql`
  mutation impersonate($id: String!) {
    impersonate(id: $id) {
      user {
        id
      }
      token
      adminToken
    }
  }
`;

import gql from 'graphql-tag';

export const RESTORE_AUTH = gql`
  mutation restoreAuth {
    restoreAuth {
      user {
        id
        firstName
        lastName
        email
        phone
        roles
      }
      token
    }
  }
`;

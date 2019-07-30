import gql from 'graphql-tag';

const RESET_PASSWORD = gql`
  mutation resetPassword($resetToken: String!, $newPassword: String!) {
    resetPassword(resetToken: $resetToken, newPassword: $newPassword) {
      success
    }
  }
`;

export { RESET_PASSWORD };

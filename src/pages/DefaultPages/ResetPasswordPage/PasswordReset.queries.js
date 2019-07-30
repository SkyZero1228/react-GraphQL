import gql from 'graphql-tag';

export const VALIDATE_PASSWORD_RESET_TOKEN = gql`
  query validatePasswordResetToken($resetToken: String!) {
    validatePasswordResetToken(resetToken: $resetToken) {
      id
      email
    }
  }
`;

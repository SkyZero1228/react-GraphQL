import gql from 'graphql-tag';

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;

export { FORGOT_PASSWORD };

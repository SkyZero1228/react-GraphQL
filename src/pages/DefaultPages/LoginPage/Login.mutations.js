import gql from 'graphql-tag';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
        phone
        roles
        address {
          country
        }
      }
      token
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email, password: $password) {
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

const RESET_PASSWORD = gql`
  mutation resetPassword($resetToken: String!, $email: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, email: $email, password: $password) {
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

export { LOGIN, FORGOT_PASSWORD, RESET_PASSWORD };

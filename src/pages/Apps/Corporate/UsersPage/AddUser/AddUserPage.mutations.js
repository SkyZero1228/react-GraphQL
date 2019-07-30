import gql from 'graphql-tag';

export const CREATE_ACCOUNT = gql`
  mutation signup($firstName: String!, $lastName: String!, $email: String!, $paypalEmail: String, $roles: [String!], $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, paypalEmail: $paypalEmail, roles: $roles, password: $password) {
      user {
        id
        firstName
        lastName
        email
        username
        roles
        phone
      }
    }
  }
`;

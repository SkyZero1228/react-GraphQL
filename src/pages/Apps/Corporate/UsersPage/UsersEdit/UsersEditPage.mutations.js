import gql from 'graphql-tag';

export const UPDATE_ACCOUNT = gql`
  mutation editUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $paypalEmail: String
    $username: String!
    $phone: String
    $roles: [String!]
    $address: AddressInput!
    $stripe: StripeInput
    $password: String
  ) {
    editUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      paypalEmail: $paypalEmail
      username: $username
      phone: $phone
      roles: $roles
      address: $address
      stripe: $stripe
      password: $password
    ) {
      id
      firstName
      lastName
      email
      paypalEmail
      username
      roles
      phone
      password
      address {
        address
        city
        state
        zip
        country
      }
      stripe {
        tokenId
        subscriptionId
        planId
        customerId
      }
    }
  }
`;

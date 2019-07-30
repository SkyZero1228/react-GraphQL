import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      user {
        id
        firstName
        lastName
        email
        paypalEmail
        username
        password
        roles
        phone
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
      roles
    }
  }
`;

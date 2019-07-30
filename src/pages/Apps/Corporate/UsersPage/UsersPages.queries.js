import gql from 'graphql-tag';

export const GET_USERS = gql`
  query users($skip: Int, $pageSize: Int, $searchText: String) {
    users(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      user {
        id
        active
        firstName
        lastName
        email
        paypalEmail
        clickFunnelsAffiliateUrls {
          id
          path
        }
        isSubscribed
        phone
        roles
        username
        profile {
          username
          gravatarEmail
          email
          phone
          messages
          timezone
        }
        sponsor {
          firstName
          lastName
          email
        }
      }
      totalRows
    }
  }
`;

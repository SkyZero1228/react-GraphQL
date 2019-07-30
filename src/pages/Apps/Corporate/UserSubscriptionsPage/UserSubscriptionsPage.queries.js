import gql from 'graphql-tag';

export const GET_ALL_SUBSCRIPTIONS = gql`
  query getAllUserSubscriptions($skip: Int, $pageSize: Int, $searchText: String) {
    getAllUserSubscriptions(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      userSubscriptions {
        stripe {
          plan {
            amount
            id
            product
            interval
            intervalCount
            nickname
          }
        }
        id
        user {
          id
          firstName
          lastName
          email
        }
        subscriptionId
        status
        isRevenueShare
        currentPeriodEnd
        currentPeriodStart
        start
        customer {
          id
          email
        }
        product {
          id
          name
        }
      }
      totalRows
    }
  }
`;

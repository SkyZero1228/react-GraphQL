import gql from 'graphql-tag';

export const GET_ALL_TRIALS = gql`
  query getTrialByAffiliate {
    getTrialByAffiliate {
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
      start
      currentPeriodStart
      currentPeriodEnd
      customer {
        id
        email
      }
      plan {
        amount
        id
        product
        interval
        intervalCount
        nickname
      }
      product {
        id
        name
      }
      affiliate {
        id
        firstName
        lastName
        email
      }
      stripe {
        subscriptionId
        customer {
          id
          email
        }
        plan {
          amount
          id
          product
          interval
          intervalCount
          nickname
        }
        product {
          id
          name
        }
      }
    }
  }
`;

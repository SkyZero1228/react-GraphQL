import gql from 'graphql-tag';

export const GET_ME = gql`
  query me {
    me {
      user {
        id
        email
        paypalEmail
        firstName
        lastName
        username
        phone
        roles
        address {
          country
        }
      }
      threeForFreeCount
      escapeBucks
    }
  }
`;

export const GET_CARD_BY_ID = gql`
  query getCardById($cardId: String!) {
    getCardById(cardId: $cardId) {
      id
      object
      address_city
      address_country
      address_line1
      address_line1_check
      address_line2
      address_state
      address_zip
      brand
      country
      exp_month
      exp_year
      last4
      name
    }
  }
`;

export const GET_STRIPE_INFO = gql`
  query getStripeInfo {
    getStripeCard {
      id
      object
      address_line1
      address_line2
      address_city
      address_zip
      address_state
      country
      last4
      exp_year
      exp_month
      name
      brand
    }
    getStripSubscription {
      id
      billing_cycle_anchor
      cancel_at_period_end
      canceled_at
      created
      current_period_end
      current_period_start
      customer
      days_until_due
      status
      plan {
        id
        amount
        interval
      }
    }
    getUserCards {
      id
      object
      address_city
      address_country
      address_line1
      address_line1_check
      address_line2
      address_state
      address_zip
      brand
      country
      exp_month
      exp_year
      last4
      name
    }
  }
`;

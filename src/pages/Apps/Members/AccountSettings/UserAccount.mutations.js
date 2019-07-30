import gql from 'graphql-tag';

export const UPDATE_ACCOUNT = gql`
  mutation editMe($firstName: String!, $lastName: String!, $email: String!, $paypalEmail: String, $username: String!) {
    editMe(firstName: $firstName, lastName: $lastName, email: $email, paypalEmail: $paypalEmail, username: $username) {
      id
      firstName
      lastName
      email
      paypalEmail
      username
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($firstName: String!, $lastName: String!, $email: String!, $username: String!) {
    resetPassword(firstName: $firstName, lastName: $lastName, email: $email, username: $username) {
      id
      firstName
      lastName
      email
      username
    }
  }
`;

export const CREATE_STRIPE_CARD = gql`
  mutation createStripeCard($values: UpdateCardInput) {
    createStripeCard(values: $values) {
      id
      object
      address_city
      address_country
      address_line1
      address_line1_check
      address_line2
      address_state
      address_zip
      address_zip_check
      brand
      country
      cvc_check
      dynamic_last4
      exp_month
      exp_year
      fingerprint
      funding
      last4
      name
      tokenization_method
      status
    }
  }
`;

export const DELETE_STRIPE_CARD = gql`
  mutation deleteStripeCard($cardId: String!) {
    deleteStripeCard(cardId: $cardId) {
      success
      message
    }
  }
`;

export const SET_STRIPE_CARD_AS_DEFAULT = gql`
  mutation setStripeCardAsDefault($cardId: String!) {
    setStripeCardAsDefault(cardId: $cardId) {
      success
      message
    }
  }
`;

export const UPDATE_STRIPE_CARD = gql`
  mutation updateStripeCard($values: UpdateCardInput) {
    updateStripeCard(values: $values) {
      id
      object
      address_city
      address_country
      address_line1
      address_line1_check
      address_line2
      address_state
      address_zip
      address_zip_check
      brand
      country
      cvc_check
      dynamic_last4
      exp_month
      exp_year
      fingerprint
      funding
      last4
      name
      tokenization_method
      status
    }
  }
`;

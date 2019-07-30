import gql from 'graphql-tag';

export const PROSPECT_ACCEPT_CERT = gql`
  mutation acceptProspectCertificate($uuid: String!, $firstName: String!, $lastName: String!, $deliveryEndpoint: String!) {
    acceptProspectCertificate(uuid: $uuid, firstName: $firstName, lastName: $lastName, deliveryEndpoint: $deliveryEndpoint) {
      id
      firstName
      lastName
      deliveryEndpoint
      certificate {
        id
        title
        images {
          url
        }
      }
    }
  }
`;

export const CAPTURE_LAS_VEGAS_PAYMENT = gql`
  mutation captureVegasCertificate(
    $uuid: String!
    $firstName: String!
    $lastName: String!
    $deliveryEndpoint: String!
    $phone: String!
    $travelers: [CertificateTravelerInput!]
    $preferredDates: [Date]
    $alternateDates: [Date]
    $address: AddressInput!
    $card: CreditCardInput!
    $payActivation: Boolean!
    $payReservation: Boolean!
  ) {
    captureVegasCertificate(
      uuid: $uuid
      firstName: $firstName
      lastName: $lastName
      deliveryEndpoint: $deliveryEndpoint
      phone: $phone
      travelers: $travelers
      preferredDates: $preferredDates
      alternateDates: $alternateDates
      address: $address
      card: $card
      payActivation: $payActivation
      payReservation: $payReservation
    ) {
      transId
      authCode
    }
  }
`;

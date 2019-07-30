import gql from 'graphql-tag';

export const CREATE_PROSPECT = gql`
  mutation createProspect($firstName: String!, $lastName: String!, $deliveryEndpoint: String!, $certificateId: String!, $personalizedMessage: String!) {
    addProspect(firstName: $firstName, lastName: $lastName, deliveryEndpoint: $deliveryEndpoint, certificateId: $certificateId, personalizedMessage: $personalizedMessage) {
      id
      firstName
      lastName
      deliveryEndpoint
      certificate {
        title
      }
    }
  }
`;

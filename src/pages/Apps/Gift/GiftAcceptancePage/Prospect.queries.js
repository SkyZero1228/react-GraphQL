import gql from 'graphql-tag';

export const GET_PROSPECT = gql`
  query getProspectByUuid($uuid: String!) {
    getProspectByUuid(uuid: $uuid) {
      id
      firstName
      lastName
      deliveryEndpoint
      deliveryMethod
      phone
      redeemed
      certificate {
        id
        title
        destinations
        images {
          type
          url
          displayOrder
        }
      }
      payments {
        type
      }
    }
  }
`;

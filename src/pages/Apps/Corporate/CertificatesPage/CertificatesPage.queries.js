import gql from 'graphql-tag';

export const GET_CERTIFICATES = gql`
  query getLasVegasProspects($searchText: String) {
    getLasVegasProspects(searchText: $searchText) {
      firstName
      lastName
      payments {
        type
      }

      deliveryEndpoint
      deliveryMethod
      updatedAt
    }
  }
`;

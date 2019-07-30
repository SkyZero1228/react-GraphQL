import gql from 'graphql-tag';

export const GET_CERTIFICATES_FOR_PROSPECT = gql`
  query getCertificatesForProspect($searchTerm: String) {
    getCertificatesForProspect(searchTerm: $searchTerm) {
      id
      title
      description
      membershipLevel
      defaultMessage
      images {
        type
        url
      }
    }
  }
`;

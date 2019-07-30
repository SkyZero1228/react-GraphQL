import gql from 'graphql-tag';

export const GET_CERTIFICATE_DOCUMENTS = gql`
  query getCertificateDocuments($type: String) {
    getCertificateDocuments(type: $type) {
      id
      title
      description
      membershipLevel
      documents {
        id
        displayOrder
        active
        url
        type
        images {
          type
          url
          displayOrder
        }
      }
    }
  }
`;

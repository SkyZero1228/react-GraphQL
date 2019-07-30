import gql from 'graphql-tag';

export const GET_DOMAINS = gql`
  query getAllDomains {
    getAllDomains {
      id
      tld
      enabled
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCTS_NAME = gql`
  query getAllProducts {
    getAllProducts {
      product {
        name
        amount
        id
      }
    }
  }
`;

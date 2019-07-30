import gql from 'graphql-tag';

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts($skip: Int, $pageSize: Int, $searchText: String) {
    getAllProducts(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      product {
        id
        domain {
          id
          tld
        }
        name
        amount
        tierPayouts {
          id
          level
          commissionType
          value
          daysToPayCommission
        }
        createdAt
        updatedAt
      }
      totalRows
    }
  }
`;

export const GET_PRODUCTS_BY_ID = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      product {
        id
        domain {
          id
          tld
        }
        name
        amount
        tierPayouts {
          id
          level
          commissionType
          value
          daysToPayCommission
        }
        roles
        sorAccount
        createdAt
        updatedAt
      }

      domain {
        id
        tld
      }
      role
      sorAccount
    }
  }
`;

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

export const GET_DOMAINS_AND_ROLES_FOR_SELECT = gql`
  query getAllDomainsRolesAndSorAccount {
    getAllDomainsRolesAndSorAccount {
      domain {
        id
        tld
      }
      role
      sorAccount
    }
  }
`;

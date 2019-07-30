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

export const GET_FUNNEL_BY_ID = gql`
  query getFunnelById($id: ID!) {
    getFunnelById(id: $id) {
      id
      title
      active
      hidden
      funnelSteps {
        stepOrder
        url
        products {
          id
          displayName
          amount
          interval
          setup {
            fee
            description
          }
          promoCodes {
            code
            discountType
            discountAmount
            currentUse
            maxUse
            startDate
            endDate
            product {
              id
              name
              displayName
              amount
              interval
              setup {
                fee
                description
              }
            }
          }
        }
        nextFunnelStepUrl
      }
      domain {
        id
        tld
      }
    }
  }
`;

export const GET_PRODUCTS_NAME = gql`
  query getAllProducts {
    getAllProducts {
      product {
        name
        displayName
        amount
        id
      }
    }
  }
`;

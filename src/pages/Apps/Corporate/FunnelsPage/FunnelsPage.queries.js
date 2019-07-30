import gql from 'graphql-tag';

export const GET_FUNNELS = gql`
  query getAllFunnels {
    getAllFunnels {
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

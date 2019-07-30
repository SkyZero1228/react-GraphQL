import gql from 'graphql-tag';

export const GET_ALL_ORDERS = gql`
  query getAllOrders($skip: Int, $pageSize: Int, $searchText: String) {
    getAllOrders(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      orders {
        payment {
          id
          amount
          created
          paid
          status
        }
        domain {
          tld
        }
        id
        leadId
        customer {
          id
          firstName
          lastName
          email
        }
        funnel {
          id
          title
        }
        products {
          id
          amount
          name
          tierPayouts {
            id
            level
            commissionType
            daysToPayCommission
            value
            domain {
              id
              tld
            }
          }
          domain {
            id
            tld
            enabled
          }
          sorAccount
          roles
        }
        commissions {
          id
          affiliate {
            id
            firstName
            lastName
            email
          }
          tier {
            id
            level
            commissionType
            value
            daysToPayCommission
            domain {
              id
              tld
            }
          }
          payCommissionOn
          commissionAmount
          status
          revenueShare {
            isRevenueShare
            revenueShareId
          }
        }
      }
      totalRows
    }
  }
`;

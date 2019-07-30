import gql from 'graphql-tag';

export const GET_ALL_COMMISSIONS = gql`
  query getAllCommissionsByUser($skip: Int, $pageSize: Int, $searchText: String) {
    getAllCommissionsByUser(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      commissions {
        order {
          id
          funnel {
            id
            title
          }
          products {
            id
            name
          }
        }
        customer {
          id
          firstName
          lastName
          email
        }
        id
        affiliate {
          id
          firstName
          lastName
          email
        }
        payCommissionOn
        commissionAmount
        status
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
        createdAt
        updatedAt
      }
      totalRows
      totalCommissionPaid
      totalCommissionPending
    }
  }
`;

import gql from 'graphql-tag';

export const GET_ALL_COMMISSIONS = gql`
  query getAllCommissions($skip: Int, $pageSize: Int, $searchText: String, $dateFilter: DateFilter) {
    getAllCommissions(skip: $skip, pageSize: $pageSize, searchText: $searchText, dateFilter: $dateFilter) {
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
      }
      totalRows
    }
  }
`;

export const DOWNLOAD_COMMISSIONS = gql`
  query downloadCommissions {
    downloadCommissions {
      firstName
      lastName
      email
      payCommissionOn
      commissionAmount
      count
    }
  }
`;

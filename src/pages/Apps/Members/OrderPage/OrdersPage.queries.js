import gql from 'graphql-tag';

export const GET_ALL_COMMISSIONS = gql`
  query getAllCommissionsByUser($userEmail: String) {
    getAllCommissionsByUser(userEmail: $userEmail) {
      commissions {
        id
        user {
          id
          firstName
          lastName
          email
        }
        funnel {
          id
          title
        }
        payCommissionOn
        commissionAmount
        orderId
        status
        order {
          orderId
          productNames
          totalAmount
        }
      }
      totalRows
    }
  }
`;

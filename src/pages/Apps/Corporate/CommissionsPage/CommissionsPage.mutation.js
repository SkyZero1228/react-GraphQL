import gql from 'graphql-tag';

export const REMOVE_COMMISSION = gql`
  mutation removeCommission($orderId: String) {
    removeCommission(orderId: $orderId) {
      success
      message
    }
  }
`;

export const MARK_COMMISSION_AS_PAID = gql`
  mutation markCommissionAsPaid($id: [ID]!) {
    markCommissionAsPaid(id: $id) {
      success
    }
  }
`;

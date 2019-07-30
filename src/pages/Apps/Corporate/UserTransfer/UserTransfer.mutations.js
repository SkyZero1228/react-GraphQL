import gql from 'graphql-tag';

export const USER_TRANSFER = gql`
  mutation userTransfer($values: UserTransferInput) {
    userTransfer(values: $values) {
      success
      message
    }
  }
`;

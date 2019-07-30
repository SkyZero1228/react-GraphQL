import gql from 'graphql-tag';

export const ADD_ESCAPE_BUCKS = gql`
  mutation addEscapeBucks($values: AddEscapeBucksInput) {
    addEscapeBucks(values: $values) {
      message
      success
    }
  }
`;

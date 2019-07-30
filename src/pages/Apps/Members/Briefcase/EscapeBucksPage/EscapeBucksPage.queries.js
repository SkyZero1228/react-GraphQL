import gql from 'graphql-tag';

export const GET_ALL_ESCAPE_BUCKS = gql`
  query getAllEscapeBucks($skip: Int, $pageSize: Int, $searchText: String) {
    getAllEscapeBucks(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      escapeBucks {
        id
        user {
          id
          firstName
          lastName
          email
        }
        bucks
        order {
          id
          funnel {
            id
            title
          }
          products {
            id
            name
            displayName
            amount
          }
          createdAt
          updatedAt
        }
      }
      totalRows
      bucks
    }
  }
`;

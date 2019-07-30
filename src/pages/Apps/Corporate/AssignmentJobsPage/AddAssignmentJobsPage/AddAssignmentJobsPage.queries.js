import gql from 'graphql-tag';

export const GET_AFFILIATE_BY_SEARCH_TEXT = gql`
  query getAffiliateBySearchText($searchText: String!) {
    getAffiliateBySearchText(searchText: $searchText) {
      id
      firstName
      lastName
      email
    }
  }
`;

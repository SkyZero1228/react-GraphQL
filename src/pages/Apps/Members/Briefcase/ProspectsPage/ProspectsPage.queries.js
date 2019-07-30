import gql from 'graphql-tag';

export const GET_PROSPECT_BY_AFFILIATE_ID = gql`
  query getProspectsByAffiliate($searchText: String, $skip: Int, $pageSize: Int) {
    getProspectsByAffiliate(searchText: $searchText, skip: $skip, pageSize: $pageSize) {
      prospects {
        firstName
        lastName
        redeemed
        deliveryEndpoint
        deliveryMethod
        redeemed
        certificate {
          title
        }
      }
      totalRows
    }
  }
`;

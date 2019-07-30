import gql from 'graphql-tag';

export const GET_LEADS = gql`
  query getLeadsByAffiliateUser {
    getLeadsByAffiliateUser {
      id
      createdAt
      funnel {
        title
      }
      email
      funnelStep {
        url
      }
    }
  }
`;

export const GET_LEADS_VISITS = gql`
  query getLeadsVisitsById($id: ID!) {
    getLeadsVisitsById(id: $id) {
      funnelStep {
        url
      }
      createdAt
      domain {
        tld
      }
    }
  }
`;

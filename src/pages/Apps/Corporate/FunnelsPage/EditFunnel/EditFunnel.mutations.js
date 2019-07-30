import gql from 'graphql-tag';

export const EDIT_FUNNEL = gql`
  mutation editFunnel($funnel: FunnelInput!) {
    editFunnel(funnel: $funnel) {
      id
      title
      active
      hidden
      funnelSteps {
        stepOrder
        url
        nextFunnelStepUrl
      }
      createdAt
    }
  }
`;

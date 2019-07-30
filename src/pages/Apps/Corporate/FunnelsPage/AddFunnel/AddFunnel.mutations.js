import gql from 'graphql-tag';

export const CREATE_FUNNEL = gql`
  mutation addFunnel($funnel: FunnelInput!) {
    addFunnel(funnel: $funnel) {
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

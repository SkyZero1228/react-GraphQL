import gql from 'graphql-tag';

export const CREATE_PROSPECT = gql`
  mutation createProspect($referralCode: String!, $certificateCode: String!) {
    addProspectGift(referralCode: $referralCode, certificateCode: $certificateCode) {
      uuid
    }
  }
`;

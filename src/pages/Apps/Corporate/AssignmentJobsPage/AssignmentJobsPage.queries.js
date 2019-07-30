import gql from 'graphql-tag';

export const GET_ALL_ASSIGNMENTS_JOBS = gql`
  query getAllSponsorAssignments {
    getAllSponsorAssignments {
      id
      requestor {
        id
        firstName
        lastName
        email
      }
      affiliate {
        id
        firstName
        lastName
        email
      }
      newSponsor {
        id
        firstName
        lastName
        email
      }
      status
    }
  }
`;

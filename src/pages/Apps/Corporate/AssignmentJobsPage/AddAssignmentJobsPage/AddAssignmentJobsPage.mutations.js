import gql from 'graphql-tag';

export const CREATE_SPONSOR_ASSIGNMENT_JOB = gql`
  mutation addSponsorAssignment($values: SponsorAssignmentInput) {
    addSponsorAssignment(values: $values) {
      status
      id
      requestor {
        id
      }
      affiliate {
        id
      }
      newSponsor {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

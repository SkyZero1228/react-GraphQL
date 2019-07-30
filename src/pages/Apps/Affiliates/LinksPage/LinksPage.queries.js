import gql from 'graphql-tag';

export const GET_LINKS = gql`
  query getAllLinks {
    getAllLinks {
      title
      url
    }
  }
`;

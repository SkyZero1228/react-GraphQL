import gql from 'graphql-tag';

export const GET_VIDEO_BY_ID = gql`
  query getVideoById($id: ID!) {
    getVideoById(id: $id) {
      id
      videoId
      title
      description
      category
      tag
    }
  }
`;

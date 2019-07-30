import gql from 'graphql-tag';

export const REMOVE_VIDEO = gql`
  mutation removeVideo($videoId: String!) {
    removeVideo(videoId: $videoId) {
      success
    }
  }
`;

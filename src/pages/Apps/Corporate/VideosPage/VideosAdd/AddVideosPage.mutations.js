import gql from 'graphql-tag';

export const CREATE_VIDEO = gql`
  mutation addVideo($video: VideoInput!) {
    addVideo(video: $video) {
      id
      videoId
      title
      description
      tag
    }
  }
`;

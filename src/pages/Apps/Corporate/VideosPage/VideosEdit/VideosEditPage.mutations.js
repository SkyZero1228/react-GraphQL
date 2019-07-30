import gql from 'graphql-tag';

export const UPDATE_VIDEO = gql`
  mutation editVideo($id: ID!, $title: String!, $description: String!, $videoId: String!, $tag: String!, $category: String!) {
    editVideo(id: $id, title: $title, description: $description, videoId: $videoId, tag: $tag, category: $category) {
      id
      videoId
      title
      description
      tag
      category
    }
  }
`;

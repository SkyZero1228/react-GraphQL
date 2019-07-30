import gql from 'graphql-tag';

export const GET_VIDEO_CONTENT = gql`
  query getVideoContent($category: String!, $tag: String!) {
    getVideos(category: $category, tag: $tag) {
      id
      videoId
      title
    }
    getVideoTags {
      tag
      children
    }
  }
`;

export const GET_VIDEO_CATEGORY = gql`
  query getAllVideoCategories {
    getAllVideoCategories
  }
`;

export const GET_VIDEO_TAGS_BY_CATEGORY = gql`
  query getAllVideoTagsByCategory($category: String!) {
    getAllVideoTagsByCategory(category: $category)
  }
`;

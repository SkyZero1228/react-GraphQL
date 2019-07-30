import gql from 'graphql-tag';

export const GET_ALL_VIDEOS = gql`
  query getAllVideos($skip: Int, $pageSize: Int) {
    getAllVideos(skip: $skip, pageSize: $pageSize) {
      videos {
        id
        videoId
        title
        description
        category
        tag
      }
      totalRows
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

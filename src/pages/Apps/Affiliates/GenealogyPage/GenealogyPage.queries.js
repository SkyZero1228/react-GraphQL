import gql from 'graphql-tag';

export const GET_GENEALOGY = gql`
  query getGenealogy {
    getGenealogy {
      id
      person {
        firstName
        lastName
        email
        name
        link
        avatar
        title
        totalReports
      }
      children {
        id
        person {
          firstName
          lastName
          email
          name
          link
          avatar
          title
          totalReports
        }
        children {
          id
          person {
            firstName
            lastName
            email
            name
            link
            avatar
            title
            totalReports
          }
          children {
            id
            person {
              firstName
              lastName
              email
              name
              link
              avatar
              title
              totalReports
            }
          }
        }
      }
    }
  }
`;

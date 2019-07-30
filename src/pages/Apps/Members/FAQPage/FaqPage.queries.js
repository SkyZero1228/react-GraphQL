import gql from 'graphql-tag';

export const GET_FAQS = gql`
  query getFrequentlyAskedQuestions {
    getFrequentlyAskedQuestions {
      id
      question
      answer
    }
  }
`;

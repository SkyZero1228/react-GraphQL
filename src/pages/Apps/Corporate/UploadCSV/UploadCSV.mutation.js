import gql from 'graphql-tag';

export const UPLOAD_MEXICO_CERTS_CSV = gql`
  mutation uploadMexicoCerts($file: Upload!) {
    uploadMexicoCerts(file: $file) {
      success
    }
  }
`;

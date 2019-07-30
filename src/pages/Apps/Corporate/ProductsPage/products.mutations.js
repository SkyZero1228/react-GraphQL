import gql from 'graphql-tag';

export const ADD_PRODUCT = gql`
  mutation addProduct($product: ProductInput!) {
    addProduct(product: $product) {
      id
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct($product: ProductInput!) {
    editProduct(product: $product) {
      id
    }
  }
`;

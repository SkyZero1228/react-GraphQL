import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductsList from './ProductList/'

class ProductsListPage extends React.Component {
  static defaultProps = {
    pathName: 'Product List',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Product List" />
        <ProductsList />
      </Page>
    )
  }
}

export default ProductsListPage

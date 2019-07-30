import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import PaginationItems from 'components/AntComponents/Pagination/index'

class PaginationPage extends React.Component {
  static defaultProps = {
    pathName: 'Button',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Buttons" />
        <PaginationItems />
      </Page>
    )
  }
}

export default PaginationPage

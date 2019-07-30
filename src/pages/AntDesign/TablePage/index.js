import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import TableItems from 'components/AntComponents/Table/index'

class TablePage extends React.Component {
  static defaultProps = {
    pathName: 'Table',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Table" />
        <TableItems />
      </Page>
    )
  }
}

export default TablePage

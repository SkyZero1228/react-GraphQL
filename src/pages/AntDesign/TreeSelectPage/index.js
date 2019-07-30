import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import TreeselectItems from 'components/AntComponents/Treeselect/index'

class TreeselectPage extends React.Component {
  static defaultProps = {
    pathName: 'TreeSelect',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="TreeSelect" />
        <TreeselectItems />
      </Page>
    )
  }
}

export default TreeselectPage

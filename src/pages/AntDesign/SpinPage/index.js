import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import SpinItems from 'components/AntComponents/Spin/index'

class SpinPage extends React.Component {
  static defaultProps = {
    pathName: 'Spin',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Spin" />
        <SpinItems />
      </Page>
    )
  }
}

export default SpinPage

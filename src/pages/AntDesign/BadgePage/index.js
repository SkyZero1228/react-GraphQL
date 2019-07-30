import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import BadgeItems from 'components/AntComponents/Badge/index'

class BadgePage extends React.Component {
  static defaultProps = {
    pathName: 'Badge',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Badge" />
        <BadgeItems />
      </Page>
    )
  }
}

export default BadgePage

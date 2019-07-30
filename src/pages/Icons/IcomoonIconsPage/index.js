import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import IcomoonIcons from './IcomoonIcons'

class IcomoonIconsPage extends React.Component {
  static defaultProps = {
    pathName: 'Icomoon Icons',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Icomoon Icons" />
        <IcomoonIcons />
      </Page>
    )
  }
}

export default IcomoonIconsPage

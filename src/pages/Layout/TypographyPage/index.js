import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Typography from './Typography'

class TypographyPage extends React.Component {
  static defaultProps = {
    pathName: 'Typography',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Typography" />
        <Typography />
      </Page>
    )
  }
}

export default TypographyPage

import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import MentionItems from 'components/AntComponents/Mention/index'

class MentionPage extends React.Component {
  static defaultProps = {
    pathName: 'Button',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Buttons" />
        <MentionItems />
      </Page>
    )
  }
}

export default MentionPage

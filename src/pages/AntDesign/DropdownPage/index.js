import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DropdownItems from 'components/AntComponents/Dropdown/index'

class DropdownPage extends React.Component {
  static defaultProps = {
    pathName: 'Button',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Buttons" />
        <DropdownItems />
      </Page>
    )
  }
}

export default DropdownPage

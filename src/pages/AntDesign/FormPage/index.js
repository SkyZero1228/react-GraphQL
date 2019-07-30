import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import FormItems from 'components/AntComponents/Form/index'

class FormPage extends React.Component {
  static defaultProps = {
    pathName: 'Button',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Buttons" />
        <FormItems />
      </Page>
    )
  }
}

export default FormPage

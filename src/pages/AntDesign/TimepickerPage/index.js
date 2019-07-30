import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import TimepickerItems from 'components/AntComponents/Timepicker/index'

class TimepickerPage extends React.Component {
  static defaultProps = {
    pathName: 'Timepicker',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Timepicker" />
        <TimepickerItems />
      </Page>
    )
  }
}

export default TimepickerPage

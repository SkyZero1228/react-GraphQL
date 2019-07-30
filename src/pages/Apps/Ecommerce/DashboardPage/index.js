import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Dashboard from './Dashboard'

class DashboardPage extends React.Component {
  static defaultProps = {
    pathName: 'Ecommerce Dashboard',
    roles: ['Agent', 'Administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Ecommerce Dashboard" />
        <div className="card">
          <div className="card-body">
            <Dashboard />
          </div>
        </div>
      </Page>
    )
  }
}

export default DashboardPage

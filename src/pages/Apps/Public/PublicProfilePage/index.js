import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, notification } from 'antd';

class PublicProfilePage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard',
    roles: ['init'],
  };

  render() {
    const props = this.props;

    return (
      <Page {...props}>
        <Helmet title="Dashboard" />
        <Row gutter={36}>
          <Col xs={24} sm={12}>
            Profile
          </Col>
          <Col xs={24} sm={12}>
            Description
          </Col>
        </Row>
      </Page>
    );
  }
}

export default PublicProfilePage;

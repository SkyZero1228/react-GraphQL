import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, notification, Layout as AntLayout } from 'antd';
import { Query } from 'react-apollo';
import ProspectForm from '../../ProspectForm';
import Welcome from '../../Welcome';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_CERTIFICATES_FOR_PROSPECT } from '../../MembersHomePage.queries';

const AntContent = AntLayout.Content;

class MembersHomePage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard',
  };

  state = {
    searchTerm: '',
  };

  handleSearch = searchTerm => {
    this.setState({ searchTerm }, () => {
      this.props.refetch();
    });
  };

  render() {
    const props = this.props;
    const { searchTerm } = this.state;
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Dashboard" />
            <Row>
              <Col>
                <Welcome currentUser={props.currentUser} />
              </Col>
            </Row>
            <Row>
              <Col>
                <ProspectForm />
              </Col>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default MembersHomePage;

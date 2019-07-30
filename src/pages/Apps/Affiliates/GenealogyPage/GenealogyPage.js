import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Tabs, Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_GENEALOGY } from './GenealogyPage.queries';
import GenealogyTree from './GenealogyTreePage';
require('./GenealogyPage.global.scss');

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const TabPane = Tabs.TabPane;

@withRouter
class GenealogyPage extends React.Component {
  static defaultProps = {
    pathName: 'Genealogy',
  };

  render() {
    const props = this.props;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Order" />

            <Row className="utils__full-width-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_GENEALOGY}>
                    {({ data, loading, error, fetchMore }) => {
                      console.log(data);
                      if (error) return null;
                      if (loading) return <Spin delay="250" />;
                      if (data && data.getGenealogy) return <GenealogyTree data={data.getGenealogy} />;
                    }}
                  </Query>
                </div>
              </section>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default GenealogyPage;

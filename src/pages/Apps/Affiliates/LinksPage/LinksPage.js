import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Card, Spin, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_LINKS } from './LinksPage.queries';
import './LinksPage.global.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class CommissionsAffiliatePage extends React.Component {
  static defaultProps = {
    pathName: 'Links',
  };

  render() {
    const props = this.props;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Links" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_LINKS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      if (error) return null;
                      if (loading) return <Spin delay="250" />;
                      if (data && data.getAllLinks)
                        return (
                          <Row gutter={16}>
                            {data.getAllLinks.map((link, index) => {
                              return (
                                <Col key={index} xs={24} sm={8} className="mb-4">
                                  <Card title={link.title}>
                                    <a href={link.url} target="_blank">
                                      {link.url}
                                    </a>
                                  </Card>
                                </Col>
                              );
                            })}
                          </Row>
                        );
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

export default CommissionsAffiliatePage;

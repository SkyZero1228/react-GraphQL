import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query, ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import SubTable from './SubTable';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_LEADS, GET_LEADS_VISITS } from './LeadsPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class LeadsPage extends React.Component {
  static defaultProps = {
    pathName: 'Leads',
  };
  state = {
    row: [],
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Funnel',
        dataIndex: 'funnel.title',
        key: 'funnel',
        className: 'text-center',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        className: 'text-center',
      },
      {
        title: 'Funnel',
        dataIndex: 'funnelStep.url',
        key: 'funnelStep',
        className: 'text-center',
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'text-center',
        render: createdAt => {
          return <div className="text-center">{DateTime.fromISO(createdAt, { setZone: 'local' }).toLocaleString()}</div>;
        },
      },
    ];

    // const expandedRowRender = async (row, client) => {
    //   // let leadVisits = await client.query({
    //   //   query: GET_LEADS_VISITS,
    //   //   variables: { id: row.id },
    //   // });

    //   const columns = [
    //     {
    //       title: 'createdAt',
    //       dataIndex: 'createdAt',
    //       key: 'createdAt',
    //     },
    //   ];

    //   return <Table columns={columns} dataSource={[]} rowKey="id" pagination={false} />;
    // };

    const expandedRowRender = (row, client) => {
      return <SubTable record={client} row={row} />;
    };
    return (
      <ApolloConsumer>
        {client => (
          <Layout>
            <AntContent className="utils__content-image-wrapper">
              <Page {...props}>
                <Helmet title="Leads" />
                <Row className="utils__wide-content-card">
                  <section className="card">
                    <div className="card-body">
                      <Query query={GET_LEADS} variables={{ skip: 0, pageSize: 10 }}>
                        {({ data, loading, error, fetchMore }) => {
                          if (error) return null;
                          if (loading) return <Spin delay="250" />;
                          if (data)
                            return (
                              <React.Fragment>
                                <Table loading={loading} columns={columns} dataSource={data.getLeadsByAffiliateUser} pagination={{ pageSize: 10 }} rowKey="id" expandedRowRender={row => expandedRowRender(client, row)} />
                              </React.Fragment>
                            );
                        }}
                      </Query>
                    </div>
                  </section>
                </Row>
              </Page>
            </AntContent>
          </Layout>
        )}
      </ApolloConsumer>
    );
  }
}

export default LeadsPage;

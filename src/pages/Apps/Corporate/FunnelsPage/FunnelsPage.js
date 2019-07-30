import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query, ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Input, Spin, Button, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_FUNNELS } from './FunnelsPage.queries';
const AntContent = AntLayout.Content;
const Search = Input.Search;

class UsersPage extends React.Component {
  state = {
    searchText: '',
  };
  static defaultProps = {
    pathName: 'Funnels',
  };

  render() {
    const props = this.props;
    const { searchText } = this.state;

    let columns = [
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'idUser',
        render: id => (
          <Link className="mb-3 text-strong" to={`/corporate/funnels/edit/${id.replace('funnels/', '')}`}>
            Edit Funnel
          </Link>
        ),
      },

      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Domain',
        dataIndex: 'domain',
        key: 'domain',
        render: (domain, user) => {
          return `${domain.tld}`;
        },
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: active => {
          return active ? 'Yes' : 'No';
        },
      },
    ];

    const expandedRowRender = data => {
      const columns = [
        {
          title: 'Url',
          dataIndex: 'url',
          key: 'url',
        },
        {
          title: 'Next Step',
          dataIndex: 'nextFunnelStepUrl',
          key: 'nextFunnelStepUrl',
        },
      ];

      return <Table columns={columns} dataSource={data.funnelSteps} rowKey="id" pagination={false} />;
    };

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Query query={GET_FUNNELS} variables={{ skip: 0, pageSize: 10, searchText }} fetchPolicy="network-only">
              {({ data, loading, error, fetchMore, refetch }) => {
                if (error) return null;
                if (data.getAllFunnels) expandedRowRender(data.getAllFunnels);
                return (
                  <React.Fragment>
                    <Helmet title="Funnels" />
                    <Row className="utils__full-width-content-card">
                      <section className="card">
                        <div className="card-body">
                          <Row gutter={10}>
                            <Col xs={12} sm={6}>
                              <Search placeholder="input search text" onChange={e => this.setState({ searchText: e.target.value })} />
                            </Col>
                            <Col className="text-right">
                              <Link className="btn btn-primary mb-3 text-strong" to={`/corporate/funnels/add`}>
                                Add New Funnel
                              </Link>
                            </Col>
                          </Row>
                          <React.Fragment>
                            <Table
                              loading={loading}
                              bordered
                              columns={columns}
                              dataSource={data.getAllFunnels ? data.getAllFunnels : []}
                              pagination={{ pageSize: 10, position: 'none' }}
                              rowKey="id"
                              expandedRowRender={expandedRowRender}
                            />
                            {!loading && (
                              <Pagination
                                defaultCurrent={1}
                                pageSize={10}
                                total={data.users ? data.users.totalRows : 0}
                                className="ant-pagination ant-table-pagination"
                                onChange={pagination => {
                                  fetchMore({
                                    variables: {
                                      skip: 10 * (pagination - 1),
                                      pageSize: 10,
                                      searchText,
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                      if (!fetchMoreResult) return prev;
                                      return Object.assign({}, prev, {
                                        users: { ...fetchMoreResult.users },
                                      });
                                    },
                                  });
                                }}
                              />
                            )}
                          </React.Fragment>
                        </div>
                      </section>
                    </Row>
                  </React.Fragment>
                );
              }}
            </Query>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default UsersPage;

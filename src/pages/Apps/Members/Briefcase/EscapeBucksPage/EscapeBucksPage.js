import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Badge, Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_ESCAPE_BUCKS } from './EscapeBucksPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class EscapeBucksPage extends React.Component {
  static defaultProps = {
    pathName: 'Orders',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Customer',
        dataIndex: 'user',
        key: 'user',
        render: user => {
          return (
            <div>
              <strong>{`${user.firstName} ${user.lastName}`}</strong>
              <br />
              {user.email}
            </div>
          );
        },
      },

      {
        title: 'Escape Bucks',
        dataIndex: 'bucks',
        key: 'bucks',
        render: bucks => {
          return `$${bucks.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        },
      },
    ];

    const expandedRowRender = data => {
      const columns = [
        {
          title: 'Product Name',
          dataIndex: 'displayName',
          key: 'displayName',
        },
        {
          title: 'Product Price',
          dataIndex: 'amount',
          key: 'amount',
          render: amount => {
            return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          },
        },
      ];

      return <Table columns={columns} dataSource={data.order ? data.order.products : []} rowKey="id" pagination={false} />;
    };

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Order" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_ALL_ESCAPE_BUCKS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      console.log('error', error);
                      console.log('data', data);
                      if (error) return null;
                      if (loading) return <Spin delay="250" />;
                      if (!loading && data && data.getAllEscapeBucks) expandedRowRender(data.getAllEscapeBucks);
                      return (
                        <React.Fragment>
                          <div
                            style={{
                              marginRight: '5px',
                              fontSize: '18px',
                              verticalAlign: 'middle',
                              textAlign: 'left',
                              marginBottom: '8px',
                            }}
                          >
                            <b>Total Escape Bucks: </b>
                            {'  '}
                            <b>
                              {Number(data.getAllEscapeBucks.bucks).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              })}
                              {'  '}
                              EB
                            </b>
                          </div>
                          <Table
                            loading={loading}
                            bordered
                            expandedRowRender={expandedRowRender}
                            columns={columns}
                            dataSource={data.getAllEscapeBucks ? data.getAllEscapeBucks.escapeBucks : []}
                            pagination={{ pageSize: 10, position: 'none' }}
                            rowKey="id"
                          />
                          {!loading && (
                            <Pagination
                              defaultCurrent={1}
                              pageSize={10}
                              total={data.getAllEscapeBucks.totalRows || 0}
                              className="ant-pagination ant-table-pagination"
                              onChange={pagination => {
                                fetchMore({
                                  variables: {
                                    skip: 10 * (pagination - 1),
                                    pageSize: 10,
                                  },
                                  updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) return prev;
                                    return Object.assign({}, prev, {
                                      getAllEscapeBucks: { ...fetchMoreResult.getAllEscapeBucks },
                                    });
                                  },
                                });
                              }}
                            />
                          )}
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
    );
  }
}

export default EscapeBucksPage;

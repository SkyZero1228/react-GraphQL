import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_COMMISSIONS } from './CommissionsPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class CommissionsAffiliatePage extends React.Component {
  static defaultProps = {
    pathName: 'Commissions',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: customer => {
          if (customer) {
            return (
              <div>
                <strong>{`${customer.firstName} ${customer.lastName}`}</strong>
                <br />
                {customer.email}
              </div>
            );
          }
        },
      },
      {
        title: 'Affiliate',
        dataIndex: 'affiliate',
        key: 'affiliate',
        render: affiliate => {
          if (affiliate) {
            return (
              <div>
                <strong>{`${affiliate.firstName} ${affiliate.lastName}`}</strong>
                <br />
                {affiliate.email}
              </div>
            );
          }
        },
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'text-center',
        render: createdAt => {
          return DateTime.fromISO(createdAt, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'Commission',
        dataIndex: 'commissionAmount',
        key: 'commissionAmount',
        className: 'text-center',
        render: commissionAmount => {
          return (
            <div className="text-center">{Number(commissionAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
      },
      {
        title: 'Pay Date',
        dataIndex: 'payCommissionOn',
        key: 'payCommissionOn',
        className: 'text-center',
        render: payCommissionOn => {
          return <div className="text-center">{DateTime.fromISO(payCommissionOn, { setZone: 'local' }).toLocaleString()}</div>;
        },
      },
      {
        title: 'Product(s)',
        dataIndex: 'order',
        key: 'order',
        render: order => {
          if (order) {
            return order.products.map(o => {
              return (
                <Tag key={o.id} style={{ pointerEvents: 'none' }}>
                  {o.name}
                </Tag>
              );
            });
          }
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Order" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_ALL_COMMISSIONS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      console.log(data);
                      if (error) return null;
                      if (loading) return <Spin delay="250" />;
                      if (data && data.getAllCommissionsByUser)
                        return (
                          <React.Fragment>
                            <Row>
                              <Col sm={12}>
                                <div
                                  style={{
                                    marginRight: '5px',
                                    fontSize: '18px',
                                    verticalAlign: 'middle',
                                    textAlign: 'left',
                                    marginBottom: '8px',
                                  }}
                                >
                                  <b>Total Commission Paid: </b>
                                  {'  '}
                                  <b>
                                    {Number(data.getAllCommissionsByUser.totalCommissionPaid).toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                    })}
                                  </b>
                                </div>
                              </Col>
                              <Col sm={12}>
                                <div
                                  style={{
                                    marginRight: '5px',
                                    fontSize: '18px',
                                    verticalAlign: 'middle',
                                    textAlign: 'right',
                                    marginBottom: '8px',
                                  }}
                                >
                                  <b>
                                    Total Commission Pending:
                                    {'  '}
                                  </b>
                                  <b>
                                    {Number(data.getAllCommissionsByUser.totalCommissionPending).toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                    })}
                                  </b>
                                </div>
                              </Col>
                            </Row>
                            <Table
                              loading={loading}
                              columns={columns}
                              dataSource={data.getAllCommissionsByUser.commissions}
                              pagination={{ pageSize: 10, position: 'none' }}
                              rowKey="id"
                            />
                            <Pagination
                              defaultCurrent={1}
                              pageSize={10}
                              total={data.getAllCommissionsByUser.totalRows || 0}
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
                                      getAllCommissionsByUser: { ...fetchMoreResult.getAllCommissionsByUser },
                                    });
                                  },
                                });
                              }}
                            />
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

export default CommissionsAffiliatePage;

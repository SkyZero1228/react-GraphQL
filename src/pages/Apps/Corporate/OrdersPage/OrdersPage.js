import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Badge, Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_ORDERS } from './OrdersPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class OrdersPage extends React.Component {
  static defaultProps = {
    pathName: 'Orders',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Product',
        dataIndex: 'products',
        key: 'productName',
        render: products => {
          if (products)
            return products.map(p => {
              return (
                <Tag key={p.name} style={{ pointerEvents: 'none' }}>
                  Name: {p.name} <br />
                  Amount: {Number(p.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  <br />
                </Tag>
              );
            });
        },
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customerName',
        render: customer => {
          if (customer)
            return (
              <div>
                {`${customer.firstName} ${customer.lastName}`}
                <br />
                {customer.email}
              </div>
            );
        },
      },

      {
        title: 'Order Date',
        dataIndex: 'payment',
        key: 'orderDate',
        render: payment => {
          if (payment) return DateTime.fromISO(payment.created, { setZone: 'local' }).toLocaleString();
        },
      },
    ];

    const expandedRowRender = data => {
      const columns = [
        {
          title: 'Affiliate',
          dataIndex: 'affiliate',
          key: 'affiliateName',
          render: affiliate => `${affiliate.firstName} ${affiliate.lastName}`,
        },
        {
          title: 'Commission Amount',
          dataIndex: 'commissionAmount',
          id: 'commissionAmount',
          render: commissionAmount => {
            return Number(commissionAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          },
        },
        {
          title: 'Pay Commission On',
          dataIndex: 'payCommissionOn',
          key: 'payCommissionOn',
          render: payCommissionOn => {
            return DateTime.fromISO(payCommissionOn, { setZone: 'local' }).toLocaleString();
          },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          id: 'status',
        },
        {
          title: 'Tier',
          dataIndex: 'tier',
          key: 'tierLevel',
          render: tier => {
            if (tier) return tier.level;
          },
        },
      ];

      return <Table columns={columns} dataSource={data.commissions} rowKey="id" pagination={false} />;
    };

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Orders" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_ALL_ORDERS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      if (error) return null;
                      if (!loading && data && data.getAllOrders) expandedRowRender(data.getAllOrders.orders);
                      return (
                        <React.Fragment>
                          <Table
                            loading={loading}
                            bordered
                            columns={columns}
                            dataSource={data.getAllOrders ? data.getAllOrders.orders : []}
                            pagination={{ pageSize: 10, position: 'none' }}
                            expandedRowRender={expandedRowRender}
                            rowKey="id"
                          />
                          {!loading && (
                            <Pagination
                              defaultCurrent={1}
                              pageSize={10}
                              total={data.getAllOrders.totalRows || 0}
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
                                      getAllOrders: { ...fetchMoreResult.getAllOrders },
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

export default OrdersPage;

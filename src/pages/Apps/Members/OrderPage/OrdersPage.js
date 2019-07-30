import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_COMMISSIONS } from './OrdersPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class OrderPage extends React.Component {
  static defaultProps = {
    pathName: 'Orders',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Pay Commission On',
        dataIndex: 'payCommissionOn',
        key: 'payCommissionOn',
        render: payCommissionOn => {
          return DateTime.fromISO(payCommissionOn, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'Commission Amount',
        dataIndex: 'commissionAmount',
        key: 'commissionAmount',
        render: commissionAmount => {
          return Number(commissionAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
      },

      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Product Names',
        dataIndex: 'order',
        key: 'order',
        render: order => {
          if (order) {
            return order.productNames.map(o => {
              return (
                <Tag key={o} style={{ pointerEvents: 'none' }}>
                  {o}
                </Tag>
              );
            });
          }
        },
      },
      {
        title: 'Total Amount',
        dataIndex: 'order',
        key: 'totalAmount',
        render: order => {
          return Number(order.totalAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
                  <Query query={GET_ALL_COMMISSIONS} variables={{ skip: 0, pageSize: 10, userEmail: props.currentUser.email }}>
                    {({ data, loading, error, fetchMore }) => {
                      console.log(data);
                      if (error) return null;

                      return (
                        <React.Fragment>
                          <Table loading={loading} columns={columns} dataSource={data.getAllCommissionsByUser ? data.getAllCommissionsByUser.commissions : []} pagination={{ pageSize: 10, position: 'none' }} rowKey="id" />
                          <Pagination
                            defaultCurrent={1}
                            pageSize={10}
                            total={data.getAllCommissionsByUser ? data.getAllCommissionsByUser.totalRows : 0}
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

export default OrderPage;

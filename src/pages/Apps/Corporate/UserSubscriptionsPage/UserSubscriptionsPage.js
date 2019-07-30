import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_SUBSCRIPTIONS } from './UserSubscriptionsPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class UserSubscriptionsPage extends React.Component {
  static defaultProps = {
    pathName: 'Orders',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'User',
        dataIndex: 'user',
        key: 'userName',
        render: user => {
          return (
            <div>
              {`${user.firstName} ${user.lastName}`}
              <br />
              {user.email}
            </div>
          );
        },
      },
      {
        title: 'Plan',
        dataIndex: 'stripe.plan',
        key: 'planNickName',
        render: plan => {
          if (plan) {
            let aux = '';
            plan.amount
              .toString()
              .split('')
              .reverse()
              .forEach((a, i) => {
                if (i === 2) {
                  aux += '.';
                }
                aux += a;
              });
            aux = aux
              .split('')
              .reverse()
              .join('');
            return (
              <div>
                {plan.nickname}
                <br />
                {parseFloat(aux).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </div>
            );
          }
        },
      },
      {
        title: 'Start Date',
        dataIndex: 'currentPeriodStart',
        key: 'currentPeriodStart',
        render: currentPeriodStart => {
          if (currentPeriodStart) return DateTime.fromISO(currentPeriodStart, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'End Date',
        dataIndex: 'currentPeriodEnd',
        key: 'endDate',
        render: currentPeriodEnd => {
          if (currentPeriodEnd) return DateTime.fromISO(currentPeriodEnd, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => {
          if (status) return status[0].toUpperCase() + status.slice(1);
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
                  <Query query={GET_ALL_SUBSCRIPTIONS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      if (error) return null;
                      if (data && data.getAllUserSubscriptions)
                        return (
                          <React.Fragment>
                            <Table loading={loading} bordered columns={columns} dataSource={data.getAllUserSubscriptions.userSubscriptions} pagination={{ pageSize: 10, position: 'none' }} rowKey="id" />
                            {!loading && (
                              <Pagination
                                defaultCurrent={1}
                                pageSize={10}
                                total={data.getAllUserSubscriptions.totalRows || 0}
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
                                        getAllUserSubscriptions: { ...fetchMoreResult.getAllUserSubscriptions },
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

export default UserSubscriptionsPage;

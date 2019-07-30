import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_TRIALS } from './TrialsPage.query';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class CommissionsAffiliatePage extends React.Component {
  static defaultProps = {
    pathName: 'Trials',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Customer',
        dataIndex: 'user',
        key: 'customer',
        render: user => {
          if (user) {
            return (
              <div>
                <strong>{`${user.firstName} ${user.lastName}`}</strong>
                <br />
                {user.email}
              </div>
            );
          }
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: status => {
          return status === 'past_due' ? 'Past Due' : 'Trialing';
        },
      },

      {
        title: 'Current Period Start',
        dataIndex: 'currentPeriodStart',
        key: 'currentPeriodStart',
        className: 'text-center',
        render: currentPeriodStart => {
          return DateTime.fromISO(currentPeriodStart, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'Current Period End',
        dataIndex: 'currentPeriodEnd',
        key: 'currentPeriodEnd',
        className: 'text-center',
        render: currentPeriodEnd => {
          return DateTime.fromISO(currentPeriodEnd, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'Amount',
        dataIndex: 'stripe',
        key: 'stripe',
        className: 'text-center',
        render: stripe => {
          let aux = '';
          stripe.plan.amount
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
          return <div className="text-center">{Number(aux).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>;
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Trials" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_ALL_TRIALS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      console.log(data);
                      if (error) return null;
                      if (loading) return <Spin delay="250" />;
                      if (data && data.getTrialByAffiliate)
                        return (
                          <React.Fragment>
                            <Table loading={loading} columns={columns} dataSource={data.getTrialByAffiliate} rowKey="id" />
                            {/* <Pagination
                              defaultCurrent={1}
                              pageSize={10}
                              total={data.getTrialByAffiliate.totalRows || 0}
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
                                      getTrialByAffiliate: { ...fetchMoreResult.getTrialByAffiliate },
                                    });
                                  },
                                });
                              }}
                            /> */}
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

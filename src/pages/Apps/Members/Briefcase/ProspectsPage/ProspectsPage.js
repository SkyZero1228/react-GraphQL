import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { DateTime } from 'luxon';
import { Table, Spin, Row, Col, Input, Pagination, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_PROSPECT_BY_AFFILIATE_ID } from './ProspectsPage.queries';
import './ProspectsPage.global.scss';

const AntContent = AntLayout.Content;
const Search = Input.Search;
class ProspectsPage extends React.Component {
  static defaultProps = {
    pathName: 'Prospects',
  };
  state = {
    searchText: '',
  };

  render() {
    const props = this.props;
    const { searchText } = this.state;
    let columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'text-left',
        render: (affiliate, name) => {
          return `${name.firstName} ${name.lastName}`;
        },
      },

      {
        title: 'To',
        dataIndex: 'deliveryEndpoint',
        key: 'deliveryEndpoint',
        className: 'text-left',
      },
      {
        title: 'Delivery Method',
        dataIndex: 'deliveryMethod',
        key: 'deliveryMethod',
        className: 'text-center',
      },
      {
        title: 'Certificate',
        dataIndex: 'certificate.title',
        key: 'certificateTitle',
        className: 'text-left',
      },
      {
        title: 'Redeemed',
        dataIndex: 'redeemed',
        key: 'redeemed',
        className: 'text-center',
        render: redeemed => {
          return redeemed ? 'Yes' : 'No';
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Prospects" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Row gutter={10} className="mb-3">
                    <Col xs={12} sm={6}>
                      <Search placeholder="input search text" onChange={e => this.setState({ searchText: e.target.value })} />
                    </Col>
                  </Row>
                  <Query query={GET_PROSPECT_BY_AFFILIATE_ID} variables={{ skip: 0, pageSize: 10, searchText }}>
                    {({ data, loading, error, fetchMore }) => {
                      if (error) return null;
                      if (loading) return <Spin delay="250" />;
                      return (
                        <React.Fragment>
                          <Table loading={loading} bordered columns={columns} dataSource={data.getProspectsByAffiliate ? data.getProspectsByAffiliate.prospects : []} pagination={{ pageSize: 10, position: 'none' }} rowKey="id" />
                          <Pagination
                            defaultCurrent={1}
                            pageSize={10}
                            total={data.getProspectsByAffiliate ? data.getProspectsByAffiliate.totalRows : 0}
                            className="ant-pagination ant-table-pagination"
                            onChange={pagination => {
                              fetchMore({
                                variables: {
                                  skip: 10 * pagination,
                                  pageSize: 10,
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;
                                  return Object.assign({}, prev, {
                                    getProspectsByAffiliate: { ...fetchMoreResult.getProspectsByAffiliate },
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

export default ProspectsPage;

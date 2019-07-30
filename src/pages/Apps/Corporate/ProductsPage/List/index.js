import React, { Fragment } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Input, Spin, Button, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import { GET_ALL_PRODUCTS } from '../products.queries';
import Helmet from 'react-helmet';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import Page from 'components/LayoutComponents/Page';
const AntContent = AntLayout.Content;
const Search = Input.Search;

class CorporateProductsListRoute extends React.Component {
  state = {
    searchText: '',
  };
  render() {
    const props = this.props;
    const { searchText } = this.state;

    let columns = [
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'idUser',
        render: id => (
          <Link className="mb-3 text-strong" to={`/corporate/products/edit/${id.replace('products/', '')}`}>
            Edit Product
          </Link>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: amount => {
          return `$ ${amount}`;
        },
      },
      {
        title: 'Tiers',
        dataIndex: 'tierPayouts',
        key: 'tiers',
        render: tiers => {
          return tiers.map(tier => {
            return (
              <Tag key={tier.id} style={{ pointerEvents: 'none' }}>
                {tier.level === 1 ? 'First' : 'Second'}
              </Tag>
            );
          });
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Products" />
            <Row className="utils__full-width-content-card">
              <section className="card SupportPage">
                <div className="card-body">
                  <Fragment>
                    <Query query={GET_ALL_PRODUCTS} variables={{ skip: 0, pageSize: 10, searchText }} fetchPolicy="network-only">
                      {({ data, loading, error, fetchMore, refetch }) => {
                        if (error) return null;
                        return (
                          <React.Fragment>
                            <Row className="utils__full-width-content-card">
                              <Row gutter={10}>
                                <Col xs={12} sm={6}>
                                  <Search placeholder="input search text" onChange={e => this.setState({ searchText: e.target.value })} />
                                </Col>
                                <Col className="text-right">
                                  <Link className="btn btn-primary mb-3 text-strong" to={`/corporate/products/add`}>
                                    Add New Product
                                  </Link>
                                </Col>
                              </Row>
                              <React.Fragment>
                                <Table
                                  loading={loading}
                                  bordered
                                  columns={columns}
                                  dataSource={data.getAllProducts ? data.getAllProducts.product : []}
                                  pagination={{ pageSize: 10, position: 'none' }}
                                  rowKey="id"
                                />
                                {!loading && (
                                  <Pagination
                                    defaultCurrent={1}
                                    pageSize={10}
                                    total={data.getAllProducts ? data.getAllProducts.totalRows : 0}
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
                                            getAllProducts: { ...fetchMoreResult.getAllProducts },
                                          });
                                        },
                                      });
                                    }}
                                  />
                                )}
                              </React.Fragment>
                            </Row>
                          </React.Fragment>
                        );
                      }}
                    </Query>
                  </Fragment>
                </div>
              </section>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default CorporateProductsListRoute;

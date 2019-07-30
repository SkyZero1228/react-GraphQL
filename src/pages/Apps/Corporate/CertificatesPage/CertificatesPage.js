import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Input, Spin, Table, Row, Col, Tag, Icon, Form, Layout as AntLayout, notification } from 'antd';
import { DateTime } from 'luxon';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_CERTIFICATES } from './CertificatesPage.queries';

const Search = Input.Search;
const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class CertificatesPage extends React.Component {
  state = {
    searchText: '',
  };
  static defaultProps = {
    pathName: 'Certificates',
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

      { title: 'Delivery Endpoint', dataIndex: 'deliveryEndpoint', key: 'deliveryEndpoint' },
      { title: 'Delivery Method', dataIndex: 'deliveryMethod', key: 'deliveryMethod' },
      {
        title: 'Type',
        dataIndex: 'payments',
        key: 'types',
        render: payments => {
          if (payments === null) return;
          return payments.map(type => {
            return (
              <Tag key={type.type} style={{ pointerEvents: 'none' }}>
                {type.type}
              </Tag>
            );
          });
        },
      },
      {
        title: 'Paid at',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: updatedAt => {
          if (updatedAt) return new Date(updatedAt).toLocaleString();
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Certificates" />
            <Query query={GET_CERTIFICATES} variables={{ searchText }}>
              {({ data, loading, error, fetchMore, refetch }) => {
                if (error) return null;
                if (data) {
                  console.log('data', data);
                  return (
                    <Row className="utils__full-width-content-card">
                      <section className="card Certificates">
                        <div className="card-body">
                          <Row>
                            <Col xs={12} sm={6}>
                              <Search
                                placeholder="input search text"
                                onChange={e =>
                                  this.setState({
                                    searchText: e.target.value,
                                  })
                                }
                                className="mb-3"
                              />
                            </Col>
                          </Row>
                          <Table loading={loading} bordered columns={columns} dataSource={data.getLasVegasProspects} rowKey="id" />
                        </div>
                      </section>
                    </Row>
                  );
                }
              }}
            </Query>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default CertificatesPage;

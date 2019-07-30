import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Input, Spin, Table, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_RESERVATIONS } from './ReservationsPage.queries';
const Search = Input.Search;
const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class ReservationsPage extends React.Component {
  state = {
    searchText: '',
  };
  static defaultProps = {
    pathName: 'Reservations',
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
          <Link className="mb-3 text-strong" to={`/corporate/${id}`}>
            Edit Reservation
          </Link>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'user',
        key: 'userFirstName',
        render: user => `${user.firstName} ${user.lastName}`,
      },
      {
        title: 'Email',
        dataIndex: 'user.email',
        key: 'userEmail',
      },
      {
        title: 'Trip',
        dataIndex: 'trip.title',
        key: 'tripTitle',
      },
      {
        title: 'Paid',
        dataIndex: 'paid',
        key: 'paid',
        render: paid => (paid ? 'Yes' : 'No'),
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Reservations" />
            <Query query={GET_RESERVATIONS} variables={{ searchText }}>
              {({ data, loading, error, fetchMore, refetch }) => {
                if (error) return null;
                if (data) {
                  return (
                    <Row className="utils__full-width-content-card">
                      <section className="card SupportPage">
                        <div className="card-body">
                          <Row>
                            <Col xs={12} sm={6}>
                              <Search
                                placeholder="input search text"
                                onChange={e => this.setState({ searchText: e.target.value })}
                                className="mb-3"
                              />
                            </Col>
                          </Row>
                          <Table loading={loading} bordered columns={columns} dataSource={data.getReservations} rowKey="id" />
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

export default ReservationsPage;

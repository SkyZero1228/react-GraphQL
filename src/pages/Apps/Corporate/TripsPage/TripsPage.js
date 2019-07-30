import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Table, Spin, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_TRIPS } from './TripsPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class TripsPage extends React.Component {
  static defaultProps = {
    pathName: 'Trips',
  };

  render() {
    const props = this.props;
    const left = 1;
    const middle = 2;
    const right = 3;

    let columns = [
      {
        title: 'Hotel Name',
        dataIndex: 'hotel.property',
        key: 'hotelName',
      },
      {
        title: 'Available Rooms',
        dataIndex: 'hotel.totalRoomsRemaining',
        key: 'availableRooms',
      },
      {
        title: 'Country',
        dataIndex: 'location.country',
        key: 'country',
      },
      {
        title: 'City',
        dataIndex: 'location.cityOrRegion',
        key: 'city',
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Trips" />
            <Row className="utils__full-width-content-card">
              <section className="card SupportPage">
                <div className="card-body">
                  <Query query={GET_TRIPS}>
                    {({ data, loading, error }) => {
                      if (error) return null;
                      if (data) {
                        return <Table loading={loading} bordered columns={columns} dataSource={data.getTrips} rowKey="id" />;
                      }
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

export default TripsPage;

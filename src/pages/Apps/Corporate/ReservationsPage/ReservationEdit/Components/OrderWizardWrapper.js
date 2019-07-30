import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo'
import omitDeep from 'omit-deep-lodash';
import { Link, withRouter } from 'react-router-dom';
import { Table, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification, Spin, Button } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_RESERVATION_BY_ID } from '../ReservationEditPage.queries'
import { withCheckoutContext } from '../../../../../../providers/CheckoutProvider'
import { TripContext } from '../../../../../../providers/TripProvider'
import ReservationOrderWizard from './ReservationOrderWizard'
import './index.styles.scss'

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
@withCheckoutContext
class OrderWizardWrapper extends React.Component {
  static defaultProps = {
    pathName: 'Edit Reservation',
  };

  render() {
    const props = this.props;
    const left = 1;
    const middle = 2;
    const right = 3;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Support" />
            <Row className="utils__full-width-content-card">
              <section className="card">
                <div className="card-body">
                  <Query query={GET_RESERVATION_BY_ID} variables={{ id: `reservations/${this.props.match.params.id}` }}>
                    {({ data, loading, error }) => {
                      if (error) return null;
                      if (loading)
                        return (
                          <Spin>
                            <div className="TripPage__spinner" />
                          </Spin>
                        );
                      if (data) {
                        return (
                          <TripContext.Provider value={data.getReservationAndTripById.trip}>
                            <Link className="mb-3 btn btn-primary" to={'/corporate/reservations'}>
                              View all Reservations
                            </Link>
                            <ReservationOrderWizard reservation={omitDeep(data.getReservationAndTripById.reservation, ['__typename'])} />
                          </TripContext.Provider>
                        );
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

export default OrderWizardWrapper;

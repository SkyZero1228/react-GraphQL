import React, { PureComponent } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { DateTime } from 'luxon';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import ExcursionsSelected from './ExcursionsSelected';

const dateFormat = 'MM/DD/YYYY';

@withCheckoutContext
export default class CheckoutReview extends PureComponent {
  state = {
    defaultPaymentSelector: 0,
    balanceDue: 0,
  };

  render() {
    const {
      checkout: {
        reservation: { guests, user, excursionExtras, date },
        goToStep,
      },
    } = this.props;

    // let { reservation, trip } = this.props;
    // let { couponCodeApplied } = this.state;

    let individualPricePerPerson = 0;
    // // console.log('reservation', JSON.stringify(reservation));
    // switch (reservation.ambassador.status) {
    //   case 'VIP':
    //     individualPricePerPerson = trip.priceVip;
    //     break;
    //   case 'PLUS':
    //     individualPricePerPerson = trip.pricePlus;
    //     break;
    //   default:
    //     individualPricePerPerson = trip.priceNonMember;
    //     break;
    // }

    // console.log('individualPricePerPerson', individualPricePerPerson, couponCodeApplied, reservation.travelers.length);

    return (
      <Row className="primary-traveler-header">
        <Col className="summary-wrapper">
          <div className="OrderWizard__Payment__CheckoutReview__Header">Reservation Summary</div>
          <Row gutter={20}>
            <Col xs={24}>
              <div className="OrderWizard__Payment__CheckoutReview__Title">User Account</div>
              <div className="OrderWizard__Payment__CheckoutReview__Content">
                <div className="font-weight-bold">
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  Email: <span>{user.email}</span>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className="OrderWizard__Payment__CheckoutReview__Title">{guests.length === 1 ? 'Guest' : 'Guests'}</div>
              <div className="OrderWizard__Payment__CheckoutReview__Content">
                {guests.map(guest => (
                  <div key={guest.email} className="OrderWizard__Payment__CheckoutReview__Content__Guest">
                    <div className="font-weight-bold">
                      {guest.firstName} {guest.lastName}
                    </div>
                    <div>
                      {guest.address}
                      {guest.address2 ? (
                        <React.Fragment>
                          <br />
                          {guest.address2}
                        </React.Fragment>
                      ) : null}
                      <br />
                      {`${guest.city}, ${guest.state} ${guest.postalCode}`}
                    </div>
                    <div>
                      Date of Birth: <span>{guest.dob}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24}>
              <div className="OrderWizard__Payment__CheckoutReview__Title">Your Trip Dates</div>
              <div className="OrderWizard__Payment__CheckoutReview__Content">
                <div className="font-weight-bold">
                  {DateTime.fromISO(date.start, { setZone: 'local' }).toFormat('D')} - {DateTime.fromISO(date.end, { setZone: 'local' }).toFormat('D')}
                </div>
                <div>Total Days: {date.days}</div>
                <div>Extra Days Before: {date.extraDaysBefore}</div>
                <div>Extra Days After: {date.extraDaysAfter}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <div className="OrderWizard__Payment__CheckoutReview__Title">Your Excursions</div>
              <div className="OrderWizard__Payment__CheckoutReview__Content">
                {excursionExtras.length
                  ? excursionExtras.map((addOn, index) => {
                      return <ExcursionsSelected key={addOn.excursion.id} addOn={addOn} />;
                    })
                  : !excursionExtras.length && <h3 className="OrderWizard__Payment__CheckoutReview__Content__NoExcursions">You did not Elect any Excursions</h3>}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

import React, { PureComponent } from 'react';
import { Row, Col, Tooltip, Icon } from 'antd';
import { withCheckoutContext } from 'providers/CheckoutProvider';

@withCheckoutContext
export default class PaymentDetails extends PureComponent {
  render() {
    const {
      checkout: {
        reservation: { date, guests, excursionExtras },
        getPricing,
      },
    } = this.props;

    const pricing = getPricing();

    return (
      <React.Fragment>
        <Row>
          <Col>
            <div className="OrderWizard__Payment__CheckoutReview__Header">Trip Pricing Breakdown</div>
          </Col>
        </Row>
        <Row className="py-2" gutter={10}>
          <Col xs={12} className="OrderWizard__Payment__PricingBreakdown__Title">
            Room Price<br />Double Occupancy
          </Col>
          <Col xs={12} className="text-right font-weight-bold">
            <Tooltip placement="left" title={`$${pricing.pricePerRoomPerPerson.toLocaleString('en')}.00 / Double Occupancy`}>
              <Icon type="info-circle-o" /> ${pricing.totalRoomPrice.toLocaleString('en')}.00
            </Tooltip>
          </Col>
        </Row>
        <Row className="py-2" gutter={10}>
          <Col xs={12} className="OrderWizard__Payment__PricingBreakdown__Title">
            Extra Days
          </Col>
          <Col xs={12} className="text-right font-weight-bold">
            {pricing.extraDays} x ${pricing.extraDaysTotalPriceByDay.toLocaleString('en')}.00 = ${pricing.extraDaysTotalPrice.toLocaleString('en')}.00
          </Col>
        </Row>
        <Row className="py-2">
          <Col className="OrderWizard__Payment__PricingBreakdown__Title">Excursions</Col>
        </Row>
        <div className="ml-3">
          {excursionExtras.length > 0 ? (
            excursionExtras.map(excursionExtra => {
              return (
                <Row key={excursionExtra.excursion.id} gutter={10} className="my-1">
                  <Col xs={18}>
                    <div className="OrderWizard__Payment__PricingBreakdown__Title">{excursionExtra.excursion.what}</div>
                    <div>
                      ${excursionExtra.time.price.toLocaleString('en')}.00 x {guests.length} Guests
                    </div>
                  </Col>
                  <Col xs={6} className="text-right font-weight-bold">
                    ${(excursionExtra.time.price * guests.length).toLocaleString('en')}.00
                  </Col>
                </Row>
              );
            })
          ) : (
            <Row>
              <Col>
                <div>No Excursions Selected</div>
              </Col>
            </Row>
          )}
        </div>
      </React.Fragment>
    );
  }
}

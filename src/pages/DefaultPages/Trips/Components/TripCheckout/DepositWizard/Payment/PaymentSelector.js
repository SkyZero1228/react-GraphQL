import React, { PureComponent } from 'react';
import { Row, Col, Form, Radio, Checkbox } from 'antd';
import uuid from 'uuid';
import { DateTime } from 'luxon';
import { withCheckoutContext } from 'providers/CheckoutProvider';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@withCheckoutContext
export default class PaymentSelector extends PureComponent {
  handlePaymentSelectorChange = e => {
    let defaultPaymentSelector = e.target.value;
    let balanceDue = 0;

    let {
      checkout: {
        reservation: { paymentOption },
        setPaymentOption,
      },
    } = this.props;

    setPaymentOption(defaultPaymentSelector);

    // let { couponCodeApplied, downPayment, originalPrice } = this.state;

    // if (couponCodeApplied) {
    //   let individualPricePerPerson = 0;
    //   switch (reservation.ambassador.status) {
    //     case 'VIP':
    //       individualPricePerPerson = trip.priceVip;
    //       break;
    //     case 'PLUS':
    //       individualPricePerPerson = trip.pricePlus;
    //       break;
    //     default:
    //       individualPricePerPerson = trip.priceNonMember;
    //       break;
    //   }

    //   // console.log('reservation.travelers.length', reservation.travelers.length);
    //   let discountPaymentPlanDollars = 200;
    //   if (reservation.travelers.length >= 2) {
    //     individualPricePerPerson = individualPricePerPerson * 2;
    //     discountPaymentPlanDollars = 400;
    //   }

    //   switch (defaultPaymentSelector) {
    //     case 'PaymentPlan':
    //       balanceDue = discountPaymentPlanDollars >= downPayment ? 0 : downPayment - discountPaymentPlanDollars;
    //       break;
    //     case 'FullPayment':
    //       balanceDue = this.state.originalPrice - individualPricePerPerson;
    //       break;
    //     default:
    //       balanceDue = this.state.originalPrice;
    //       break;
    //   }
    //   console.log('defaultPaymentSelector, balanceDue', defaultPaymentSelector, balanceDue);
    //   this.setState({ defaultPaymentSelector, balanceDue });
    // } else {
    //   switch (defaultPaymentSelector) {
    //     case 'PaymentPlan':
    //       balanceDue = downPayment;
    //       break;
    //     case 'FullPayment':
    //       balanceDue = originalPrice;
    //       break;
    //     default:
    //       balanceDue = originalPrice;
    //       break;
    //   }
    //   console.log('defaultPaymentSelector, balanceDue', defaultPaymentSelector, balanceDue);
    //   this.setState({ defaultPaymentSelector, balanceDue });
    // }

    // if (this.state.balanceDue === 0) {
    //   this.forceValidationFields();
    // }
  };

  render() {
    let {
      checkout: {
        reservation: { user, guests, addOns, date },
        paymentOption,
        getPricing,
      },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    // let { visible, errorMessage, agree, invalidCouponCode, couponDisabled, discountDollars, couponCodeApplied, balanceDue, defaultPaymentSelector, originalPrice, downPayment, discountPaymentPlanDollars, additionalPayments, showPaymentPlan } = this.state;
    const pricing = getPricing();

    return (
      <React.Fragment>
        <Row>
          <Col>
            <div className="OrderWizard__Payment__CheckoutReview__Header my-3">Choose Payment Option</div>
          </Col>
        </Row>
        <Row>
          <Col className="OrderWizard__Payment__PriceButtons">
            <RadioGroup onChange={this.handlePaymentSelectorChange} value={pricing.totalPrice === 0 ? 'FullPayment' : paymentOption} defaultValue={paymentOption}>
              <RadioButton disabled={pricing.totalPrice === 0} value="PaymentPlan">
                Payment Plan
              </RadioButton>
              <RadioButton disabled={pricing.totalPrice === 0} value="FullPayment">
                Pay in Full
              </RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col className="ticket-type-description">
            {paymentOption === 'PaymentPlan' &&
              pricing.totalDownPayment > 0 && (
                <div className="OrderWizard__Payment__PaymentSelector__Wrapper">
                  <h4>
                    <strong>Due Today: ${pricing.totalDownPayment.toLocaleString('en')}.00</strong>
                  </h4>
                  <h5>
                    Due {DateTime.fromISO(pricing.futurePayments[0].date, { setZone: 'local' }).toFormat('D')}: ${pricing.futurePayments[0].amount.toFixed(2)}
                  </h5>
                  <h5>
                    Due {DateTime.fromISO(pricing.futurePayments[1].date, { setZone: 'local' }).toFormat('D')}: ${pricing.futurePayments[1].amount.toFixed(2)}
                  </h5>
                  <h4>
                    <strong>Total of All Payments: ${pricing.totalPrice.toLocaleString('en')}.00</strong>
                  </h4>
                </div>
              )}
            {(paymentOption === 'FullPayment' || pricing.totalPrice === 0) && (
              <div className="OrderWizard__Payment__PaymentSelector__Wrapper">
                <h4>
                  <strong>Due Today: ${pricing.totalPrice.toLocaleString('en')}.00</strong>
                </h4>
              </div>
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

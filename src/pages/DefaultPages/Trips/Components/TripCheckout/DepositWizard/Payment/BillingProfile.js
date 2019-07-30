import React, { PureComponent } from 'react';
import { Row, Col, Select, Form, Input } from 'antd';
import cn from 'classnames';
import uuid from 'uuid';
import { withCheckoutContext } from 'providers/CheckoutProvider';

const FormItem = Form.Item;

const ccInfo = {
  firstNameOnCard: '',
  lastNameOnCard: '',
  ccAddress1: '',
  ccCity: '',
  ccState: '',
  ccPostalCode: '',
  ccNumber: '',
  ccExpMonth: '',
  ccExpYear: '',
  cvc: '',
};

@withCheckoutContext
export default class BillingProfile extends PureComponent {
  // state = {
  //   paymentInfo: {
  //     nameOnCard: '',
  //     ccNumber: '',
  //     ccMonth: '',
  //     ccYear: '',
  //     cvc: '',
  //   },
  //   visible: false,
  //   reservationCreated: false,
  //   processingPayment: false,
  //   errorMessage: '',
  //   agree: false,
  //   invalidCouponCode: false,
  //   couponDisabled: false,
  //   discountDollars: 0,
  //   discountPaymentPlanDollars: 0,
  //   originalPrice: 0,
  //   balanceDue: 0,
  //   couponCodeApplied: false,
  //   defaultPaymentSelector: 'PaymentPlan',
  //   downPayment: 0,
  //   additionalPayments: 0,
  //   orderId: uuid.v4(),
  //   showPaymentPlan: true,
  //   orderBumped: false,

  //   priceVip: 699,
  //   pricePlus: 699,
  //   priceNonMember: 997,
  // };

  render() {
    let {
      checkout: {
        reservation: { user, guests, addOns, date },
        getPricing,
      },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    // let { visible, errorMessage, agree, invalidCouponCode, couponDisabled, discountDollars, couponCodeApplied, balanceDue } = this.state;
    // let { visible, errorMessage, agree, invalidCouponCode, couponDisabled, discountDollars, couponCodeApplied, balanceDue } = this.state;
    const pricing = getPricing();

    return (
      <React.Fragment>
        <Row>
          <Col>
            <div className="OrderWizard__Payment__CheckoutReview__Header mb-3">Credit Card Billing Information</div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={12}>
            <FormItem label="Billing First Name" hasFeedback>
              {getFieldDecorator('firstNameOnCard', {
                initialValue: ccInfo.firstNameOnCard,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Billing First Name',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label="Billing Last Name" hasFeedback>
              {getFieldDecorator('lastNameOnCard', {
                initialValue: ccInfo.lastNameOnCard,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Billing Last Name',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="Billing Address 1" hasFeedback>
              {getFieldDecorator('ccAddress1', {
                initialValue: ccInfo.ccAddress1,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Address 1',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="Billing Address 2" hasFeedback>
              {getFieldDecorator('ccAddress2')(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={14}>
            <FormItem label="Billing City" hasFeedback>
              {getFieldDecorator('ccCity', {
                initialValue: ccInfo.ccCity,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Billing City',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={10}>
            <FormItem label="Billing State" hasFeedback>
              {getFieldDecorator('ccState', {
                initialValue: ccInfo.ccState,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Billing State',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col className="flex-2-row-column">
            <FormItem label="Billing Postal Code" hasFeedback>
              {getFieldDecorator('ccPostalCode', {
                initialValue: ccInfo.ccPostalCode,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Billing Postal Code',
                    whitespace: true,
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

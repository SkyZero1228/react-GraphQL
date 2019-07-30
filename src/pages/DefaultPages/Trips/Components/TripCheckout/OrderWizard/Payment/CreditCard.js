import React, { PureComponent } from 'react';
import { Row, Col, Select, Form, Input, Checkbox, Button, Modal } from 'antd';
import cn from 'classnames';
import uuid from 'uuid';
import TermsAndConditions from './TermsAndConditions';
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
export default class CreditCard extends PureComponent {
  state = {
    paymentInfo: {
      nameOnCard: '',
      ccNumber: '',
      ccMonth: '',
      ccYear: '',
      cvc: '',
    },
    visible: false,
    reservationCreated: false,
    processingPayment: false,
    errorMessage: '',
    // agree: false,
    // discountDollars: 0,
    // discountPaymentPlanDollars: 0,
    // originalPrice: 0,
    // pricing.totalPrice: 0,
    couponDisabled: false,
    invalidCouponCode: false,
    couponCodeApplied: false,
    // defaultPaymentSelector: 'PaymentPlan',
    // downPayment: 0,
    // additionalPayments: 0,
    orderId: uuid.v4(),
    // showPaymentPlan: true,
    // orderBumped: false,

    // priceVip: 699,
    // pricePlus: 699,
    // priceNonMember: 997,
  };

  handleShowModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false, agree: true });
    this.props.form.setFieldsValue({ agreement: true });
  };

  onAgreementChange = () => {
    const { agreement, setAgreement } = this.props.checkout;
    setAgreement();
    // if (reset) this.props.form.setFieldsValue({ agreement: null });
  };

  validateMe = (rule, value, callback) => {
    if (value && value === true) {
      callback();
    } else {
      callback('You must agree to Terms and Conditions');
    }
  };

  render() {
    let {
      checkout: {
        reservation: { user, guests, addOns, date },
        getPricing,
      },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    // let { visible, errorMessage, agree, invalidCouponCode, couponDisabled, discountDollars, couponCodeApplied, pricing.totalPrice } = this.state;
    let { visible, couponCodeApplied, invalidCouponCode, couponDisabled, errorMessage } = this.state;
    const pricing = getPricing();
    let couponMessageClasses = cn(couponCodeApplied ? 'coupon-code-applied' : 'invalid-coupon-code');

    return (
      <React.Fragment>
        <Row>
          <Col>
            <div className="OrderWizard__Payment__CheckoutReview__Header mb-3">Credit Card Information</div>
          </Col>
        </Row>
        <Row>
          <Col className="flex-2-row-column">
            <FormItem label="Credit Card Number" hasFeedback>
              {getFieldDecorator('ccNumber', {
                initialValue: ccInfo.ccNumber,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Enter Credit Card Number',
                    whitespace: true,
                  },
                ],
              })(<Input type="textarea" disabled={pricing.totalPrice === 0} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={12}>
            <FormItem label="Exp. Month" hasFeedback>
              {getFieldDecorator('ccExpMonth', {
                initialValue: ccInfo.ccExpMonth,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Expiration Month Required',
                    whitespace: true,
                  },
                ],
              })(
                <Select disabled={pricing.totalPrice === 0}>
                  <Select.Option value="01">01</Select.Option>
                  <Select.Option value="02">02</Select.Option>
                  <Select.Option value="03">03</Select.Option>
                  <Select.Option value="04">04</Select.Option>
                  <Select.Option value="05">05</Select.Option>
                  <Select.Option value="06">06</Select.Option>
                  <Select.Option value="07">07</Select.Option>
                  <Select.Option value="08">08</Select.Option>
                  <Select.Option value="09">09</Select.Option>
                  <Select.Option value="10">10</Select.Option>
                  <Select.Option value="11">11</Select.Option>
                  <Select.Option value="12">12</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label="Exp. Year" hasFeedback>
              {getFieldDecorator('ccExpYear', {
                initialValue: ccInfo.ccExpYear,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    message: 'Expiration Year Required',
                    whitespace: true,
                  },
                ],
              })(
                <Select disabled={pricing.totalPrice === 0}>
                  <Select.Option value="2018">2018</Select.Option>
                  <Select.Option value="2019">2019</Select.Option>
                  <Select.Option value="2020">2020</Select.Option>
                  <Select.Option value="2021">2021</Select.Option>
                  <Select.Option value="2022">2022</Select.Option>
                  <Select.Option value="2023">2023</Select.Option>
                  <Select.Option value="2024">2024</Select.Option>
                  <Select.Option value="2025">2025</Select.Option>
                  <Select.Option value="2026">2026</Select.Option>
                  <Select.Option value="2027">2027</Select.Option>
                  <Select.Option value="2028">2028</Select.Option>
                  <Select.Option value="2029">2029</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="CVC" hasFeedback>
              {getFieldDecorator('cvc', {
                initialValue: ccInfo.cvc,
                rules: [
                  {
                    required: pricing.totalPrice > 0,
                    max: 4,
                    min: 3,
                  },
                ],
              })(<Input type="number" disabled={pricing.totalPrice === 0} />)}
            </FormItem>
          </Col>
        </Row>

        {/* <Row gutter={10}>
          <Col xs={24} sm={12}>
            <h5 className="coupon-code-title">Coupon Code</h5>
          </Col>
          <Col xs={24} sm={12} className={couponMessageClasses}>
            {invalidCouponCode && <span>Invalid Coupon Code</span>}
            {couponCodeApplied && <span>Coupon Code Applied</span>}
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={16}>
            <FormItem hasFeedback>
              {getFieldDecorator('couponCode', {
                rules: [{ required: false }],
              })(<Input placeholder="Enter Coupon Code" disabled={couponDisabled} />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            {couponDisabled && (
              <Button className="apply-coupon" icon="minus-circle" onClick={() => this.removeCouponCode()}>
                Remove
              </Button>
            )}
            {!couponDisabled && (
              <Button className="apply-coupon" icon="tag-o" onClick={() => this.checkCouponCode()}>
                Apply
              </Button>
            )}
          </Col>
        </Row> */}
        <Row>
          <Col>
            <FormItem style={{ margin: '10px 0 0 0' }}>
              {getFieldDecorator('agreement', {
                initialValue: false,
                valuePropName: 'checked',
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                  },
                  {
                    validator: this.validateMe,
                  },
                ],
              })(
                <Checkbox>
                  I have read the{' '}
                  <Button size="small" className="OrderWizard__Payment__TermsButton" onClick={() => this.handleShowModal()}>
                    Terms and Conditions
                  </Button>
                </Checkbox>
              )}
            </FormItem>
            <Modal
              title="Terms and Conditions"
              visible={visible}
              onOK={this.onAgreementChange}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Agree
                </Button>,
              ]}
            >
              <TermsAndConditions />
            </Modal>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

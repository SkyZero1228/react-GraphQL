import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, notification } from 'antd';
import { Mutation } from 'react-apollo';
import { CAPTURE_LAS_VEGAS_PAYMENT } from '../Prospect.mutations';
import { omit, startsWith } from 'lodash';
import GraphQLError from '../../../../../components/TripValetComponents/Common/GraphQLError';
import SectionTitle from '../../../../../components/TripValetComponents/SectionTitle/index';
import Address from '../../../../../components/TripValetComponents/Address/index';
import CreditCard from '../../../../../components/TripValetComponents/CreditCard/index';
import PaymentOptions from '../../PaymentOptions/index';
import Travelers from '../../../../../components/TripValetComponents/Travelers';
import TravelDates from '../../../../../components/TripValetComponents/TravelDates';
import { every, some } from 'lodash';

const FormItem = Form.Item;
const Search = Input.Search;

@Form.create()
class LasVegas extends React.PureComponent {
  state = {
    validationError: null,
    isSubmitting: false,
  };

  handleSubmit = (e, captureVegasCertificate) => {
    e.preventDefault();
    this.setState({ validationError: null, isSubmitting: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { uuid } = this.props;
        console.log('form values', JSON.stringify(values, null, 2));
        // cert = omit(cert, ['__typename']);
        captureVegasCertificate({ variables: { uuid, ...values } })
          .then(data => {
            this.setState({ isSubmitting: false });
            this.props.form.resetFields();
            notification.open({
              type: 'success',
              message: 'Your Payment is Successful',
              description: `A Receipt has been sent to: ${values.deliveryEndpoint}!`,
            });
            if (this.props.handleAcceptance) this.props.paymentComplete();
          })
          .catch(err => {
            this.setState({ isSubmitting: false });
          });
      } else this.setState({ isSubmitting: false });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      prospect,
      uuid,
    } = this.props;
    const { validationError, isSubmitting } = this.state;
    const havePaidActivation = some(prospect.payments, payment => payment.type === 'Activation');
    const havePaidReservation = some(prospect.payments, payment => payment.type === 'Reservation');
    console.log(havePaidActivation, havePaidReservation);
    return (
      <Mutation mutation={CAPTURE_LAS_VEGAS_PAYMENT}>
        {(captureVegasCertificate, { data, loading, error }) => (
          <React.Fragment>
            {havePaidActivation && havePaidReservation ? (
              <Row>
                <Col style={{ fontWeight: 700, fontSize: 24, textAlign: 'center', padding: '50px 0' }}>
                  You have completed all Payments!
                  <br />
                  Enjoy your Trip!
                </Col>
              </Row>
            ) : (
              <React.Fragment>
                <h2>
                  Please Activate Your
                  <br />
                  Las Vegas Certificate Now!
                </h2>
                <h5 className="mb-4">Fill out the form below to activate and reserve your Las Vegas Trip</h5>
                {validationError && <GraphQLError message={validationError} />}
                {error && <GraphQLError message={error.message} />}

                <Form onSubmit={e => this.handleSubmit(e, captureVegasCertificate)} className="login-form">
                  <Spin spinning={isSubmitting} size="large">
                    <SectionTitle title="Your Contact Information" />
                    <Row gutter={12}>
                      <Col xs={24} sm={12}>
                        <FormItem hasFeedback>
                          <label className="form-label mb-0">First Name</label>
                          {getFieldDecorator('firstName', {
                            initialValue: prospect.firstName,
                            rules: [{ required: true, message: 'Please enter First Name' }],
                          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12}>
                        <FormItem hasFeedback>
                          <label className="form-label mb-0">Last Name</label>
                          {getFieldDecorator('lastName', {
                            initialValue: prospect.lastName,
                            rules: [{ required: true, message: 'Please enter Last Name' }],
                          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={12}>
                      <Col xs={24} sm={12}>
                        <FormItem hasFeedback>
                          <label className="form-label mb-0">Email</label>
                          {getFieldDecorator('deliveryEndpoint', {
                            initialValue: prospect.deliveryEndpoint,
                            rules: [{ required: true, message: 'Please enter Email Address' }],
                          })(
                            <Input
                              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              type="email"
                              placeholder="Email Address"
                            />
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12}>
                        <FormItem hasFeedback>
                          <label className="form-label mb-0">Phone</label>
                          {getFieldDecorator('phone', {
                            initialValue: prospect.phone,
                            rules: [{ required: true, message: 'Please enter Phone' }],
                          })(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Phone" />)}
                        </FormItem>
                      </Col>
                    </Row>

                    <SectionTitle title="Travelers (Adults Only Need To Be Added)" />
                    <Travelers form={this.props.form} prospect={prospect} />
                    <SectionTitle title="Preferred Traveling Dates" />
                    <TravelDates form={this.props.form} />
                    <SectionTitle title="Billing Address" />
                    <Address form={this.props.form} />
                    <SectionTitle title="Credit Card" />
                    <CreditCard form={this.props.form} />
                    <SectionTitle title="Payment Options" />
                    <PaymentOptions form={this.props.form} payments={prospect.payments} />

                    {error && (
                      <div style={{ marginTop: 20 }}>
                        <GraphQLError message={error.message} />
                      </div>
                    )}

                    <div className="form-actions">
                      <Button
                        htmlType="submit"
                        type="primary"
                        icon="mail"
                        size="large"
                        className="utils__fullWidthButton"
                        loading={isSubmitting}
                      >
                        Pay For Your Las Vegas Trip Now!
                      </Button>
                    </div>
                  </Spin>
                </Form>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default LasVegas;

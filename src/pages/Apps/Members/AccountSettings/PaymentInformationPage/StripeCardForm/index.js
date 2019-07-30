import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Mutation } from 'react-apollo';
import { Checkbox, Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification, Input, Button, Select } from 'antd';
// import Cards from 'react-credit-cards';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { CREATE_STRIPE_CARD, UPDATE_STRIPE_CARD } from '../../UserAccount.mutations';
// import 'react-credit-cards/lib/styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const Option = Select.Option;

@Form.create()
class StripeCardForm extends React.Component {
  state = {
    isSubmitting: false,
    useNewAddress: false,
  };
  handleSubmit = (e, updateStripeCard, createStripeCard) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.isEditing) {
          updateStripeCard({ variables: { values } }).then(a => {
            notification.open({
              type: 'success',
              description: 'You have successfully edit this card as default!',
              message: 'Card Edit',
            });
          });
        } else {
          createStripeCard({ variables: { values } }).then(a => {
            notification.open({
              type: 'success',
              description: 'You have successfully created a new card!',
              message: 'Card Creation',
            });
          });
        }
      }
    });
  };

  render() {
    const props = this.props;
    const {
      form: { getFieldDecorator },
      card,
      isEditing,
    } = props;
    const { isSubmitting, useNewAddress } = this.state;
    return (
      <Mutation mutation={CREATE_STRIPE_CARD} refetchQueries={['getStripeInfo']}>
        {(createStripeCard, { data, loading, error }) => (
          <Mutation mutation={UPDATE_STRIPE_CARD} refetchQueries={['getStripeInfo']}>
            {updateStripeCard => (
              <Spin spinning={isSubmitting && !error} size="large">
                {/* {validationError && <GraphQLError message={validationError} />} */}
                {error && <Alert message="Error..." description={error.message} type="error" closable className="mb-2" />}
                {isEditing && <h2 style={{ textAlign: 'center' }}>Editing Card {card.last4}</h2>}
                <Form onSubmit={e => this.handleSubmit(e, updateStripeCard, createStripeCard)} className="login-form">
                  <FormItem>
                    {getFieldDecorator('cardId', {
                      initialValue: card.id,
                    })(<Input hidden placeholder="Name on Card" />)}
                  </FormItem>
                  <Row gutter={36}>
                    <Col xs={24} sm={12}>
                      <Row gutter={12}>
                        <Col xs={24} sm={12}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">First Name on Card</label>
                            {getFieldDecorator('salesInfo.firstNameOnCard', {
                              initialValue: card.name
                                ? card.name
                                    .split(' ')
                                    .slice(0, card.name.split.length - 1)
                                    .join('')
                                : '',
                              rules: [{ required: true, message: 'Please enter Name om Card' }],
                            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name on Card" />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={12}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Last Name on Card</label>
                            {getFieldDecorator('salesInfo.lastNameOnCard', {
                              initialValue: card.name
                                ? card.name
                                    .split(' ')
                                    .slice(card.name.split.length - 1)
                                    .join('')
                                : '',
                              rules: [{ required: true, message: 'Please enter Name om Card' }],
                            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name on Card" />)}
                          </FormItem>
                        </Col>
                        {!isEditing && (
                          <Col xs={24}>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Credit Card Number</label>
                              {getFieldDecorator('salesInfo.card', {
                                rules: [{ required: true, message: 'Please enter Credit Card Number' }],
                              })(
                                <Input
                                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  placeholder="Credit Card Number"
                                />
                              )}
                            </FormItem>
                          </Col>
                        )}
                      </Row>
                      <Row gutter={12}>
                        <Col xs={24} sm={12}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Expiry Month</label>
                            {getFieldDecorator('salesInfo.ccExpMonth', {
                              initialValue: card.exp_month ? card.exp_month.toString() : '',
                              rules: [{ required: true, message: 'Please enter Expiration Month' }],
                            })(
                              <Select>
                                <Option value="1">(01) January</Option>
                                <Option value="2">(02) February</Option>
                                <Option value="3">(03) March</Option>
                                <Option value="4">(04) April</Option>
                                <Option value="5">(05) May</Option>
                                <Option value="6">(06) June</Option>
                                <Option value="7">(07) July</Option>
                                <Option value="8">(08) August</Option>
                                <Option value="9">(09) September</Option>
                                <Option value="10">(10) October</Option>
                                <Option value="11">(11) November</Option>
                                <Option value="12">(12) December</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={12}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Expiry Year</label>
                            {getFieldDecorator('salesInfo.ccExpYear', {
                              initialValue: card.exp_year ? card.exp_year.toString() : '',
                              rules: [{ required: true, message: 'Please enter Expiration Year' }],
                            })(
                              <Select>
                                <Option value="2019">2019</Option>
                                <Option value="2020">2020</Option>
                                <Option value="2021">2021</Option>
                                <Option value="2022">2022</Option>
                                <Option value="2023">2023</Option>
                                <Option value="2024">2024</Option>
                                <Option value="2025">2025</Option>
                                <Option value="2026">2026</Option>
                                <Option value="2027">2027</Option>
                                <Option value="2028">2028</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">CVV</label>
                            {getFieldDecorator('salesInfo.cvc', {
                              rules: [{ required: true, message: 'Please enter CVV Code' }],
                            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="CVV" />)}
                          </FormItem>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Row gutter={12}>
                        {/* <FormItem>
                <Row>
                  <Col sm={24} xs={24}>
                    <Checkbox
                      onChange={e => {
                        this.setState({ useNewAddress: e.target.checked });
                      }}
                    >
                      Change Billing Address
                    </Checkbox>
                  </Col>
                </Row>
              </FormItem>
              {useNewAddress && (
                <div >
                  <Row> */}
                        <Col>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Full Address</label>
                            {getFieldDecorator('address.address', {
                              initialValue: card.address_line1,
                              rules: [
                                {
                                  required: true,
                                  message: 'Enter Full Address',
                                },
                              ],
                            })(<Input />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">City</label>
                            {getFieldDecorator('address.city', {
                              initialValue: card.address_city,
                              rules: [{ required: true, message: 'Enter City' }],
                            })(<Input />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={10}>
                        <Col xs={24} sm={12}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">State/Province</label>
                            {getFieldDecorator('address.state', {
                              initialValue: card.address_state,
                              rules: [
                                {
                                  required: true,
                                  message: 'Enter State/Province',
                                },
                              ],
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={12}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Zip Code</label>
                            {getFieldDecorator('address.zip', {
                              initialValue: card.address_zip,
                              rules: [{ required: true, message: 'Enter Last Zip Code' }],
                            })(<Input />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Country</label>
                            {getFieldDecorator('address.country', {
                              initialValue: card.country,
                              rules: [
                                {
                                  required: true,
                                  message: 'Enter Country',
                                },
                              ],
                            })(<Input />)}
                          </FormItem>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="form-actions">
                    <Button
                      htmlType="submit"
                      type="primary"
                      icon="mail"
                      size="large"
                      className="utils__fullWidthButton"
                      loading={isSubmitting}
                    >
                      {isEditing ? 'Update Card' : 'Add New Card'}
                    </Button>
                  </div>
                </Form>
              </Spin>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default StripeCardForm;

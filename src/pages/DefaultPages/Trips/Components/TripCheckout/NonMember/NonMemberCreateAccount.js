import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import omit from 'lodash/omit';
import omitDeep from 'omit-deep-lodash';
import Gravatar from 'react-gravatar';
import { ADD_ESCAPE_USER } from './NonMember.mutations';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import './NonMemberCreateAccount.styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@Form.create()
@withCheckoutContext
class NonMemberCreateAccount extends React.PureComponent {
  static defaultProps = {
    pathName: 'User Account',
  };

  state = {
    confirmDirty: false,
  };

  handleSubmit = (e, addEscapeUser) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const userAgent = navigator.userAgent;
        addEscapeUser({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            tripId: this.props.trip.id,
            userAgent,
          },
        }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully created your Account!',
            message: 'Create Account',
          });
          this.props.checkout.setReservation(omitDeep(data.data.addEscapeUser.reservation, ['__typename']));
          // this.props.checkout.setUser(omit(data.data.addEscapeUser.user, ['__typename']));
        });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter are inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;

    return (
      <Row className="utils__narrow-content-card NonMemberCreateAccount">
        <Col>
          <section className="card">
            <div className="card-header">
              <div className="utils__title">
                <strong>Enter Your Information</strong>
              </div>
            </div>
            <div className="card-body">
              <Mutation mutation={ADD_ESCAPE_USER}>
                {(addEscapeUser, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                  return (
                    <React.Fragment>
                      <Form onSubmit={e => this.handleSubmit(e, addEscapeUser)} className="login-form">
                        {mutationError && <GraphQLError message={mutationError.message} />}
                        <Row gutter={12}>
                          <Col xs={24} sm={12}>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">First Name</label>
                              {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please enter First Name' }],
                              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                            </FormItem>
                          </Col>
                          <Col xs={24} sm={12}>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Last Name</label>
                              {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please enter Last Name' }],
                              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Email</label>
                              {getFieldDecorator('email', {
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
                        </Row>
                        <Row>
                          <Col>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Password</label>
                              {getFieldDecorator('password', {
                                rules: [
                                  { required: true, message: 'Please Enter Password' },
                                  {
                                    min: 7,
                                    message: 'Minimum of 7 Characters',
                                  },
                                  {
                                    validator: this.validateToNextPassword,
                                  },
                                ],
                              })(
                                <Input
                                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  type="password"
                                  placeholder="Password"
                                />
                              )}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Confirm Password</label>
                              {getFieldDecorator('confirmPassword', {
                                rules: [
                                  { required: true, message: 'Please Confirm Password' },
                                  {
                                    min: 7,
                                    message: 'Minimum of 7 Characters',
                                  },
                                  {
                                    validator: this.compareToFirstPassword,
                                  },
                                ],
                              })(
                                <Input
                                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  type="password"
                                  placeholder="Confirm Password"
                                />
                              )}
                            </FormItem>
                          </Col>
                        </Row>
                        <div className="form-actions">
                          <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton">
                            Create Account
                          </Button>
                        </div>
                      </Form>
                    </React.Fragment>
                  );
                }}
              </Mutation>
            </div>
          </section>
        </Col>
      </Row>
    );
  }
}

export default NonMemberCreateAccount;

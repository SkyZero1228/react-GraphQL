import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import { Mutation } from 'react-apollo';
import { Alert, Spin, Icon, notification } from 'antd';
import omit from 'lodash/omit';
import omitDeep from 'omit-deep-lodash';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { ESCAPE_LOGIN } from '../TripCheckout.mutations';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
@withRouter
@withCheckoutContext
class MemberLogin extends React.Component {
  static defaultProps = {};
  state = {
    isSubmitForm: false,
  };

  onSubmit = escapeLogin => event => {
    event.preventDefault();
    this.setState({ isSubmitForm: true });
    const { form, trip } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        const userAgent = navigator.userAgent;
        escapeLogin({ variables: { email: values.email, password: values.password, tripId: trip.id, userAgent } })
          .then(data => {
            this.setState({ isSubmitForm: false });
            this.props.checkout.setReservation(omitDeep(data.data.escapeLogin.reservation, ['__typename']));
            // this.props.checkout.setUser(omit(data.data.login.user, ['__typename']));
          })
          .catch(err => {
            this.setState({ isSubmitForm: false });
          });
      } else {
        this.setState({ isSubmitForm: false });
      }
    });
  };

  forgotPassword = () => {
    this.props.history.push('/forgot-password');
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { isSubmitForm } = this.state;
    return (
      <Mutation mutation={ESCAPE_LOGIN}>
        {(escapeLogin, { data, loading, error }) => {
          return (
            <Row className="utils__narrow-content-card NonMemberCreateAccount">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Please Log In</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    {error && <GraphQLError message={error.message} className="mb-4" />}
                    <Spin spinning={loading && !error} size="large">
                      <Form onSubmit={this.onSubmit(escapeLogin)}>
                        <Row>
                          <Col>
                            <FormItem>
                              <label className="form-label mb-0">Email Address</label>
                              {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your Email Address!' }],
                              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem>
                              <label className="form-label mb-0">Password</label>
                              {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row className="form-actions">
                          <Col>
                            <FormItem className="mr-0">
                              <Button type="primary" htmlType="submit" loading={isSubmitForm} disabled={hasErrors(getFieldsError())}>
                                Login
                              </Button>
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                    </Spin>
                  </div>
                </section>
              </Col>
            </Row>
          );
        }}
      </Mutation>
    );
  }
}

export default MemberLogin;

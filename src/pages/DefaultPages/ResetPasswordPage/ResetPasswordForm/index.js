import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { Mutation } from 'react-apollo';
import { Alert, Spin, Icon, notification } from 'antd';
import { push } from 'react-router-redux';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { RESET_PASSWORD } from '../PasswordReset.mutations';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const FormItem = Form.Item;

// TODO: This needs to be removed once react-redux-router is removed
const mapStateToProps = (state, props) => ({
  isSubmitForm: false,
});

@connect(mapStateToProps)
@Form.create()
class ForgotPasswordForm extends React.Component {
  static defaultProps = {};
  state = {
    isSubmitForm: false,
    resetSent: false,
  };

  onSubmit = resetPassword => event => {
    event.preventDefault();
    this.setState({ isSubmitForm: true });
    const { form, dispatch } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        resetPassword({ variables: { resetToken: this.props.token, newPassword: values.newPassword } })
          .then(response => {
            this.setState({ isSubmitForm: false, resetSent: response.data.resetPassword.success });
          })
          .catch(err => {
            this.setState({ isSubmitForm: false, resetSent: false });
          });
      } else {
        this.setState({ isSubmitForm: false, resetSent: false });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Passwords do not match.');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmNewPassword'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { isSubmitForm, resetSent } = this.state;

    return (
      <Mutation mutation={RESET_PASSWORD}>
        {(resetPassword, { data, loading, error }) => {
          return (
            <div className="forgot-password__block__form">
              <h4 className="text-uppercase">
                <strong>Reset Password</strong>
              </h4>
              {error && <GraphQLError message={error.message} className="my-4" />}
              <Spin spinning={loading && !error} size="large">
                {resetSent ? (
                  <div className="forgot-password__block__form--reset-sent">
                    Your password has been changed.
                    <Button type="primary" className="utils__fullWidthButton mt-3" htmlType="submit" loading={isSubmitForm}>
                      <a href="/">Go To Login Now</a>
                    </Button>
                  </div>
                ) : (
                  <React.Fragment>
                    <h5 className="my-3 font-weight-bold">Enter a new password below.</h5>
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(resetPassword)}>
                      <Row>
                        <Col>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">New Password</label>
                            {getFieldDecorator('newPassword', {
                              rules: [
                                { required: true, message: 'Please enter new Password' },
                                {
                                  validator: this.validateToNextPassword,
                                },
                              ],
                            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Confirm New Password</label>
                            {getFieldDecorator('confirmNewPassword', {
                              rules: [
                                { required: true, message: 'Please confirm new Password' },
                                {
                                  validator: this.compareToFirstPassword,
                                },
                              ],
                            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm New Password" />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <div className="form-actions">
                        <Button type="primary" className="utils__fullWidthButton" htmlType="submit" loading={isSubmitForm}>
                          Send Password Reset
                        </Button>
                      </div>
                    </Form>
                  </React.Fragment>
                )}
              </Spin>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default ForgotPasswordForm;

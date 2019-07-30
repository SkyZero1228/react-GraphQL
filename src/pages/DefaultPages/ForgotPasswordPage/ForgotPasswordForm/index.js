import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { Mutation } from 'react-apollo';
import { Alert, Spin, Icon, notification } from 'antd';
import { push } from 'react-router-redux';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { FORGOT_PASSWORD } from '../ForgotPassword.mutations';

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

  onSubmit = forgotPassword => event => {
    event.preventDefault();
    this.setState({ isSubmitForm: true });
    const { form, dispatch } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        forgotPassword({ variables: { email: values.email } })
          .then(data => {
            console.log('forgotPassword data', data);
            // if (this.props.handleLogin) this.props.handleLogin();
            this.setState({ isSubmitForm: false, resetSent: data.data.forgotPassword.success });
          })
          .catch(err => {
            this.setState({ isSubmitForm: false });
          });
      } else {
        this.setState({ isSubmitForm: false });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { isSubmitForm, resetSent } = this.state;

    return (
      <Mutation mutation={FORGOT_PASSWORD}>
        {(forgotPassword, { data, loading, error }) => {
          return (
            <div className="forgot-password__block__form">
              <h4 className="text-uppercase">
                <strong>Forgot Password</strong>
              </h4>
              {error && <GraphQLError message={error.message} className="my-4" />}
              <Spin spinning={loading && !error} size="large">
                {resetSent ? (
                  <div className="forgot-password__block__form--reset-sent">You have been sent a Password Reset Email.</div>
                ) : (
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(forgotPassword)}>
                    <FormItem label="Email">
                      {form.getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not a valid e-mail address' }, { required: true, message: 'Please input your e-mail address' }],
                      })(<Input size="default" />)}
                    </FormItem>
                    <div className="form-actions">
                      <Button type="primary" className="utils__fullWidthButton" htmlType="submit" loading={isSubmitForm}>
                        Send Password Reset
                      </Button>
                    </div>
                  </Form>
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

import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { Mutation } from 'react-apollo';
import { Alert, Spin, Icon, notification } from 'antd';
import { push } from 'react-router-redux';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { LOGIN } from '../Login.mutations';

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
  };

  onSubmit = login => event => {
    event.preventDefault();
    this.setState({ isSubmitForm: true });
    const { form, dispatch } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        login({ variables: { email: values.username, password: values.password } })
          .then(data => {
            if (this.props.handleLogin) this.props.handleLogin();
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
    const { isSubmitForm } = this.state;

    return (
      <Mutation mutation={LOGIN}>
        {(login, { data, loading, error, client }) => {
          client.cache.reset();
          return (
            <div className="cat__pages__login__block__form">
              <h4 className="text-uppercase">
                <strong>Please log in</strong>
              </h4>
              {error && <GraphQLError message={error.message} className="my-4" />}
              <Spin spinning={loading && !error} size="large">
                <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(login)}>
                  <FormItem label="Email">
                    {form.getFieldDecorator('username', {
                      rules: [{ type: 'email', message: 'The input is not a valid e-mail address' }, { required: true, message: 'Please input your e-mail address' }],
                    })(<Input size="default" />)}
                  </FormItem>
                  <FormItem label="Password">
                    {form.getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your password' }],
                    })(<Input size="default" type="password" />)}
                  </FormItem>
                  <div className="mb-2">
                    <a href="javascript: void(0);" className="utils__link--blue">
                      Forgot password
                    </a>
                  </div>
                  <div className="form-actions">
                    <Button type="primary" className="width-150 mr-4" htmlType="submit" loading={isSubmitForm}>
                      Login
                    </Button>
                  </div>
                </Form>
              </Spin>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default ForgotPasswordForm;

import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_PASSWORD } from '../UserAccount.mutations';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@Form.create()
class ChangePasswordPage extends React.Component {
  static defaultProps = {
    pathName: 'Change Password',
  };

  state = {
    confirmDirty: false,
  };

  handleSubmit = (e, updatePassword) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        updatePassword({ variables: { ...values } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully updated your Password.',
            message: 'Password Update',
          });
          this.props.form.resetFields();
        });
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
    const props = this.props;
    const { getFieldDecorator } = props.form;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Dashboard" />
            <Row className="utils__narrow-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Change Your Password</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Mutation mutation={UPDATE_PASSWORD}>
                      {(updatePassword, { loading, error, data }) => {
                        // {validationError && <Alert message={validationError} showIcon type="error" className="mb-2" />}
                        // {validationError && <Alert message={validationError} showIcon type="error" className="mb-2" />}
                        return (
                          <Form onSubmit={e => this.handleSubmit(e, updatePassword)} className="login-form">
                            {error && <GraphQLError message={error.message} />}
                            <Row>
                              <Col>
                                <FormItem hasFeedback>
                                  <label className="form-label mb-0">Current Password</label>
                                  {getFieldDecorator('currentPassword', {
                                    rules: [{ required: true, message: 'Please enter current Password' }],
                                  })(
                                    <Input
                                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                      type="password"
                                      placeholder="Current Password"
                                    />
                                  )}
                                </FormItem>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormItem hasFeedback>
                                  <label className="form-label mb-0">New Password</label>
                                  {getFieldDecorator('newPassword', {
                                    rules: [
                                      { required: true, message: 'Please enter new Password' },
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
                                      placeholder="New Password"
                                    />
                                  )}
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
                                      placeholder="Confirm New Password"
                                    />
                                  )}
                                </FormItem>
                              </Col>
                            </Row>
                            <div className="form-actions">
                              <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton">
                                Update Password
                              </Button>
                            </div>
                          </Form>
                        );
                      }}
                    </Mutation>
                  </div>
                </section>
              </Col>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default ChangePasswordPage;

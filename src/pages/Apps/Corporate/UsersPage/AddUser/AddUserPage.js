import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import Gravatar from 'react-gravatar';
import { CREATE_ACCOUNT } from './AddUserPage.mutations';
import { GET_ROLES } from './AddUserPage.queries';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { CurrentUserContext } from 'providers/CurrentUserProvider';
import { Link, withRouter } from 'react-router-dom';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@Form.create()
@withRouter
class AddUserPage extends React.PureComponent {
  static defaultProps = {
    pathName: 'Add New Users',
  };

  state = {
    confirmDirty: false,
  };

  handleSubmit = (e, addUser) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addUser({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            paypalEmail: values.paypalEmail,
            username: values.username,
            roles: values.roles,
            phone: values.phone,
            password: values.password,
          },
        }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully created a user!',
            message: 'Account Update',
          });
          this.props.history.push('/corporate/users');
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
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  render() {
    const Option = Select.Option;

    const props = this.props;
    const { getFieldDecorator } = props.form;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Dashboard" />
            <CurrentUserContext.Consumer>
              {context => {
                return (
                  <Query query={GET_ROLES}>
                    {({ loading, error, data }) => {
                      if (loading) return <Spin delay="250" />;
                      if (data) {
                        const children = [];
                        data.getRoles.map(val => {
                          return children.push(<Option key={val}>{val}</Option>);
                        });
                        return (
                          <Row className="utils__full-width-content-card">
                            <Col>
                              <section className="card">
                                <div className="card-header">
                                  <div className="utils__title">
                                    <strong>Update User Account</strong>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <Mutation mutation={CREATE_ACCOUNT}>
                                    {(editMe, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                      return (
                                        <React.Fragment>
                                          <Form onSubmit={e => this.handleSubmit(e, editMe)} className="login-form">
                                            {mutationError && <GraphQLError message={mutationError.message} />}
                                            <Row gutter={12}>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">First Name</label>
                                                  {getFieldDecorator('firstName', {
                                                    rules: [{ required: true, message: 'Please enter First Name' }],
                                                  })(
                                                    <Input
                                                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                      placeholder="First Name"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Last Name</label>
                                                  {getFieldDecorator('lastName', {
                                                    rules: [{ required: true, message: 'Please enter Last Name' }],
                                                  })(
                                                    <Input
                                                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                      placeholder="Last Name"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={24} sm={12}>
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
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Email</label>
                                                  {getFieldDecorator('paypalEmail', {})(
                                                    <Input
                                                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                      type="email"
                                                      placeholder="PayPal Email Address"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>
                                            </Row>
                                            <Row gutter={12}>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Password</label>
                                                  {getFieldDecorator('password', {
                                                    rules: [
                                                      { required: true, message: 'Please enter Password' },
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
                                                      type="password"
                                                      onBlur={this.handleConfirmBlur}
                                                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                      placeholder="Password"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>

                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Confirm Password</label>
                                                  {getFieldDecorator('confirmPassword', {
                                                    rules: [
                                                      { required: true, message: 'Please enter Password' },
                                                      {
                                                        validator: this.compareToFirstPassword,
                                                      },
                                                    ],
                                                  })(
                                                    <Input
                                                      type="password"
                                                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                      placeholder="Password"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>
                                            </Row>

                                            <Row gutter={12}>
                                              <Col xs={24}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Roles</label>
                                                  {getFieldDecorator('roles', {
                                                    rules: [{ required: true, message: 'Please enter at least one Role' }],
                                                  })(
                                                    <Select
                                                      mode="multiple"
                                                      placeholder="Please select"
                                                      onChange={change => {
                                                        console.log(change);
                                                      }}
                                                    >
                                                      {children}
                                                    </Select>
                                                  )}
                                                </FormItem>
                                              </Col>
                                            </Row>

                                            <div className="form-actions">
                                              <Button
                                                htmlType="submit"
                                                type="primary"
                                                icon="mail"
                                                size="large"
                                                className="utils__fullWidthButton"
                                              >
                                                Create User
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
                    }}
                  </Query>
                );
              }}
            </CurrentUserContext.Consumer>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default AddUserPage;

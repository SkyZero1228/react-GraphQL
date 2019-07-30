import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import InputMask from 'react-input-mask';
import Gravatar from 'react-gravatar';
import { UPDATE_ACCOUNT } from './UsersEditPage.mutations';
import { GET_USER_BY_ID } from './UsersEditPage.queries';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { CurrentUserContext } from 'providers/CurrentUserProvider';
import { Link, withRouter } from 'react-router-dom';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@Form.create()
@withRouter
class UsersEditPage extends React.PureComponent {
  static defaultProps = {
    pathName: 'User Account',
  };

  handleSubmit = (e, editMe) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        editMe({
          variables: {
            id: `users/${this.props.match.params.id}`,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            paypalEmail: values.paypalEmail,
            username: values.username,
            roles: values.roles,
            address: values.address,
            stripe: values.stripe,
            phone: values.phone,
            password: values.password,
          },
        }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully updated user Account!',
            message: 'Account Update',
          });
          this.props.history.push('/corporate/users');
        });
      }
    });
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
                  <Query query={GET_USER_BY_ID} variables={{ id: `users/${this.props.match.params.id}` }}>
                    {({ loading, error, data }) => {
                      if (loading) return <Spin delay="250" />;
                      if (data) {
                        const children = [];
                        data.getUserById.roles.map(val => {
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
                                  <Mutation mutation={UPDATE_ACCOUNT}>
                                    {(editMe, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                      return (
                                        <React.Fragment>
                                          <Form onSubmit={e => this.handleSubmit(e, editMe)} className="login-form">
                                            {mutationError && <GraphQLError message={mutationError.message} />}
                                            <Row gutter={0}>
                                              <Col className="gravatar text-center" xs={24} sm={4}>
                                                <Gravatar email={context.currentUser.email} default="mp" size={80} />
                                              </Col>
                                              <Col xs={24} sm={20} className="m-0">
                                                <Row gutter={12}>
                                                  <Col xs={24} sm={8}>
                                                    <FormItem hasFeedback>
                                                      <label className="form-label mb-0">First Name</label>
                                                      {getFieldDecorator('firstName', {
                                                        initialValue: data.getUserById.user.firstName,
                                                        rules: [{ required: true, message: 'Please enter First Name' }],
                                                      })(
                                                        <Input
                                                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                          placeholder="First Name"
                                                        />
                                                      )}
                                                    </FormItem>
                                                  </Col>
                                                  <Col xs={24} sm={8}>
                                                    <FormItem hasFeedback>
                                                      <label className="form-label mb-0">Last Name</label>
                                                      {getFieldDecorator('lastName', {
                                                        initialValue: data.getUserById.user.lastName,
                                                        rules: [{ required: true, message: 'Please enter Last Name' }],
                                                      })(
                                                        <Input
                                                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                          placeholder="Last Name"
                                                        />
                                                      )}
                                                    </FormItem>
                                                  </Col>
                                                  <Col xs={24} sm={8}>
                                                    <FormItem hasFeedback>
                                                      <label className="form-label mb-0">Password</label>
                                                      {getFieldDecorator('password', {
                                                        initialValue: data.getUserById.user.password,
                                                        rules: [
                                                          { required: true, message: 'Please enter First Name' },
                                                          {
                                                            min: 7,
                                                            message: 'Minimum of 7 Characters',
                                                          },
                                                        ],
                                                      })(
                                                        <Input
                                                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                          placeholder="Password"
                                                        />
                                                      )}
                                                    </FormItem>
                                                  </Col>
                                                </Row>
                                                <Row gutter={12}>
                                                  <Col xs={24} sm={8}>
                                                    <FormItem hasFeedback>
                                                      <label className="form-label mb-0">Email</label>
                                                      {getFieldDecorator('email', {
                                                        initialValue: data.getUserById.user.email,
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
                                                  <Col xs={24} sm={8}>
                                                    <FormItem hasFeedback>
                                                      <label className="form-label mb-0">PayPal Email</label>
                                                      {getFieldDecorator('paypalEmail', {
                                                        initialValue: data.getUserById.user.paypalEmail,
                                                      })(
                                                        <Input
                                                          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                          type="email"
                                                          placeholder="PayPal Email Address"
                                                        />
                                                      )}
                                                    </FormItem>
                                                  </Col>
                                                  <Col xs={24} sm={8}>
                                                    <FormItem hasFeedback>
                                                      <label className="form-label mb-0">Username (for your personal web site)</label>
                                                      {getFieldDecorator('username', {
                                                        initialValue: data.getUserById.user.username,
                                                        rules: [{ required: true, message: 'Please enter Username' }],
                                                      })(
                                                        <Input
                                                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                          placeholder="Username"
                                                        />
                                                      )}
                                                    </FormItem>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>

                                            <Row gutter={12}>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Phone Number</label>
                                                  {getFieldDecorator('phone', {
                                                    initialValue: data.getUserById.user.phone,
                                                    rules: [{ required: true, message: 'Please enter Phone Number' }],
                                                  })(
                                                    <InputMask
                                                      className="InputMask__AntLike"
                                                      mask="(999) 999-9999"
                                                      placeholder="Phone Number"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Roles</label>
                                                  {getFieldDecorator('roles', {
                                                    initialValue: data.getUserById.user.roles,
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

                                            <FormItem hasFeedback>
                                              <label className="form-label mb-0">Address</label>
                                              {getFieldDecorator('address.address', {
                                                initialValue: data.getUserById.user.address ? data.getUserById.user.address.address : '',
                                                rules: [{ required: true, message: 'Please enter Address' }],
                                              })(<Input placeholder="Address" />)}
                                            </FormItem>
                                            <Row gutter={12}>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">City</label>
                                                  {getFieldDecorator('address.city', {
                                                    initialValue: data.getUserById.user.address ? data.getUserById.user.address.city : '',
                                                    rules: [{ required: true, message: 'Please enter City' }],
                                                  })(<Input placeholder="City" />)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={6}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">State</label>
                                                  {getFieldDecorator('address.state', {
                                                    initialValue: data.getUserById.user.address ? data.getUserById.user.address.state : '',
                                                    rules: [{ required: true, message: 'Please enter Estate' }],
                                                  })(<Input placeholder="State" />)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={6}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Postal Code</label>
                                                  {getFieldDecorator('address.zip', {
                                                    initialValue: data.getUserById.user.address ? data.getUserById.user.address.zip : '',
                                                    rules: [{ required: true, message: 'Please enter Postal Code' }],
                                                  })(<Input placeholder="Postal Code" />)}
                                                </FormItem>
                                              </Col>
                                            </Row>

                                            <FormItem hasFeedback>
                                              <label className="form-label mb-0">Country</label>
                                              {getFieldDecorator('address.country', {
                                                initialValue: data.getUserById.user.address ? data.getUserById.user.address.country : '',
                                                rules: [{ required: true, message: 'Please enter Country' }],
                                              })(<Input placeholder="Country" />)}
                                            </FormItem>

                                            <Row gutter={12}>
                                              <Col xs={24} sm={6}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Stripe Token ID</label>
                                                  {getFieldDecorator('stripe.tokenId', {
                                                    initialValue: data.getUserById.user.stripe ? data.getUserById.user.stripe.tokenId : '',
                                                  })(<Input placeholder="Token ID" />)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={6}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Stripe Subscription ID</label>
                                                  {getFieldDecorator('stripe.subscriptionId', {
                                                    initialValue: data.getUserById.user.stripe
                                                      ? data.getUserById.user.stripe.subscriptionId
                                                      : '',
                                                  })(<Input placeholder="Subscription ID" />)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={6}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Stripe Plan ID</label>
                                                  {getFieldDecorator('stripe.planId', {
                                                    initialValue: data.getUserById.user.stripe ? data.getUserById.user.stripe.planId : '',
                                                  })(<Input placeholder="Plan ID" />)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={6}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Stripe Customer ID</label>
                                                  {getFieldDecorator('stripe.customerId', {
                                                    initialValue: data.getUserById.user.stripe
                                                      ? data.getUserById.user.stripe.customerId
                                                      : '',
                                                  })(<Input placeholder="Customer ID" />)}
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
                                                Update Account
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

export default UsersEditPage;

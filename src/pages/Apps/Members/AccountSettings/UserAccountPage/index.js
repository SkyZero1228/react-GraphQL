import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import Gravatar from 'react-gravatar';
import { UPDATE_ACCOUNT } from '../UserAccount.mutations';
import { GET_ME } from '../UserAccount.queries';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { CurrentUserContext } from 'providers/CurrentUserProvider';
import './index.styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@Form.create()
class UserAccountPage extends React.PureComponent {
  static defaultProps = {
    pathName: 'User Account',
  };

  handleSubmit = (e, editMe) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        editMe({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            paypalEmail: values.paypalEmail,
            username: values.username,
          },
        }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully updated your Account!',
            message: 'Account Update',
          });
        });
      }
    });
  };

  render() {
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
                  <Query query={GET_ME}>
                    {({ loading, error, data }) => {
                      if (loading) return <Spin delay="250" />;
                      if (data) {
                        return (
                          <Row className="utils__narrow-content-card">
                            <Col>
                              <section className="card">
                                <div className="card-header">
                                  <div className="utils__title">
                                    <strong>Update Your Account</strong>
                                  </div>
                                </div>
                                <div className="card-body">
                                  {/* {error && <GraphQLError message={error.message} className="my-4" />} */}
                                  <Mutation mutation={UPDATE_ACCOUNT}>
                                    {(editMe, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                      return (
                                        <React.Fragment>
                                          {error && <GraphQLError message={error.message} className="my-4" />}
                                          <Row type="flex" justify="space-around" align="middle" style={{ marginBottom: '20px' }}>
                                            <Col className="gravatar">
                                              <Gravatar email={context.currentUser.email} default="mp" size={80} />
                                            </Col>
                                            <Col>
                                              <div>Manage your Profile Picture for Free at Gravatar!</div>
                                              <div>
                                                <a
                                                  href="https://en.gravatar.com/connect/?source=_signup"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  style={{ fontWeight: 'bold' }}
                                                >
                                                  Create a Gravatar Account
                                                </a>{' '}
                                                or{' '}
                                                <a
                                                  href="https://en.gravatar.com"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  style={{ fontWeight: 'bold' }}
                                                >
                                                  Login at Gravatar
                                                </a>
                                              </div>
                                            </Col>
                                          </Row>
                                          <Form onSubmit={e => this.handleSubmit(e, editMe)} className="login-form">
                                            {mutationError && <GraphQLError message={mutationError.message} />}
                                            <Row gutter={12}>
                                              <Col xs={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">First Name</label>
                                                  {getFieldDecorator('firstName', {
                                                    initialValue: data.me.user.firstName,
                                                    rules: [{ required: true, message: 'Please enter First Name' }],
                                                  })(
                                                    <Input
                                                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                      placeholder="First Name"
                                                    />
                                                  )}
                                                </FormItem>
                                              </Col>
                                              <Col xs={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Last Name</label>
                                                  {getFieldDecorator('lastName', {
                                                    initialValue: data.me.user.lastName,
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
                                            <FormItem hasFeedback>
                                              <label className="form-label mb-0">Email</label>
                                              {getFieldDecorator('email', {
                                                initialValue: data.me.user.email,
                                                rules: [{ required: true, message: 'Please enter Email Address' }],
                                              })(
                                                <Input
                                                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                  type="email"
                                                  placeholder="Email Address"
                                                />
                                              )}
                                            </FormItem>
                                            <FormItem hasFeedback>
                                              <label className="form-label mb-0">Email</label>
                                              {getFieldDecorator('paypalEmail', {
                                                initialValue: data.me.user.paypalEmail,
                                                rules: [{ required: true, message: 'Please enter PayPal Email Address' }],
                                              })(
                                                <Input
                                                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                  type="email"
                                                  placeholder="PayPal Email Address"
                                                />
                                              )}
                                            </FormItem>
                                            <FormItem hasFeedback>
                                              <label className="form-label mb-0">Username (for your personal web site)</label>
                                              {getFieldDecorator('username', {
                                                initialValue: data.me.user.username,
                                                rules: [{ required: true, message: 'Please enter Username' }],
                                              })(
                                                <Input
                                                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                  placeholder="Username"
                                                />
                                              )}
                                            </FormItem>
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

export default UserAccountPage;

import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import omit from 'lodash/omit';
import { Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Gravatar from 'react-gravatar';
import _ from 'lodash';
import { USER_TRANSFER } from './UserTransfer.mutations';
import { GET_AFFILIATE_BY_SEARCH_TEXT } from './UserTransfer.queries';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { CurrentUserContext } from 'providers/CurrentUserProvider';
import { Link, withRouter } from 'react-router-dom';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const Option = AutoComplete.Option;

@Form.create()
@withRouter
class AddAssignmentJobsPage extends React.PureComponent {
  state = {
    isSameRole: false,
  };
  static defaultProps = {
    pathName: 'User Transfer',
  };

  handleSubmit = (e, addUser) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.fromRole === values.toRole) {
        this.setState({ isSameRole: true });
      } else {
        this.setState({ isSameRole: false });
        if (!err) {
          addUser({ variables: { values } }).then(data => {
            notification.open({
              type: 'success',
              description: 'User was transferred successfully!',
              message: 'User Transferred',
            });
            this.props.history.push('/members');
          });
        }
      }
    });
  };

  render() {
    const props = this.props;
    const { getFieldDecorator, getFieldValue } = props.form;
    const { isSameRole } = this.state;
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="User Transfer" />
            <Row className="utils__full-width-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>User Transfer</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Mutation mutation={USER_TRANSFER}>
                      {(addSponsorAssignment, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                        return (
                          <React.Fragment>
                            <ApolloConsumer>
                              {client => (
                                <Form onSubmit={e => this.handleSubmit(e, addSponsorAssignment)}>
                                  {mutationError && <GraphQLError message={mutationError.message} />}
                                  <Row gutter={12}>
                                    <Col xs={24} sm={8}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">From Role</label>
                                        {getFieldDecorator('fromRole', {
                                          rules: [{ required: true, message: 'Please select one Role' }],
                                        })(
                                          <Select>
                                            <Option value="TV VIP">TV VIP</Option>
                                            <Option value="TV PLUS">TV PLUS</Option>
                                            <Option value="TV Boomerang">TV Boomerang</Option>
                                          </Select>
                                        )}
                                      </FormItem>
                                    </Col>
                                    <Col xs={24} sm={8}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">Email</label>
                                        {getFieldDecorator('email', {
                                          rules: [{ required: true, message: 'Please enter Email' }],
                                        })(<Input />)}
                                      </FormItem>
                                    </Col>
                                    <Col xs={24} sm={8}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">To Role</label>
                                        {getFieldDecorator('toRole', {
                                          rules: [{ required: true, message: 'Please enter Email' }],
                                        })(
                                          <Select>
                                            <Option value="TV VIP">TV VIP</Option>
                                            <Option value="TV PLUS">TV PLUS</Option>
                                          </Select>
                                        )}
                                      </FormItem>
                                    </Col>
                                  </Row>
                                  {isSameRole && (
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                      <b style={{ color: 'red' }}>You Cannot Transfer To Same Roles</b>
                                    </div>
                                  )}
                                  <div className="form-actions">
                                    <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton">
                                      Transfer User to New Club
                                    </Button>
                                  </div>
                                </Form>
                              )}
                            </ApolloConsumer>
                          </React.Fragment>
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

export default AddAssignmentJobsPage;

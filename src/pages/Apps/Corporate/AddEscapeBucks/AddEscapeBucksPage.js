import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import omit from 'lodash/omit';
import {
  Select,
  InputNumber,
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Alert,
  AutoComplete,
  Spin,
  Layout as AntLayout,
  notification,
} from 'antd';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Gravatar from 'react-gravatar';
import _ from 'lodash';
import { ADD_ESCAPE_BUCKS } from './AddEscapeBucksPage.mutations';
import { GET_AFFILIATE_BY_SEARCH_TEXT } from './AddEscapeBucksPage.queries';
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
    affiliateSource: [],
    affiliate: null,
  };
  static defaultProps = {
    pathName: 'Add Escape Bucks to a New User',
  };

  handleSubmit = (e, addValueToEscapeBucks) => {
    const { affiliate } = this.state;

    if (!affiliate) {
      this.props.form.setFieldsValue({
        affiliateId: null,
      });
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addValueToEscapeBucks({ variables: { values: { affiliate, valueToAdd: values.valueToAdd, orderId: values.orderId } } }).then(
          data => {
            notification.open({
              type: 'success',
              description: 'You have successfully credited the value to the user!',
              message: 'Value Credited',
            });
            this.props.history.push('/members');
          }
        );
      }
    });
  };

  handleSearch = (value = '', client) => {
    if (value.length > 2)
      client
        .query({
          query: GET_AFFILIATE_BY_SEARCH_TEXT,
          variables: { searchText: value },
        })
        .then(affiliateSource => {
          this.setState({ affiliateSource: affiliateSource.data.getAffiliateBySearchText });
        });
  };
  onAffiliateSelect = affiliate => {
    this.setState({ affiliate: omit(this.state.affiliateSource.find(a => a.id === affiliate), ['__typename']) });
  };

  render() {
    const props = this.props;
    const { getFieldDecorator, getFieldValue } = props.form;
    const { affiliateSource, affiliate } = this.state;
    let source = [];
    if (affiliateSource.length > 0) {
      source = affiliateSource.map(affiliate => {
        return <Option key={affiliate.id}>{`${affiliate.firstName} ${affiliate.lastName} - ${affiliate.email}`}</Option>;
      });
    } else {
      source = [];
    }

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Add Escape Bucks" />
            <Row className="utils__full-width-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Add Escape Bucks to a New User</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Mutation mutation={ADD_ESCAPE_BUCKS}>
                      {(addValueToEscapeBucks, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                        return (
                          <React.Fragment>
                            <ApolloConsumer>
                              {client => (
                                <Form onSubmit={e => this.handleSubmit(e, addValueToEscapeBucks)}>
                                  {mutationError && <GraphQLError message={mutationError.message} />}
                                  <Row gutter={12}>
                                    <Col xs={24} sm={8}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">User</label>
                                        {getFieldDecorator('affiliateId', {
                                          rules: [{ required: true, message: 'Please select one User' }],
                                        })(
                                          <AutoComplete
                                            dataSource={source}
                                            onSearch={value => this.handleSearch(value, client)}
                                            onSelect={e => this.onAffiliateSelect(e)}
                                            placeholder="User"
                                          />
                                        )}
                                      </FormItem>
                                    </Col>
                                    <Col xs={24} sm={8}>
                                      {affiliate && (
                                        <FormItem hasFeedback>
                                          <label className="form-label mb-0">Value To Add</label>
                                          {getFieldDecorator('valueToAdd', {
                                            rules: [{ required: true, message: 'Please Insert the value to add' }],
                                          })(
                                            <InputNumber
                                              placeholder="Value To Add"
                                              style={{ width: '100%' }}
                                              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                              parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            />
                                          )}
                                        </FormItem>
                                      )}
                                    </Col>
                                    <Col xs={24} sm={8}>
                                      {affiliate && (
                                        <FormItem hasFeedback>
                                          <label className="form-label mb-0">Order ID</label>
                                          {getFieldDecorator('orderId', {})(<Input placeholder="Order Id" />)}
                                        </FormItem>
                                      )}
                                    </Col>
                                  </Row>

                                  <div className="form-actions">
                                    <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton">
                                      Add Escape Bucks
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

import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import omit from 'lodash/omit';
import { Tooltip, Switch, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Gravatar from 'react-gravatar';
import _ from 'lodash';
import { CREATE_SPONSOR_ASSIGNMENT_JOB } from './AddAssignmentJobsPage.mutations';
import { GET_AFFILIATE_BY_SEARCH_TEXT } from './AddAssignmentJobsPage.queries';
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
    newSponsor: null,
    isNoSponsor: false,
  };
  static defaultProps = {
    pathName: 'Add New Assignment Job',
  };

  handleSubmit = (e, addUser) => {
    const { affiliate, newSponsor, isNoSponsor } = this.state;
    if (!newSponsor) {
      this.props.form.setFieldsValue({
        newSponsorId: null,
      });
    }
    if (!affiliate) {
      this.props.form.setFieldsValue({
        affiliateId: null,
      });
    }
    e.preventDefault();
    console.log(affiliate, newSponsor);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addUser({ variables: { values: { affiliate, newSponsor, isNoSponsor } } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully created a new assignment job!',
            message: 'Assignment Created',
          });
          this.props.history.push('/corporate/assignment-jobs');
        });
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

  onNewSponsorSelect = newSponsor => {
    this.setState({ newSponsor: omit(this.state.affiliateSource.find(s => s.id === newSponsor), ['__typename']) });
  };

  onNoSponsor = checked => {
    this.setState({ isNoSponsor: checked });
  };

  render() {
    const props = this.props;
    const { getFieldDecorator, getFieldValue } = props.form;
    const { affiliateSource, affiliate, isNoSponsor } = this.state;
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
            <Helmet title="Assignment Jobs" />
            <Row className="utils__full-width-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>New Assignment Job</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Mutation mutation={CREATE_SPONSOR_ASSIGNMENT_JOB}>
                      {(addSponsorAssignment, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                        return (
                          <React.Fragment>
                            <ApolloConsumer>
                              {client => (
                                <Form onSubmit={e => this.handleSubmit(e, addSponsorAssignment)}>
                                  {mutationError && <GraphQLError message={mutationError.message} />}
                                  <Row gutter={12}>
                                    <Col xs={24} sm={12}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">Affiliate</label>
                                        {getFieldDecorator('affiliateId', {
                                          rules: [{ required: true, message: 'Please select one Affiliate' }],
                                        })(
                                          <AutoComplete
                                            dataSource={source}
                                            onSearch={value => this.handleSearch(value, client)}
                                            onSelect={e => this.onAffiliateSelect(e)}
                                            placeholder="Affiliate"
                                          />
                                        )}
                                      </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                      {affiliate &&
                                        isNoSponsor === false && (
                                          <FormItem hasFeedback>
                                            <label className="form-label mb-0">New Sponsor</label>
                                            {getFieldDecorator('newSponsorId', {
                                              rules: [{ required: true, message: 'Please select one New Sponsor' }],
                                            })(
                                              <AutoComplete
                                                dataSource={source}
                                                onSearch={value => this.handleSearch(value, client)}
                                                onSelect={this.onNewSponsorSelect}
                                                placeholder="New Sponsor"
                                              />
                                            )}
                                          </FormItem>
                                        )}
                                      {affiliate &&
                                        isNoSponsor && (
                                          <FormItem hasFeedback>
                                            <label className="form-label mb-0">New Sponsor</label>
                                            {getFieldDecorator('newSponsorId')(
                                              <AutoComplete
                                                dataSource={source}
                                                onSearch={value => this.handleSearch(value, client)}
                                                onSelect={this.onNewSponsorSelect}
                                                placeholder="New Sponsor"
                                                disabled
                                              />
                                            )}
                                          </FormItem>
                                        )}
                                    </Col>
                                  </Row>
                                  {affiliate && (
                                    <Row gutter={12}>
                                      <Tooltip placement="topLeft" title="Set No Sponsor to Affiliate.">
                                        <Col xs={12} offset={12}>
                                          <FormItem>
                                            {getFieldDecorator('isNoSponsor', {})(<Switch onChange={this.onNoSponsor} />)}
                                            &nbsp;&nbsp; No sponsor
                                          </FormItem>
                                        </Col>
                                      </Tooltip>
                                    </Row>
                                  )}
                                  <div className="form-actions">
                                    <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton">
                                      Create New Assignment Job
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

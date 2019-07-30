import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Checkbox, InputNumber, Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import { v4 as uuidV4 } from 'uuid';
import { EDIT_FUNNEL } from './EditFunnel.mutations';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from './Components/SortableList';
import Helmet from 'react-helmet';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import Page from 'components/LayoutComponents/Page';
import { GET_DOMAINS, GET_FUNNEL_BY_ID, GET_PRODUCTS_NAME } from './EditFunnel.queries';
import './EditFunnel.style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const AntContent = AntLayout.Content;

@Form.create()
@withRouter
class EditFunnelPage extends React.PureComponent {
  static defaultProps = {
    pathName: 'Funnels',
  };
  state = {
    confirmDirty: false,
    addPayoutDisabled: false,
    operation: '',
    product: {
      title: '',
      domain: null,
      active: false,
      hidden: false,
      funnelSteps: [
        {
          id: uuidV4(),
          stepOrder: '1',
          url: '',
          nextFunnelStepUrl: '',
          product: {
            id: uuidV4(),
            name: '',
            displayName: '',
            amount: null,
          },
        },
      ],
    },
  };

  handleSubmit = (e, editFunnel) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('v', values);
      let funnelsOrdered = Object.assign([], values.funnelSteps);
      funnelsOrdered.map((value, index) => {
        return (value.stepOrder = index);
      });

      if (!err) {
        // let domainReorganized = Object.assign({}, values.domain);
        // this.changeObjectKeyValue('key', 'id', domainReorganized);
        // this.changeObjectKeyValue('label', 'tld', domainReorganized);
        // values.domain = domainReorganized;
        values.funnelSteps = funnelsOrdered;
        console.log('funnel values', values);
        editFunnel({ variables: { funnel: values } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully updated a Funnel!',
            message: 'Funnel Updated!',
          });
          this.props.history.push('/corporate/funnels');
        });
      }
    });
  };

  changeObjectKeyValue = (old_key, new_key, o) => {
    if (old_key !== new_key) {
      Object.defineProperty(o, new_key, Object.getOwnPropertyDescriptor(o, old_key));
      delete o[old_key];
    }
  };

  renderTierPayouts = (getFieldDecorator, value = []) => {
    var tiers = Object.assign([], value);
    if (this.state.operation === 'Adding' && value.length > 0) {
      tiers.push({
        id: null,
        stepOrder: '',
        url: '',
        nextFunnelStepUrl: '',
        product: {
          id: uuidV4(),
          name: '',
          displayName: '',
          amount: null,
          interval: '',
        },
      });
    }
  };

  render() {
    const props = this.props;
    let funnel;
    const onSortEnd = ({ oldIndex, newIndex }) => {
      var formValues = Object.assign({}, props.form.getFieldsValue());
      formValues.funnelSteps = arrayMove(formValues.funnelSteps, oldIndex, newIndex);
      props.form.setFieldsValue({
        funnelSteps: formValues.funnelSteps,
      });
    };

    const removeFunnel = index => {
      const { form } = this.props;
      var formValues = Object.assign({}, this.props.form.getFieldsValue());
      formValues.funnelSteps.splice(index, 1);
      this.props.form.setFieldsValue({
        funnelSteps: formValues.funnelSteps,
      });
      funnel.funnelSteps = formValues.funnelSteps;
    };

    const addTierPayout = () => {
      var formValues = Object.assign({}, this.props.form.getFieldsValue());
      formValues.funnelSteps.push({
        stepOrder: formValues.funnelSteps.length + 1,
        url: '',
        nextFunnelStepUrl: '',
        product: {
          id: uuidV4(),
          name: '',
          amount: null,
          interval: '',
        },
      });
      this.props.form.setFieldsValue({
        funnelSteps: formValues.funnelSteps,
      });
      funnel.funnelSteps = formValues.funnelSteps;
    };
    var formValues = Object.assign({}, props.form.getFieldsValue());
    const { getFieldDecorator } = props.form;
    const { addPayoutDisabled } = this.state;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Query query={GET_FUNNEL_BY_ID} variables={{ id: `funnels/${this.props.match.params.id}` }} fetchPolicy="network-only">
            {({ loading, error, data }) => {
              if (loading) return <Spin delay="250" />;
              if (data) {
                funnel = data.getFunnelById;
                return (
                  <Page {...props}>
                    <Helmet title="Dashboard" />
                    <Query query={GET_DOMAINS} variables={{ skip: 0, take: 128, searchText: '' }}>
                      {({ loading, error, data }) => {
                        if (loading) return <Spin delay="250" />;
                        if (data.getAllDomains) {
                          const domain = [];
                          data.getAllDomains.map(val => {
                            return domain.push(<Option key={val.id}>{val.tld}</Option>);
                          });

                          return (
                            <Row className="utils__full-width-content-card">
                              <Col>
                                <section className="card">
                                  <div className="card-header">
                                    <div className="utils__title">
                                      <strong>Update Funnel</strong>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <Row>
                                      <Col>
                                        <div>
                                          <div className="utils__title">
                                            <h4 className="font-weight-bold">Update Funnel</h4>
                                          </div>
                                        </div>
                                        <div>
                                          <Mutation mutation={EDIT_FUNNEL}>
                                            {(editFunnel, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                              return (
                                                <React.Fragment>
                                                  <Form onSubmit={e => this.handleSubmit(e, editFunnel)} className="login-form">
                                                    {getFieldDecorator('id', {
                                                      initialValue: funnel ? funnel.id : `funnels/${this.props.match.params.id}`,
                                                    })(<span />)}
                                                    <Row gutter={12}>
                                                      <Col xs={24} sm={9}>
                                                        <FormItem hasFeedback>
                                                          <label className="form-label mb-0">Title</label>
                                                          {getFieldDecorator('title', {
                                                            initialValue: funnel ? funnel.title : null,
                                                            rules: [{ required: true, message: 'Please enter Name' }],
                                                          })(<Input placeholder="First Name" />)}
                                                        </FormItem>
                                                      </Col>
                                                      <Col xs={24} sm={9}>
                                                        <FormItem hasFeedback>
                                                          <label className="form-label mb-0">Domain</label>
                                                          {getFieldDecorator('domain', {
                                                            initialValue: funnel.domain.id,
                                                            // initialValue: { key: funnel ? funnel.domain.id : null, label: funnel ? funnel.domain.tld : null },
                                                            rules: [{ required: true, message: 'Please select at least one Domain' }],
                                                          })(
                                                            <Select mode="single" placeholder="Please select" onChange={this.handleChange}>
                                                              {domain}
                                                            </Select>
                                                          )}
                                                        </FormItem>
                                                      </Col>
                                                      <Col xs={24} sm={3}>
                                                        <FormItem>
                                                          <label className="form-label mb-0" style={{ paddingTop: '37px' }} />

                                                          {getFieldDecorator('active', {
                                                            initialValue: funnel ? funnel.active : null,
                                                            valuePropName: 'checked',
                                                          })(<Checkbox>Active</Checkbox>)}
                                                        </FormItem>
                                                      </Col>
                                                      <Col xs={24} sm={3}>
                                                        <FormItem>
                                                          <label className="form-label mb-0" style={{ paddingTop: '37px' }} />
                                                          {getFieldDecorator('hidden', {
                                                            valuePropName: 'checked',
                                                            initialValue: funnel ? funnel.hidden : null,
                                                          })(<Checkbox>Hidden</Checkbox>)}
                                                        </FormItem>
                                                      </Col>
                                                    </Row>

                                                    <Row>
                                                      <Col>
                                                        <Row style={{ paddingBottom: '30px' }}>
                                                          <div className="utils__title">
                                                            <h5 className="font-weight-bold">Funnels Steps</h5>
                                                          </div>
                                                        </Row>
                                                      </Col>
                                                    </Row>
                                                    <Query query={GET_PRODUCTS_NAME}>
                                                      {({ loading, error, data }) => {
                                                        if (loading) return <Spin delay="250" />;
                                                        if (!loading && data.getAllProducts) {
                                                          return (
                                                            <Row>
                                                              <Col>
                                                                <SortableList getFieldDecorator={getFieldDecorator} value={funnel || []} onSortEnd={onSortEnd} form={props.form} removeFunnel={removeFunnel} productList={data.getAllProducts.product} />
                                                              </Col>
                                                            </Row>
                                                          );
                                                        }
                                                      }}
                                                    </Query>
                                                    <div className="form-actions">
                                                      <Button htmlType="button" type="default" icon="user-add" size="large" className="utils__fullWidthButton mb-5" onClick={() => addTierPayout()} disabled={addPayoutDisabled}>
                                                        Add Funnel Step
                                                      </Button>
                                                      <Button htmlType="submit" type="primary" icon="shopping-cart" size="large" className="utils__fullWidthButton">
                                                        Edit Funnel
                                                      </Button>
                                                    </div>
                                                  </Form>
                                                </React.Fragment>
                                              );
                                            }}
                                          </Mutation>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          );
                        }
                      }}
                    </Query>
                  </Page>
                );
              }
            }}
          </Query>
        </AntContent>
      </Layout>
    );
  }
}

export default EditFunnelPage;

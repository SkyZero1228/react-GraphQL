import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Checkbox, InputNumber, Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import { v4 as uuidV4 } from 'uuid';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from './Components/SortableList';
import { CREATE_FUNNEL } from './AddFunnel.mutations';
import Helmet from 'react-helmet';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import Page from 'components/LayoutComponents/Page';
import { GET_DOMAINS, GET_PRODUCTS_NAME } from './AddFunnel.queries';
import './AddFunnel.style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const AntContent = AntLayout.Content;

@Form.create()
@withRouter
class AddFunnelPage extends React.Component {
  static defaultProps = {
    pathName: 'Funnels',
  };
  state = {
    confirmDirty: false,
    addPayoutDisabled: false,
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

  handleSubmit = (e, createFunnel) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let funnelsOrdered = Object.assign([], values.funnelSteps);
      funnelsOrdered.map((value, index) => {
        return (value.stepOrder = index);
      });

      if (!err) {
        let domainReorganized = Object.assign({}, values.domain);
        this.changeObjectKeyValue('key', 'id', domainReorganized);
        this.changeObjectKeyValue('label', 'tld', domainReorganized);
        values.domain = domainReorganized;
        values.funnelSteps = funnelsOrdered;
        createFunnel({ variables: { funnel: values } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully created a Funnel!',
            message: 'Funnel Created!',
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
  removeFunnel = index => {
    const { form } = this.props;
    const { product } = this.state;
    let prod = Object.assign({}, product);
    var formValues = Object.assign({}, form.getFieldsValue());

    formValues.funnelSteps.splice(index, 1);
    form.setFieldsValue({
      funnelSteps: formValues.funnelSteps,
    });
    prod.funnelSteps = formValues.funnelSteps;
    this.setState({
      product: prod,
    });
  };

  addTierPayout = () => {
    const { product } = this.state;
    let prod = Object.assign({}, product);
    prod.funnelSteps.unshift({
      id: uuidV4(),
      stepOrder: '2',
      url: '',
      nextFunnelStepUrl: '',
      product: {
        id: uuidV4(),
        name: '',
        displayName: '',
        amount: null,
      },
    });

    this.setState({
      product: prod,
    });
  };

  render() {
    const props = this.props;
    const onSortEnd = ({ oldIndex, newIndex }) => {
      var formValues = Object.assign({}, props.form.getFieldsValue());
      formValues.funnelSteps = arrayMove(formValues.funnelSteps, oldIndex, newIndex);
      props.form.setFieldsValue({
        funnelSteps: formValues.funnelSteps,
      });
    };
    const { getFieldDecorator } = props.form;
    const { addPayoutDisabled } = this.state;
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
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
                              <strong>Update User Account</strong>
                            </div>
                          </div>
                          <div className="card-body">
                            <Row>
                              <Col>
                                <div>
                                  <div className="utils__title">
                                    <h4 className="font-weight-bold">Add Funnel</h4>
                                  </div>
                                </div>
                                <div>
                                  <Mutation mutation={CREATE_FUNNEL}>
                                    {(createFunnel, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                      return (
                                        <React.Fragment>
                                          <Form onSubmit={e => this.handleSubmit(e, createFunnel)} className="login-form">
                                            <Row gutter={12}>
                                              <Col xs={24} sm={9}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Title</label>
                                                  {getFieldDecorator('title', {
                                                    rules: [{ required: true, message: 'Please enter Name' }],
                                                  })(<Input placeholder="First Name" />)}
                                                </FormItem>
                                              </Col>

                                              <Col xs={24} sm={9}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Domain</label>
                                                  {getFieldDecorator('domain', {
                                                    rules: [{ required: true, message: 'Please select at least one Domain' }],
                                                  })(
                                                    <Select mode="single" placeholder="Please select" labelInValue onChange={this.handleChange}>
                                                      {domain}
                                                    </Select>
                                                  )}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={3}>
                                                <FormItem>
                                                  <label className="form-label mb-0" style={{ paddingTop: '37px' }} />
                                                  {getFieldDecorator('active', {
                                                    valuePropName: 'checked',
                                                    initialValue: false,
                                                  })(<Checkbox>Active</Checkbox>)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={3}>
                                                <FormItem>
                                                  <label className="form-label mb-0" style={{ paddingTop: '37px' }} />
                                                  {getFieldDecorator('hidden', {
                                                    valuePropName: 'checked',
                                                    initialValue: false,
                                                  })(<Checkbox>Hidden</Checkbox>)}
                                                </FormItem>
                                              </Col>
                                            </Row>

                                            <Row>
                                              <Col>
                                                <Row style={{ paddingBottom: '30px' }}>
                                                  <div className="utils__title">
                                                    <h5 className="font-weight-bold">Funnel Steps</h5>
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
                                                        <SortableList getFieldDecorator={getFieldDecorator} value={this.state.product} onSortEnd={onSortEnd} form={props.form} distance={2} removeFunnel={this.removeFunnel} productList={data.getAllProducts.product} />
                                                      </Col>
                                                    </Row>
                                                  );
                                                }
                                              }}
                                            </Query>
                                            <div className="form-actions">
                                              <Button htmlType="button" type="default" icon="user-add" size="large" className="utils__fullWidthButton mb-5" onClick={this.addTierPayout} disabled={addPayoutDisabled}>
                                                Add Funnel Step
                                              </Button>
                                              <Button htmlType="submit" type="primary" icon="shopping-cart" size="large" className="utils__fullWidthButton">
                                                Add Funnel
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
        </AntContent>
      </Layout>
    );
  }
}

export default AddFunnelPage;

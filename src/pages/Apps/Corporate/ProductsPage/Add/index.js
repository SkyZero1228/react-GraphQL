import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { InputNumber, Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import { v4 as uuidV4 } from 'uuid';
import { ADD_PRODUCT } from '../products.mutations';
import { GET_DOMAINS_AND_ROLES_FOR_SELECT } from '../products.queries';
import Helmet from 'react-helmet';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import Page from 'components/LayoutComponents/Page';

const FormItem = Form.Item;
const Option = Select.Option;
const AntContent = AntLayout.Content;

@Form.create()
@withRouter
class CorporateProductsAddRoute extends React.PureComponent {
  state = {
    confirmDirty: false,
    addPayoutDisabled: false,
    product: {
      name: '',
      amount: 0,
      domain: null,
      tierPayouts: [
        {
          id: uuidV4(),
          level: 1,
          commissionType: '',
          value: 0,
          daysToPayCommission: 0,
        },
      ],
    },
  };

  handleSubmit = (e, addUser) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.changeObjectKeyValue('key', 'id', values.domain);
      this.changeObjectKeyValue('label', 'tld', values.domain);
      if (!err) {
        addUser({ variables: { product: values } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully created a Product!',
            message: 'Product Created!',
          });
          this.props.history.push('/corporate/products');
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

  addTierPayout = () => {
    const { product } = this.state;
    let prod = Object.assign({}, product);
    prod.tierPayouts.unshift({
      id: null,
      level: prod.tierPayouts.length + 1,
      commissionType: '',
      value: 0,
      daysToPayCommission: 0,
    });

    this.setState({
      product: prod,
      addPayoutDisabled: true,
    });
  };

  renderTierPayouts = getFieldDecorator => {
    return this.state.product.tierPayouts.map((tierPayouts, index) => {
      return (
        <Fragment key={index}>
          <section className="card">
            <div className="card-body">
              <div className="card-title">
                <strong>{`Tier Payout Level ${index + 1}`}</strong>
              </div>
              <Row>
                <Col xs={24} sm={24}>
                  {getFieldDecorator(`tierPayouts[${index}].id`, {
                    initialValue: uuidV4(),
                  })(<span />)}

                  <FormItem hasFeedback>
                    <label className="form-label mb-0">Level</label>
                    {getFieldDecorator(`tierPayouts[${index}].level`, {
                      initialValue: index + 1,
                      rules: [{ required: true, message: 'Please enter Level' }],
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} disabled />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback>
                    <label className="form-label mb-0">Commission Type</label>
                    {getFieldDecorator(`tierPayouts[${index}].commissionType`, {
                      rules: [{ required: true, message: 'Please select a commission type' }],
                    })(
                      <Select placeholder="Please select a commission">
                        <Option value="fixedAmount">Fixed Amount</Option>
                        <Option value="percentage">Percentage</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback>
                    <label className="form-label mb-0">Value</label>
                    <span className="ant-input-affix-wrapper">
                      {getFieldDecorator(`tierPayouts[${index}].value`, {
                        rules: [{ required: true, message: 'Please enter the Value' }],
                      })(<InputNumber prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ width: '100%' }} />)}
                    </span>
                  </FormItem>
                </Col>

                <Col xs={24} sm={8}>
                  <FormItem hasFeedback>
                    <label className="form-label mb-0">Days To Pay Commission</label>
                    <span className="ant-input-affix-wrapper">
                      {getFieldDecorator(`tierPayouts[${index}].daysToPayCommission`, {
                        rules: [{ required: true, message: 'Please enter Days To Pay Commissions' }],
                      })(<InputNumber prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ width: '100%' }} />)}
                    </span>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </section>
          <hr />
        </Fragment>
      );
    });
  };

  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { addPayoutDisabled } = this.state;
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Dashboard" />
            <Query query={GET_DOMAINS_AND_ROLES_FOR_SELECT} variables={{ skip: 0, take: 128, searchText: '' }}>
              {({ loading, error, data }) => {
                if (loading) return <Spin delay="250" />;
                if (data.getAllDomainsRolesAndSorAccount.role) {
                  const domain = [];
                  const roles = [];
                  const sorAccount = [];
                  data.getAllDomainsRolesAndSorAccount.domain.map(val => {
                    return domain.push(<Option key={val.id}>{val.tld}</Option>);
                  });
                  data.getAllDomainsRolesAndSorAccount.role.map(val => {
                    return roles.push(<Option key={val}>{val}</Option>);
                  });
                  data.getAllDomainsRolesAndSorAccount.sorAccount.map(val => {
                    return sorAccount.push(<Option key={val}>{val}</Option>);
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
                                    <h4 className="font-weight-bold">Add Product</h4>
                                  </div>
                                </div>
                                <div>
                                  <Mutation mutation={ADD_PRODUCT}>
                                    {(editMe, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                      return (
                                        <React.Fragment>
                                          <Form onSubmit={e => this.handleSubmit(e, editMe)} className="login-form">
                                            <Row gutter={12}>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Name</label>
                                                  {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'Please enter Name' }],
                                                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                                                </FormItem>
                                              </Col>
                                              <Col xs={24} sm={12}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Price</label>
                                                  <span className="ant-input-affix-wrapper">
                                                    {getFieldDecorator('amount', {
                                                      rules: [{ required: true, message: 'Please enter Price' }],
                                                    })(<InputNumber prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Price" style={{ width: '100%' }} />)}
                                                  </span>
                                                </FormItem>
                                              </Col>
                                            </Row>
                                            <Row gutter={12}>
                                              <Col xs={8}>
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
                                              <Col xs={8}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">SOR Account</label>
                                                  {getFieldDecorator('sorAccount', {
                                                    rules: [{ required: false }],
                                                  })(
                                                    <Select defaultValue="None" mode="single" placeholder="Please select" onChange={this.handleChange}>
                                                      {sorAccount}
                                                    </Select>
                                                  )}
                                                </FormItem>
                                              </Col>
                                              <Col xs={8}>
                                                <FormItem hasFeedback>
                                                  <label className="form-label mb-0">Roles</label>
                                                  {getFieldDecorator('roles', {
                                                    rules: [{ required: false }],
                                                  })(
                                                    <Select mode="multiple" placeholder="Please select">
                                                      {roles}
                                                    </Select>
                                                  )}
                                                </FormItem>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <Row style={{ paddingBottom: '30px' }}>
                                                  <div className="utils__title">
                                                    <h5 className="font-weight-bold">Tier Payouts</h5>
                                                    <Button htmlType="button" type="primary" icon="user-add" size="large" className="utils__fullWidthButton" onClick={this.addTierPayout} disabled={addPayoutDisabled}>
                                                      Add Tier Payout
                                                    </Button>
                                                  </div>
                                                </Row>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>{this.renderTierPayouts(getFieldDecorator)}</Col>
                                            </Row>
                                            <div className="form-actions">
                                              <Button htmlType="submit" type="primary" icon="shopping-cart" size="large" className="utils__fullWidthButton">
                                                Add Product
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

export default CorporateProductsAddRoute;

import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { InputNumber, Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import { v4 as uuidV4 } from 'uuid';
import { EDIT_PRODUCT } from '../products.mutations';
import { GET_PRODUCTS_BY_ID } from '../products.queries';
import Helmet from 'react-helmet';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import Page from 'components/LayoutComponents/Page';
const FormItem = Form.Item;
const Option = Select.Option;
const AntContent = AntLayout.Content;

@Form.create()
@withRouter
class CorporateProductsEditRoute extends React.Component {
  state = {
    operation: '',
    addPayoutDisabled: false,
    product: {
      name: '',
      amount: 0,
      domain: null,
      tierPayouts: [],
    },
  };

  handleSubmit = (e, editProduct) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.changeObjectKeyValue('key', 'id', values.domain);
      this.changeObjectKeyValue('label', 'tld', values.domain);
      values.id = `products/${this.props.match.params.id}`;
      if (!err) {
        editProduct({ variables: { product: values } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully updated the Product!',
            message: 'Product Updated!',
          });
          this.props.history.push('/corporate/products');
        });
      }
    });
  };

  changeObjectKeyValue = (old_key, new_key, o) => {
    if ((old_key, new_key, o))
      if (old_key !== new_key && typeof o === 'object') {
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
      operation: 'Adding',
    });
  };

  renderTierPayouts = (getFieldDecorator, value = []) => {
    var tiers = Object.assign([], value);

    const { operation, product, addPayoutDisabled } = this.state;
    if (value.length > 1 && !addPayoutDisabled) {
      this.setState({
        addPayoutDisabled: true,
      });
    }
    if (operation === 'Adding' && value.length > 0) {
      tiers.push({
        id: null,
        level: tiers.length + 1,
        commissionType: '',
        value: 0,
        daysToPayCommission: 0,
      });
    }

    return tiers.map((tierPayouts, index) => {
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
                      initialValue: tierPayouts.level,
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
                      initialValue: tierPayouts.commissionType,
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
                        initialValue: tierPayouts.value,
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
                        initialValue: tierPayouts.daysToPayCommission,
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
    const children = [];
    const roles = [];
    const sorAccounts = [];
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Support" />

            <AntContent className="utils__content-image-wrapper">
              <Query query={GET_PRODUCTS_BY_ID} variables={{ id: `products/${this.props.match.params.id}` }} fetchPolicy="network-only">
                {({ loading, error, data }) => {
                  if (loading) return <Spin delay="250" />;
                  console.log(data);
                  if (data.getProductById && data.getProductById.product) {
                    data.getProductById.domain.map(val => {
                      return children.push(<Option key={val.id}>{val.tld}</Option>);
                    });
                    if (data.getProductById.role && data.getProductById.role.length > 0) {
                      data.getProductById.role.map(val => {
                        return roles.push(<Option key={val}>{val}</Option>);
                      });
                    }
                    if (data.getProductById.sorAccount && data.getProductById.sorAccount.length > 0) {
                      data.getProductById.sorAccount.map(val => {
                        return sorAccounts.push(<Option key={val}>{val}</Option>);
                      });
                    }

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
                                      <h4 className="font-weight-bold">Update Product</h4>
                                    </div>
                                  </div>
                                  <div>
                                    <Mutation mutation={EDIT_PRODUCT}>
                                      {(editMe, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                                        return (
                                          <React.Fragment>
                                            <Form onSubmit={e => this.handleSubmit(e, editMe)} className="login-form">
                                              <Row gutter={12}>
                                                <Col xs={24} sm={12}>
                                                  <FormItem hasFeedback>
                                                    <label className="form-label mb-0">Name</label>
                                                    {getFieldDecorator('name', {
                                                      initialValue: data.getProductById.product.name,
                                                      rules: [{ required: true, message: 'Please enter Name' }],
                                                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                                                  </FormItem>
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                  <FormItem hasFeedback>
                                                    <label className="form-label mb-0">Price</label>
                                                    <span className="ant-input-affix-wrapper">
                                                      {getFieldDecorator('amount', {
                                                        initialValue: data.getProductById.product.amount,
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
                                                      initialValue: { key: data.getProductById.product.domain.id, label: data.getProductById.product.domain.tld },
                                                      rules: [{ required: true, message: 'Please select at least one Domain' }],
                                                    })(
                                                      <Select mode="single" placeholder="Please select" labelInValue onChange={this.handleChange}>
                                                        {children}
                                                      </Select>
                                                    )}
                                                  </FormItem>
                                                </Col>

                                                <Col xs={8}>
                                                  <FormItem hasFeedback>
                                                    <label className="form-label mb-0">SOR Account</label>
                                                    {getFieldDecorator('sorAccount', {
                                                      initialValue: data.getProductById.product.sorAccount || [],
                                                      rules: [{ required: true, message: 'Please select at least one Domain' }],
                                                    })(
                                                      <Select mode="single" placeholder="Please select">
                                                        {sorAccounts}
                                                      </Select>
                                                    )}
                                                  </FormItem>
                                                </Col>
                                                <Col xs={8}>
                                                  <FormItem hasFeedback>
                                                    <label className="form-label mb-0">Roles</label>
                                                    {getFieldDecorator('roles', {
                                                      rules: [{ required: false }],
                                                      initialValue: data.getProductById.product.roles || [],
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
                                                <Col>{this.renderTierPayouts(getFieldDecorator, data.getProductById.product.tierPayouts)}</Col>
                                              </Row>
                                              <div className="form-actions">
                                                <Button htmlType="submit" type="primary" icon="shopping-cart" size="large" className="utils__fullWidthButton">
                                                  Edit Product
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
            </AntContent>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default CorporateProductsEditRoute;

import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query, ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Select, Input, InputNumber, Spin, Button, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
class Products extends React.Component {
  state = {
    funnelStepProducts: [],
    editing: false,
    currentFunnelStepProduct: {},
  };

  handleAdd = () => {
    console.log('adding');
    let products = this.state.funnelStepProducts;
    products.push({ promoCodes: [] });
    this.setState({ editing: true, funnelStepProducts: products });
  };

  handleDelete = (index, promoIndex) => {
    let funnelStepProducts = Object.assign([], this.state.funnelStepProducts);
    funnelStepProducts[index].promoCodes.splice(promoIndex, 1);
    this.setState({ funnelStepProducts });
  };

  handleEdit = index => {
    const product = this.state.funnelStepProducts[index];
    this.setState({ editing: true, funnelStepProduct: {} });
  };

  handleAddPromo = index => {
    let products = Object.assign([], this.state.funnelStepProducts);
    products[index].promoCodes.push({});
    this.setState({ funnelStepProducts: products });
  };

  render() {
    const {
      form: { getFieldDecorator },
      allProducts,
      sortIndex,
      funnel,
    } = this.props;
    const { funnelStepProducts, editing, currentFunnelStepProduct } = this.state;
    const products = [];
    allProducts.map(val => {
      return products.push(<Option key={val.id}>{val.displayName}</Option>);
    });

    console.log('funnel in products>index.tsx', funnel);
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} sm={12}>
            Products
          </Col>
          <Col xs={24} sm={12}>
            <Button onClick={this.handleAdd}>Add</Button>
          </Col>
        </Row>

        {funnel.products.map((funnelStepProduct, index) => {
          return (
            <Row key={index}>
              <Col sx={24}>
                <FormItem hasFeedback>
                  <label className="form-label mb-0">Product</label>
                  {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].product`, {
                    initialValue: funnel.id,
                    rules: [{ required: true, message: 'Please Select a Product' }],
                  })(
                    <Select mode="single" placeholder="Please select">
                      {products}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={9}>
                <Row>
                  <Col xs={24} sm={12}>
                    Promo Codes
                  </Col>
                  <Col xs={24} sm={12}>
                    <Button onClick={() => this.handleAddPromo(index)}>Add</Button>
                  </Col>
                </Row>
                <Row>
                  {funnelStepProduct.promoCodes.map((promoCode, promoIndex) => {
                    return (
                      <React.Fragment key={promoIndex}>
                        <Col xs={24}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Code</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].code`, {
                              initialValue: promoCode.code,
                              rules: [{ required: true, message: 'Please enter Code' }],
                            })(<Input placeholder="Code" />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={9}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Discount Type</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].discountType`, {
                              initialValue: promoCode.discountType,
                              rules: [{ required: true, message: 'Please enter Discount Type' }],
                            })(
                              <Select mode="single" placeholder="Please select">
                                <Option key="Percent">Percent</Option>
                                <Option key="Monetary">Monetary</Option>
                                <Option key="Product">Product</Option>
                                <Option key="Setup Fee">Setup Fee</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={9}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Discount Amount</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].discountAmount`, {
                              initialValue: promoCode.dicountAmount,
                              rules: [{ required: true, message: 'Please enter Discount Amount' }],
                            })(<InputNumber placeholder="Discount Amount" precision={2} />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={9}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Number Available</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].maxUse`, {
                              initialValue: promoCode.maxUse,
                              rules: [{ required: true, message: 'Please enter Number Available' }],
                            })(<InputNumber placeholder="Number Available" />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={9}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Start Date</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].startDate`, {
                              initialValue: promoCode.startDate,
                              rules: [{ required: true, message: 'Please enter Start Date' }],
                            })(<Input placeholder="Start Date" />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={9}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">End Date</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].endDate`, {
                              initialValue: promoCode.endDate,
                              rules: [{ required: true, message: 'Please enter Name' }],
                            })(<Input placeholder="First Name" />)}
                          </FormItem>
                        </Col>
                        <Col xs={24} sm={9}>
                          <FormItem hasFeedback>
                            <label className="form-label mb-0">Product</label>
                            {getFieldDecorator(`funnelSteps[${sortIndex}].products[${index}].promoCodes[${promoIndex}].product`, {
                              initialValue: promoCode.product,
                              rules: [{ required: true, message: 'Please enter Name' }],
                            })(
                              <Select mode="single" placeholder="Please select">
                                {products}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <div className="form-actions">
                          <Button htmlType="button" type="default" icon="user-add" size="large" className="utils__fullWidthButton mb-5" onClick={() => this.handleDelete(index, promoIndex)}>
                            Remove
                          </Button>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Products;

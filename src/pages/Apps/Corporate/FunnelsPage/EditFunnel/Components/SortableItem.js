import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Checkbox, InputNumber, Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import Products from '../../components/Products';
const FormItem = Form.Item;
const Option = Select.Option;
const SortableItem = SortableElement(({ getFieldDecorator, sortIndex, tierPayouts, form, removeFunnel, value, productList }) => {
  const removeFunnelByIndex = index => {
    removeFunnel(index, value);
  };
  const products = [];
  const selectedProducts = [];
  productList.map(val => {
    return products.push(
      <Option key={val.id}>
        {val.name} - {Number(val.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Option>
    );
  });
  if (tierPayouts.products && tierPayouts.products.length > 0)
    tierPayouts.products.map(product => {
      if (product && product.id) return selectedProducts.push(product.id);
      return null;
    });

  return (
    <li className="li-funnels" key={sortIndex}>
      <section className="card">
        <a style={{ textAlign: 'right', textDecoration: 'bold', marginRight: '10px', marginTop: '5px' }} onClick={() => removeFunnelByIndex(sortIndex)}>
          <Icon type="close" />
        </a>
        <div className="card-body" style={{ marginTop: '-25px' }}>
          <div className="card-title">
            <strong>{`Funnel Step Number ${sortIndex + 1}`}</strong>
          </div>
          {getFieldDecorator(`funnelSteps[${sortIndex}].stepOrder`, {
            initialValue: tierPayouts.stepOrder,
            rules: [{ required: true, message: 'Please enter Step Order' }],
          })(<span />)}

          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Url</label>
                {getFieldDecorator(`funnelSteps[${sortIndex}].url`, {
                  initialValue: tierPayouts.url,
                  rules: [{ required: true, message: 'Please enter Url' }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24} sm={24}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Next Funnel Step Url</label>
                {getFieldDecorator(`funnelSteps[${sortIndex}].nextFunnelStepUrl`, {
                  initialValue: tierPayouts.nextFunnelStepUrl,
                  rules: [{ required: true, message: 'Please enter Next Step Url' }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Products allProducts={productList} funnel={value} form={form} onProductAdd={this.handleProductAdd} sortIndex={sortIndex} />
            </Col>
          </Row>
        </div>
      </section>
    </li>
  );
});

export default SortableItem;

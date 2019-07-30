import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { GET_PRODUCTS_NAME } from '../AddFunnel.queries';
import { Checkbox, InputNumber, Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const SortableItem = SortableElement(({ getFieldDecorator, sortIndex, stepOrder, form, removeFunnel, productList }) => {
  const removeFunnelByIndex = index => {
    removeFunnel(index);
  };
  const products = [];
  productList.map(val => {
    return products.push(
      <Option key={val.id}>
        {val.name} - {Number(val.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Option>
    );
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
            initialValue: sortIndex,
            rules: [{ required: true, message: 'Please enter Step Order' }],
          })(<span />)}
          <Row />
          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Url</label>
                {getFieldDecorator(`funnelSteps[${sortIndex}].url`, {
                  rules: [{ required: true, message: 'Please enter Url' }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Products</label>
                <span className="ant-input-affix-wrapper">
                  {getFieldDecorator(`funnelSteps[${sortIndex}].products`, {
                    rules: [{ required: true, message: 'Please enter the Product Name' }],
                  })(
                    <Select mode="multiple" placeholder="Please select" onChange={this.handleChange}>
                      {products}
                    </Select>
                  )}
                </span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24} sm={24}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Next Funnel Step Url</label>
                {getFieldDecorator(`funnelSteps[${sortIndex}].nextFunnelStepUrl`, {
                  rules: [{ required: true, message: 'Please enter Next Step Url' }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
        </div>
      </section>
    </li>
  );
});

export default SortableItem;

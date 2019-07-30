import * as React from 'react';
import { Row, Col, Select, Form, Input, Checkbox, Button, Modal } from 'antd';
import * as uuid from 'uuid';
import TermsAndConditions from '../TermsAndConditions';
import { withCheckoutContext, ICheckoutContext } from '../../../providers/CheckoutProvider';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

import './index.styles.scss';

interface IProps {
  form: WrappedFormUtils;
}

class CreditCard extends React.PureComponent<IProps> {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className="creditCardWrapper">
        <Row>
          <Col className="flex-2-row-column">
            <FormItem hasFeedback>
              <label className="form-label mb-0">Credit Card Number</label>
              {getFieldDecorator('card.number', {
                rules: [
                  {
                    required: true,
                    message: 'Enter Credit Card Number',
                    whitespace: true,
                  },
                ],
              })(<Input type="textarea" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={8}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Exp. Month</label>
              {getFieldDecorator('card.month', {
                rules: [
                  {
                    required: true,
                    message: 'Expiration Month Required',
                    whitespace: true,
                  },
                ],
              })(
                <Select>
                  <Select.Option value="01">01</Select.Option>
                  <Select.Option value="02">02</Select.Option>
                  <Select.Option value="03">03</Select.Option>
                  <Select.Option value="04">04</Select.Option>
                  <Select.Option value="05">05</Select.Option>
                  <Select.Option value="06">06</Select.Option>
                  <Select.Option value="07">07</Select.Option>
                  <Select.Option value="08">08</Select.Option>
                  <Select.Option value="09">09</Select.Option>
                  <Select.Option value="10">10</Select.Option>
                  <Select.Option value="11">11</Select.Option>
                  <Select.Option value="12">12</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Exp. Year</label>
              {getFieldDecorator('card.year', {
                rules: [
                  {
                    required: true,
                    message: 'Expiration Year Required',
                    whitespace: true,
                  },
                ],
              })(
                <Select>
                  <Select.Option value="19">2019</Select.Option>
                  <Select.Option value="20">2020</Select.Option>
                  <Select.Option value="21">2021</Select.Option>
                  <Select.Option value="22">2022</Select.Option>
                  <Select.Option value="23">2023</Select.Option>
                  <Select.Option value="24">2024</Select.Option>
                  <Select.Option value="25">2025</Select.Option>
                  <Select.Option value="26">2026</Select.Option>
                  <Select.Option value="27">2027</Select.Option>
                  <Select.Option value="28">2028</Select.Option>
                  <Select.Option value="29">2029</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">CVC</label>
              {getFieldDecorator('card.cvc', { rules: [{ required: true, max: 4, min: 3 }] })(<Input type="number" />)}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreditCard;

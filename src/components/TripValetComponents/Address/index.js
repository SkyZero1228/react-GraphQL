import * as React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { withCheckoutContext, ICheckoutContext } from '../../../providers/CheckoutProvider';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

import './index.styles.scss';

interface Props {
  form: WrappedFormUtils;
}

interface IAccountState {
  confirmDirty: boolean;
}

class Address extends React.Component<Props> {
  state: IAccountState = {
    confirmDirty: false,
  };

  render() {
    let {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className="addressWrapper">
        <Row>
          <Col>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Address</label>
              {getFieldDecorator('address.address', { rules: [{ required: true, message: 'Enter Street Address' }] })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem hasFeedback>
              <label className="form-label mb-0">City</label>
              {getFieldDecorator('address.city', { rules: [{ required: true, message: 'Enter City' }] })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={12}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">State</label>
              {getFieldDecorator('address.state', { rules: [{ required: true, message: 'Enter State' }] })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Zip Code</label>
              {getFieldDecorator('address.zip', { rules: [{ required: true, message: 'Enter Last Zip Code' }] })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Address;

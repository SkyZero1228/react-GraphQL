import * as React from 'react';
import { Row, Col, Select, Form, Input, Checkbox, Button, Modal, Icon, DatePicker } from 'antd';
import * as uuid from 'uuid';
import TermsAndConditions from '../TermsAndConditions';
import { withCheckoutContext, ICheckoutContext } from '../../../providers/CheckoutProvider';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { DateTime } from 'luxon';
import { clone } from 'lodash';
import * as moment from 'moment';

import './index.styles.scss';

interface IProps {
  form: WrappedFormUtils;
}

const dateFormat = 'MM/DD/YYYY';

class CreditCard extends React.PureComponent<IProps> {
  state = {
    travelers: [
      {
        firstName: this.props.prospect.firstName,
        lastName: this.props.prospect.lastName,
        email: this.props.prospect.deliveryEndpoint,
        dateOfBirth: null,
        maritalStatus: null,
      },
    ],
  };

  addTraveler = () => {
    this.setState(state => ({ travelers: clone(state.travelers).concat([{ dateOfBirth: null }]) }));
  };

  removeTraveler = index => {
    console.log('index', index);
    const travelers = clone(this.state.travelers);
    console.log('travelers before', travelers);
    travelers.splice(index, 1);
    console.log('travelers after', travelers, moment());
    if (travelers.length === 0) {
      travelers.push({ dateOfBirth: null });
    }
    this.setState({ travelers });
    // this.props.form.setFieldsValue(([`travelers[${index}].dateOfBirth`]: null));
  };

  render() {
    const {
      form: { getFieldDecorator },
      prospect,
    } = this.props;
    console.log('travelers', this.state.travelers);

    return (
      <div className="travelersWrapper">
        {this.state.travelers.map((traveler, index) => (
          <React.Fragment key={index}>
            <Row type="flex" gutter={12}>
              <Col xs={24} sm={12} style={{ fontWeight: 700, fontSize: 14, paddingBottom: 10 }}>
                Traveler #{index + 1}
              </Col>
              <Col xs={24} sm={12} style={{ fontWeight: 700, fontSize: 14, paddingBottom: 10, textAlign: 'right' }}>
                <Button type="danger" icon="delete" size="small" onClick={() => this.removeTraveler(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <FormItem hasFeedback>
                  <label className="form-label mb-0">First Name</label>
                  {getFieldDecorator(`travelers[${index}].firstName`, {
                    initialValue: traveler.firstName,
                    rules: [{ required: true, message: 'Please enter First Name' }],
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                </FormItem>
              </Col>
              <Col xs={12}>
                <FormItem hasFeedback>
                  <label className="form-label mb-0">Last Name</label>
                  {getFieldDecorator(`travelers[${index}].lastName`, {
                    initialValue: traveler.lastName,
                    rules: [{ required: true, message: 'Please enter Last Name' }],
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <FormItem hasFeedback>
                  <label className="form-label mb-0">Date of Birth</label>
                  {getFieldDecorator(`travelers[${index}].dateOfBirth`, {
                    initialValue: traveler.dateOfBirth ? moment(traveler.dateOfBirth) : null,
                    rules: [{ required: true, message: 'Please enter Date of Birth' }],
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
              <Col xs={12}>
                <FormItem hasFeedback>
                  <label className="form-label mb-0">Marital Status</label>
                  {getFieldDecorator(`travelers[${index}].maritalStatus`, {
                    initialValue: traveler.maritalStatus,
                    rules: [{ required: true, message: 'Please enter Marital Status' }],
                  })(
                    <Select>
                      <Select.Option value="Single">Single</Select.Option>
                      <Select.Option value="Married">Married</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            {this.state.travelers.length < 2 && (
              <Row>
                <Col xs={24}>
                  <Button size="small" icon="plus" onClick={this.addTraveler}>
                    Add Additional Traveler
                  </Button>
                </Col>
              </Row>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default CreditCard;

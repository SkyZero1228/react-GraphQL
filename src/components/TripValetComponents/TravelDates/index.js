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
const { RangePicker } = DatePicker;

interface IProps {
  form: WrappedFormUtils;
}

const dateFormat = 'MM/DD/YYYY';

class CreditCard extends React.PureComponent<IProps> {
  // state = {
  //   travelers: [
  //     {
  //       firstName: this.props.prospect.firstName,
  //       lastName: this.props.prospect.lastName,
  //       email: this.props.prospect.deliveryEndpoint,
  //       dateOfBirth: null,
  //       maritalStatus: null,
  //     },
  //   ],
  // };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className="travelersWrapper">
        <React.Fragment>
          <Row gutter={12}>
            <Col xs={12}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Preferred Date</label>
                {getFieldDecorator(`preferredDates`, {
                  // initialValue: traveler.firstName,
                  rules: [{ required: true, message: 'Please select Preferred Dates' }],
                })(<RangePicker />)}
              </FormItem>
            </Col>
            <Col xs={12}>
              <FormItem hasFeedback>
                <label className="form-label mb-0">Alternate Date</label>
                {getFieldDecorator('alternateDates', {
                  // initialValue: traveler.lastName,
                  rules: [{ required: true, message: 'Please select Alternate Dates' }],
                })(<RangePicker />)}
              </FormItem>
            </Col>
          </Row>
        </React.Fragment>
      </div>
    );
  }
}

export default CreditCard;

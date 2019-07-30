import * as React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { some } from 'lodash';

import './index.styles.scss';
import { Checkbox } from '../../../../../node_modules/antd/lib/index';

interface Props {
  form: WrappedFormUtils;
  payments: { type: string }[];
}

interface IAccountState {
  confirmDirty: boolean;
  payActivation: boolean;
  payReservation: boolean;
}

class PaymentOptions extends React.Component<Props> {
  state: IAccountState = {
    confirmDirty: false,
    payActivation: !some(this.props.payments, payment => payment.type === 'Activation'),
    payReservation: !some(this.props.payments, payment => payment.type === 'Reservation'),
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.checked });
    console.log(`checked = ${e.target.checked}`);
    console.log('which', e.target.id);
    console.log(`target = ${JSON.stringify(e.target, null, 2)}`);
  };

  getTotalPayment = () => {
    let amount: number = 0;
    const mustPayActivation = !some(this.props.payments, payment => payment.type === 'Activation');
    const mustPayReservation = !some(this.props.payments, payment => payment.type === 'Reservation');
    if (this.state.payActivation) amount += 17.95;
    if (this.state.payReservation) amount += 99;
    return amount.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  validateReservation = (rule, value, callback) => {
    const hasPaidActivation = some(this.props.payments, payment => payment.type === 'Activation');
    if (hasPaidActivation) {
      const form = this.props.form;
      if (!form.getFieldValue('payReservation')) {
        callback('You must pay the Reservation Fee');
      } else {
        callback();
      }
    } else callback();
  };

  render() {
    let {
      form: { getFieldDecorator },
      payments,
    } = this.props;
    const { payActivation, payReservation } = this.state;

    console.log('payments', payments);
    const mustPayActivation = !some(payments, payment => payment.type === 'Activation');
    const mustPayReservation = !some(payments, payment => payment.type === 'Reservation');
    console.log('mustPayActivation', mustPayActivation);
    console.log('mustPayReservation', mustPayReservation);

    return (
      <div className="addressWrapper">
        {!mustPayActivation && !mustPayReservation ? (
          <React.Fragment>
            <Row>
              <Col style={{ fontWeight: 700, fontSize: 22, textAlign: 'center' }}>You have completed all Payments! Enjoy your Trip!</Col>
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row>
              <Col>
                <FormItem>
                  {getFieldDecorator('payActivation', {
                    initialValue: payActivation || mustPayActivation,
                  })(
                    <Checkbox checked={payActivation || !mustPayActivation} disabled={true}>
                      {mustPayActivation ? '$17.95' : '$0.00 (Already Paid)'} Las Vegas Activation Fee (Required)
                    </Checkbox>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem>
                  {getFieldDecorator('payReservation', {
                    initialValue: payReservation || mustPayReservation,
                    rules: [{ validator: this.validateReservation }],
                  })(
                    <Checkbox checked={payReservation} onChange={this.onChange} disabled={!payReservation && !mustPayReservation}>
                      {mustPayReservation ? '$99.00' : '$0.00 (Already Paid)'} Las Vegas Reservation Fee
                    </Checkbox>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <a
                  href="https://s3.us-east-2.amazonaws.com/com.tripvalet.incentives/certificates/VEGAS-REDEMPTION-4-17-19.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  General Terms and Conditions
                </a>
              </Col>
            </Row>
            <Row>
              <Col className="totalAmountDue">Total To Be Charged ${this.getTotalPayment()}</Col>
            </Row>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default PaymentOptions;

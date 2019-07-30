import React, { PureComponent } from 'react';
import { Radio, Icon, Steps, Button, message } from 'antd';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import StepNavigation from '../StepNavigation';
import DateSelection from './DateSelection/index';
import Guests from './Guests';
import Excursions from './Excursions';
import Payment from './Payment';
import Done from './Done';
import './OrderWizard.styles.scss';

const Step = Steps.Step;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const steps = [
  {
    title: 'Guests',
  },
  {
    title: 'Date',
  },
  {
    title: 'Excursions',
  },
  {
    title: 'Payment',
  },
  {
    title: 'Complete',
  },
];

@withCheckoutContext
export default class OrderWizard extends PureComponent {
  state = {
    answered: false,
    haveAccount: false,
  };

  render() {
    const { answered, haveAccount } = this.state;
    const {
      reservation: { user },
      current,
    } = this.props.checkout;
    const { trip } = this.props;
    return (
      <div className="OrderWizard">
        <Steps current={current} className="OrderWizard__Steps">
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        {current === 0 && (
          <div className="OrderWizard__StepsContentContainer">
            <Guests />
          </div>
        )}
        {current === 1 && (
          <div className="OrderWizard__StepsContentContainer">
            <DateSelection dates={trip.dates} />
          </div>
        )}
        {current === 2 && (
          <div className="OrderWizard__StepsContentContainer">
            <Excursions />
          </div>
        )}
        {current === 3 && (
          <div className="OrderWizard__StepsContentContainer">
            <Payment />
          </div>
        )}
        {current === 4 && (
          <div className="OrderWizard__StepsContentContainer">
            <Done />
          </div>
        )}
      </div>
    );
  }
}

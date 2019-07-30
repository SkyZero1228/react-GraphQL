import React, { PureComponent } from 'react';
import { Radio, Icon, Steps, Button, message } from 'antd';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import StepNavigation from '../../../../../../pages/DefaultPages/Trips/Components/TripCheckout/StepNavigation';
import DateSelection from '../../../../../../pages/DefaultPages/Trips/Components/TripCheckout/OrderWizard/DateSelection/index'; //'./DateSelection/index';
import Guests from '../../../../../../pages/DefaultPages/Trips/Components/TripCheckout/OrderWizard/Guests';
import Excursions from '../../../../../../pages/DefaultPages/Trips/Components/TripCheckout/OrderWizard/Excursions';
import Payment from '../../../../../../pages/DefaultPages/Trips/Components/TripCheckout/OrderWizard/Payment';
import Done from '../../../../../../pages/DefaultPages/Trips/Components/TripCheckout/OrderWizard/Done';
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
    title: 'Complete',
  },
];

@withCheckoutContext
export default class ReservationOrderWizard extends PureComponent {
  state = {
    answered: false,
    haveAccount: false,
  };

  componentDidMount() {
    this.props.checkout.setReservation(this.props.reservation);
  }

  render() {
    const { answered, haveAccount } = this.state;
    const {
      reservation: { user, notes },
      current,
    } = this.props.checkout;
    const { trip } = this.props;
    return (
      <div className="OrderWizard">
        <Steps current={current} className="OrderWizard__Steps">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {current === 0 && (
          <div className="OrderWizard__StepsContentContainer">
            <div style={{ fontWeight: 'bold', fontSize: 18, padding: 10, marginBottom: 20, border: 'solid 1px #e4e9f0', borderRadius: 7, backgroundColor: '#f6f6f6' }}>
              <div styles={{ paddingBottom: 20 }}>Notes:</div>
              <div styles={{ paddingBottom: 20 }}>{notes ? notes : 'No Notes'}</div>
            </div>
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
            <Done />
          </div>
        )}
      </div>
    );
  }
}

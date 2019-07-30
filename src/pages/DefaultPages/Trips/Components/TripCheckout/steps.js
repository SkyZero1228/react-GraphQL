import React, { PureComponent } from 'react';
import { Steps, Button, message } from 'antd';
import { CheckoutContext, withCheckoutContext } from 'providers/CheckoutProvider';
import { TripContext } from 'providers/TripProvider';
import DateSelection from './DateSelection';
import UserWizard from './UserWizard';
import StepNavigation from './StepNavigation';

import './index.styles.scss';
const Step = Steps.Step;

const steps = [
  {
    title: 'When',
  },
  {
    title: 'Who',
  },
  {
    title: 'Excursions',
  },
  {
    title: 'Payment',
  },
  {
    title: 'Done',
  },
];

class TripCheckout extends PureComponent {
  state = {
    isLoggedIn: false,
    current: 0,
  };

  setDate = date => {
    this.props.checkout.setDate(date);
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { isLoggedIn, current } = this.state;
    const {
      order: { user, date },
    } = this.props.checkout;
    return (
      <TripContext.Consumer>
        {trip => {
          return (
            <React.Fragment>
              <div className="TripCheckout">
                <div className="TripCheckout__Title">Let's Get Started</div>

                <Steps size="small" current={current}>
                  {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                      Previous
                    </Button>
                  )}
                </div>
                <StepNavigation disabled={false} next={this.next} />
                {!user ? (
                  <div>UserWizard</div>
                ) : !date ? (
                  <React.Fragment>
                    <div className="TripCheckout__SubTitle">Choose a Date</div>
                    <DateSelection dates={trip.dates} setDate={this.setDate} />
                  </React.Fragment>
                ) : (
                  <div>Next</div>
                )}
              </div>
            </React.Fragment>
          );
        }}
      </TripContext.Consumer>
    );
  }
}

export default withCheckoutContext(TripCheckout);

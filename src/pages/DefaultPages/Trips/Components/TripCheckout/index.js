import React, { PureComponent } from 'react';
import { Steps, Button, message, Radio } from 'antd';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import { TripContext } from 'providers/TripProvider';
import DateSelection from './DateSelection';
import DepositWizard from './DepositWizard/OrderWizard';
import MemberLogin from './Member/MemberLogin';
import NonMemberCreateAccount from './NonMember/NonMemberCreateAccount';
import StepNavigation from './StepNavigation';

import './index.styles.scss';
import OrderWizard from './OrderWizard/OrderWizard';
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@withCheckoutContext
class TripCheckout extends PureComponent {
	state = {
		answered: false,
		haveAccount: true,
		isLoggedIn: false,
	};

	handleHaveAnAccount = e => {
		this.setState(state => ({
			...state,
			answered: true,
			haveAccount: e.target.value === 'Yes' ? true : false,
		}));
	};

	render() {
		const { isLoggedIn, answered, haveAccount } = this.state;
		const {
			reservation: { user, date },
		} = this.props.checkout;
		return (
			<React.Fragment>
				<div className="TripCheckout">
					{!user ? (
						<React.Fragment>
							<div className="TripCheckout__Title">Let's Get Started</div>
							<div className="text-center">
								<div className="TripCheckout__SubTitle">Do you already have an Account?</div>
								<RadioGroup size="large" defaultValue="Yes" onChange={this.handleHaveAnAccount}>
									<RadioButton className="TripCheckout__RadioGroupButtonText" value="Yes">
										<i className="fa fa-thumbs-up" /> Yes
                  </RadioButton>
									<RadioButton className="TripCheckout__RadioGroupButtonText" value="No">
										<i className="fa fa-thumbs-down" /> No
                  </RadioButton>
								</RadioGroup>
							</div>
							{haveAccount ? <MemberLogin /> : <NonMemberCreateAccount />}
						</React.Fragment>
					) : (
							<OrderWizard />
						)}
				</div>
			</React.Fragment>
		);
	}
}

export default TripCheckout;

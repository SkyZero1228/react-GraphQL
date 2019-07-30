import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import find from 'lodash/find';
import omit from 'lodash/omit';
import { DateTime } from 'luxon';
import { withCheckoutContext } from 'providers/CheckoutProvider';

const RadioGroup = Radio.Group;

@withCheckoutContext
export default class ExcursionSelected extends PureComponent {
  state = {
    excursionPrice: 0,
  };

  componentWillMount = () => {
    const {
      addOn: { excursion, excursionDate, time },
      checkout: {
        reservation: { guests },
      },
    } = this.props;
    this.setState(state => ({
      excursionPrice: time.price * guests.length,
    }));
  };

  render() {
    const {
      addOn: { excursion, excursionDate, time },
      checkout: {
        reservation: { date, guests },
      },
    } = this.props;
    const { excursionPrice } = this.state;

    return (
      <div key={excursion.id} className="OrderWizard__Excursions__CheckoutReview">
        <img src={excursion.imageUrl} className="OrderWizard__Excursions__CheckoutReview__Image" alt={excursion.what} />
        <div className="OrderWizard__Payment__CheckoutReview__Content__Wrapper">
          <div className="OrderWizard__Payment__CheckoutReview__Content__Wrapper__What">{excursion.what}</div>
          <div className="OrderWizard__Payment__CheckoutReview__Content__Wrapper__When">{DateTime.fromISO(excursionDate.day, { setZone: 'local' }).toFormat('DDDD')}</div>
          <div className="OrderWizard__Payment__CheckoutReview__Content__Wrapper__Times">
            {DateTime.fromISO(time.start, { setZone: 'local' }).toFormat('t')} - {DateTime.fromISO(time.end, { setZone: 'local' }).toFormat('t')} : ${time.price.toFixed(2)} Per Guest
          </div>
          <div className="OrderWizard__Payment__CheckoutReview__Content__Wrapper__Price">PRICE: ${excursionPrice.toLocaleString('en')}.00</div>
        </div>
      </div>
    );
  }
}

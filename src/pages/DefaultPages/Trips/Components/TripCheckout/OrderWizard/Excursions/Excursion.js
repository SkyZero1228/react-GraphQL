import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import find from 'lodash/find';
import omit from 'lodash/omit';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import { DateTime } from 'luxon';

const RadioGroup = Radio.Group;

@withCheckoutContext
export default class Excursion extends PureComponent {
  state = {
    excursionPrice: 0,
  };

  componentWillMount = () => {
    const {
      excursionExtra,
      checkout: {
        reservation: { guests },
      },
    } = this.props;
    if (excursionExtra) {
      this.setState(state => ({
        excursionPrice: excursionExtra.time.price * guests.length,
      }));
    }
  };

  // componentWillReceiveProps = nextProps => {
  //   console.log('nextProps', nextProps);
  //   if (!nextProps.excursionExtra) {
  //     console.log('nextProps - setting State');
  //     this.setState(state => ({
  //       excursionPrice: 0,
  //     }));
  //   }
  // };

  timeChanged = e => {
    e.preventDefault();
    const selected = e.target.value === 'No' ? false : true;
    const {
      checkout: {
        reservation: { date, guests },
      },
      excursion,
      excursionExtra,
    } = this.props;

    if (selected) {
      const excursionDate = find(excursion.dates, { tripDateId: date.id });
      let time = find(excursionDate.times, { id: e.target.value });
      this.setState(state => ({
        excursionPrice: time ? time.price * guests.length : 0,
      }));

      const excursionExtra = {
        excursion: omit(excursion, ['__typename', 'dates', 'description', 'includes', 'restrictions', 'times', 'included']),
        excursionDate: omit(excursionDate, ['__typename', 'times']),
        time: omit(time, ['__typename', 'cost']),
      };
      this.props.selectExcursionExtra(excursionExtra);
    } else {
      this.props.removeExcursionExtra(excursion.id);
      this.setState(state => ({
        excursionPrice: 0,
      }));
    }
  };

  render() {
    const {
      excursion,
      excursionExtra,
      checkout: {
        reservation: { date, guests },
      },
    } = this.props;
    const excursionDate = find(excursion.dates, { tripDateId: date.id });
    const { excursionPrice } = this.state;

    return (
      <div key={excursion.id} className="OrderWizard__Excursions">
        <img src={excursion.imageUrl} className="OrderWizard__Excursions__Image" alt={excursion.what} />
        <div className="OrderWizard__Excursions__Wrapper">
          <div className="OrderWizard__Excursions__Wrapper__What">{excursion.what}</div>
          <div className="OrderWizard__Excursions__Wrapper__When">{DateTime.fromISO(excursionDate.day, { setZone: 'local' }).toFormat('DDDD')}</div>
          <div className="OrderWizard__Excursions__Wrapper__Times">
            <RadioGroup className="OrderWizard__Excursions__Wrapper__RadioTimes" name="times" size="small" onChange={this.timeChanged}>
              {excursionDate.times.map(time => {
                let checked = false;
                if (excursionExtra && excursionExtra.time.id === time.id) {
                  checked = true;
                }
                return (
                  <Radio key={time.id} value={time.id} checked={checked}>
                    {DateTime.fromISO(time.start, { setZone: 'local' }).toFormat('t')} - {DateTime.fromISO(time.end, { setZone: 'local' }).toFormat('t')} : ${time.price.toFixed(2)} Per Guest
                  </Radio>
                );
              })}
              <Radio value="No" checked={excursionExtra ? false : true}>
                Skip For Now
              </Radio>
            </RadioGroup>
          </div>
          <div className="OrderWizard__Excursions__Wrapper__Price">PRICE: ${excursionPrice.toFixed(2)}</div>
        </div>
      </div>
    );
  }
}

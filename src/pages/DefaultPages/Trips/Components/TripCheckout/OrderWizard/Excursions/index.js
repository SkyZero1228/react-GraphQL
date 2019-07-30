import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import omit from 'lodash/omit';
import omitDeep from 'omit-deep-lodash';
import moment from 'moment';
import { Radio, Form, notification } from 'antd';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import Excursion from './Excursion';
import StepNavigation from '../../StepNavigation';
import { UPDATE_RESERVATION_EXCURSION_EXTRAS } from '../OrderWizard.mutations';

const RadioGroup = Radio.Group;

@withCheckoutContext
export default class Excursions extends PureComponent {
  state = {
    excursionExtras: [],
  };

  componentWillMount = () => {
    this.setState(state => ({
      ...state,
      excursionExtras: this.props.checkout.reservation.excursionExtras,
    }));
  };

  setExcursionExtras = excursionExtras => {
    const {
      checkout: { setExcursionExtras },
    } = this.props;
    setExcursionExtras(excursionExtras);
  };

  handleSelectExcursionExtra = excursionExtra => {
    const newExcursionExtras = filter(this.state.excursionExtras, item => {
      return item.excursionDate.id !== excursionExtra.excursionDate.id;
    });
    let excursionExtras = [...newExcursionExtras, excursionExtra];
    this.setState(state => ({
      excursionExtras,
    }));
    this.setExcursionExtras(excursionExtras);
  };

  handleRemoveExcursionExtra = id => {
    const newExcursionExtras = filter(this.state.excursionExtras, item => {
      return item.excursion.id !== id;
    });
    this.setState(state => ({
      excursionExtras: [...newExcursionExtras],
    }));
    this.setExcursionExtras(newExcursionExtras);
  };

  handleSubmit = (e, updateReservationExcursionExtras) => {
    e.preventDefault();
    const { excursionExtras } = this.state;
    let {
      checkout: {
        reservation: { id },
        setReservation,
        next,
      },
    } = this.props;
    if (excursionExtras) {
      updateReservationExcursionExtras({ variables: { id, excursionExtras: excursionExtras } })
        .then(data => {
          notification.open({
            type: 'success',
            description: 'Successfully updated your Trip Excursions!',
            message: 'Trip Excursions',
          });
          this.props.checkout.setReservation(omitDeep(data.data.updateReservationExcursionExtras, ['__typename']));
          // this.props.form.resetFields();
          next();
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  render() {
    const {
      trip: { excursions },
      checkout: {
        reservation: { setExcursionExtras, guests, excursionExtras, date },
        next,
        previous,
      },
    } = this.props;
    return (
      <Mutation mutation={UPDATE_RESERVATION_EXCURSION_EXTRAS}>
        {(updateReservationExcursionExtras, { data, loading, error }) => {
          if (error) {
            return <div>{error}</div>;
          }
          return (
            <Form layout="vertical" onSubmit={e => this.handleSubmit(e, updateReservationExcursionExtras)}>
              {excursions.map(excursion => {
                const excursionExtraIndex = findIndex(excursionExtras, excursionExtra => {
                  return excursionExtra.excursion.id === excursion.id;
                });
                const excursionExtra = excursionExtraIndex >= 0 ? excursionExtras[excursionExtraIndex] : null;
                return <Excursion key={excursion.id} excursion={excursion} excursionExtra={excursionExtra} selectExcursionExtra={this.handleSelectExcursionExtra} removeExcursionExtra={this.handleRemoveExcursionExtra} />;
              })}
              <StepNavigation nextAsSubmit={next} previous={previous} />
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

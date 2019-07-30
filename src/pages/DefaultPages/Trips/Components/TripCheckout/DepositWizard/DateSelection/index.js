import React, { PureComponent } from 'react';
import { Radio, Row, Col, Form, notification } from 'antd';
import { Mutation } from 'react-apollo';
import moment from 'moment-timezone';
import omit from 'lodash/omit';
import omitDeep from 'omit-deep-lodash';
import find from 'lodash/find';
import includes from 'lodash/includes';
import { DateTime } from 'luxon';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import StepNavigation from '../../StepNavigation';
import NumberSpinner from 'components/TripValetComponents/Common/NumberSpinner';
import { UPDATE_RESERVATION_DATE } from '../OrderWizard.mutations';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@withCheckoutContext
export default class DateSelection extends PureComponent {
  state = {
    dateSelected: false,
    selectedDate: null,
    adjustedDate: null,
    extraDaysBefore: 0,
    extraDaysAfter: 0,
    extraDaysBeforeCost: 0,
    extraDaysAfterCost: 0,
    extraDates: false,
  };

  componentWillMount = () => {
    const {
      trip: {
        dates,
        hotel: { rooms },
      },
      checkout: {
        reservation: { user, date },
        setDate,
      },
    } = this.props;

    const role = find(user.roles, role => {
      return role === 'TV VIP' || role === 'TV PLUS' || role === 'Non-Member';
    });

    const pricing = find(rooms[0].pricing, { role: role });
    let dateFromState = date ? { ...date } : {};
    if (date || dates.length === 1) {
      if (!date && dates.length === 1) {
        dateFromState = {
          ...dates[0],
          extraDaysAfter: 0,
          extraDaysBefore: 0,
        };
      }
      this.setState(state => ({
        dateSelected: true,
        selectedDate: find(dates, { id: dateFromState.id }),
        adjustedDate: omit(dateFromState, ['status', '__typename']),
        extraDaysAfter: dateFromState ? dateFromState.extraDaysAfter : 0,
        extraDaysBefore: dateFromState ? dateFromState.extraDaysBefore : 0,
        role,
        pricing: omit(pricing, ['__typename']),
      }));

      setDate({
        ...omit(dateFromState, ['status', '__typename']),
        pricing: omit(pricing, ['__typename']),
      });
    } else {
      this.setState(state => ({
        pricing: omit(pricing, ['__typename']),
      }));
    }
  };

  handleDateClicked = e => {
    const {
      reservation: { date },
    } = this.props.checkout;

    const index = e.target.value;
    const selectedDate = omit(find(this.props.dates, { id: index }), ['__typename', 'status']);
    let adjustedDate = {
      ...selectedDate,
      pricing: date ? date.pricing : this.state.pricing,
    };
    adjustedDate.extraDaysAfter = this.state.extraDaysAfter;
    adjustedDate.extraDaysBefore = this.state.extraDaysBefore;
    adjustedDate.start = moment
      .tz(adjustedDate.start, 'America/New_York')
      .subtract(adjustedDate.extraDaysBefore, 'days')
      .toISOString();
    adjustedDate.end = moment
      .tz(adjustedDate.end, 'America/New_York')
      .add(adjustedDate.extraDaysAfter, 'days')
      .toISOString();
    this.setState(state => ({ dateSelected: true, selectedDate, selectedDateIndex: index, adjustedDate }));
    this.setDate(adjustedDate);
  };

  handleExtraDates = e => {
    const extraDates = e.target.value === 'Yes' ? true : false;
    let newDate = this.state.adjustedDate;
    if (!extraDates) {
      const {
        reservation: { date },
      } = this.props.checkout;
      const { selectedDate, adjustedDate } = this.state;

      newDate = {
        ...date,
        id: selectedDate.id,
        days: selectedDate.days,
        start: selectedDate.start,
        end: selectedDate.end,
        extraDaysBefore: 0,
        extraDaysAfter: 0,
      };

      this.setDate(newDate);
    }

    this.setState(state => ({
      ...state,
      adjustedDate: newDate,
      extraDaysBefore: extraDates ? state.extraDaysBefore : 0,
      extraDaysAfter: extraDates ? state.extraDaysAfter : 0,
      extraDates,
    }));
  };

  setDate = date => {
    this.props.checkout.setDate(date);
  };

  updateStartDate = number => {
    const { selectedDate, adjustedDate } = this.state;
    const {
      reservation: { date },
    } = this.props.checkout;
    const startDate = moment(selectedDate.start).subtract(number, 'days');
    let newDate = {
      ...date,
      id: selectedDate.id,
      days: moment(adjustedDate.end).diff(startDate, 'days') + 1,
      start: startDate.toISOString(),
      end: adjustedDate.end,
      extraDaysBefore: number,
      extraDaysAfter: adjustedDate.extraDaysAfter,
    };
    this.setState(state => ({
      adjustedDate: newDate,
      extraDaysBefore: number,
    }));

    this.setDate(newDate);
  };

  updateEndDate = number => {
    const { selectedDate, adjustedDate } = this.state;
    const {
      reservation: { date },
    } = this.props.checkout;
    const endDate = moment(selectedDate.end).add(number, 'days');
    let newDate = {
      ...date,
      id: selectedDate.id,
      days: endDate.diff(moment(adjustedDate.start), 'days') + 1,
      start: adjustedDate.start,
      end: endDate.toISOString(),
      extraDaysBefore: adjustedDate.extraDaysBefore,
      extraDaysAfter: number,
    };
    this.setState(state => ({
      adjustedDate: newDate,
      extraDaysAfter: number,
    }));
    this.setDate(newDate);
  };

  renderDateAsk = (month, totalExtraDays) => {
    const {
      trip: { dates },
      checkout: {
        reservation: { date },
      },
    } = this.props;

    return (
      <React.Fragment>
        <h2>
          Your {month} Trip Dates are: {DateTime.fromISO(dates[0].start, { setZone: 'local' }).toFormat('LLLL d')} - {DateTime.fromISO(dates[0].end, { setZone: 'local' }).toFormat('d')}
        </h2>
      </React.Fragment>
    );
  };

  handleSubmit = (e, updateReservationDate) => {
    e.preventDefault();
    const { adjustedDate } = this.state;
    let {
      checkout: {
        reservation: { id },
        setReservation,
        next,
      },
    } = this.props;
    if (adjustedDate) {
      updateReservationDate({ variables: { id, date: adjustedDate } }).then(data => {
        notification.open({
          type: 'success',
          description: 'Successfully updated your Travel Dates!',
          message: 'Date Selection',
        });
        this.props.checkout.setReservation(omitDeep(data.data.updateReservationDate, ['__typename']));
        // this.props.form.resetFields();
        next();
      });
    }
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     let {
    //       checkout: {
    //         reservation: { id, date, guests, willingToRoom },
    //         setReservation,
    //         next,
    //       },
    //     } = this.props;
    //     updateReservationGuests({ variables: { id, guests: values.guests, willingToRoom } }).then(data => {
    //       notification.open({
    //         type: 'success',
    //         description: 'Successfully updated your Guest List!',
    //         message: 'Guest List',
    //       });
    //       console.log('updateReservationGuests', data.data.updateReservationGuests);
    //       this.props.checkout.setReservation(data.data.updateReservationGuests);
    //       this.props.form.resetFields();
    //       next();
    //     });
    //   }
    // });
  };

  render() {
    const {
      trip: {
        dates,
        hotel: { rooms },
      },
      checkout: {
        reservation: { user, date, willingToRoom },
        next,
        previous,
      },
    } = this.props;
    const { dateSelected, adjustedDate, extraDaysBefore, extraDaysAfter, role, pricing, extraDates } = this.state;
    const totalExtraDays = extraDaysBefore + extraDaysAfter;
    const month = dates.length === 1 ? DateTime.fromISO(dates[0].start, { setZone: 'local' }).toFormat('LLLL') : null;
    const pricePerNight = willingToRoom ? (dateSelected ? pricing.extraPricePerNightPerPerson : 0) : dateSelected ? pricing.extraPricePerNight : 0;

    return (
      <Mutation mutation={UPDATE_RESERVATION_DATE}>
        {(updateReservationDate, { data, loading, error }) => {
          if (error) {
            return <div>{error}</div>;
          }
          return (
            <Row>
              <Col>
                <section className="card">
                  <Form layout="vertical" onSubmit={e => this.handleSubmit(e, updateReservationDate)}>
                    <div className="card-header">
                      <div className="utils__title">
                        <strong>{dates.length === 1 ? `Your ${month} Trip` : 'Choose a Date'}</strong>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="text-center OrderWizard__DateSelection">
                        <div className="OrderWizard__DateSelection__AddOnDates">
                          {dates.length > 1 && (
                            <React.Fragment>
                              <Row>
                                <Col xs={24} sm={24} className="OrderWizard__DateSelection__RadioNumberSpinner">
                                  <div className="OrderWizard__DateSelection__AddOnDates__Header">Select Which Escape Trip Dates</div>
                                  <RadioGroup className="my-3 text-left" defaultValue={date ? date.id : ''} size="large" onChange={this.handleDateClicked}>
                                    {dates.map((date, index) => {
                                      const start = DateTime.fromISO(date.start, { setZone: 'local' }).toFormat('LLLL d');
                                      const end = DateTime.fromISO(date.end, { setZone: 'local' }).toFormat('d');
                                      return (
                                        <Radio key={date.id} className="TripCheckout__RadioGroupText" value={date.id}>
                                          {start} - {end} <span style={{ fontSize: '10px', position: 'relative', top: '-3px' }}>( ${pricing.pricePerRoomPerPerson.toLocaleString({ currency: 'USD' })}.00 / Person )</span>
                                        </Radio>
                                      );
                                    })}
                                  </RadioGroup>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                          {dateSelected && (
                            <React.Fragment>
                              <Row className="OrderWizard__DateSelection__Wrapper">
                                <Col>
                                  <div className="OrderWizard__DateSelection__TravelDatesHeadline">
                                    <div>Your Vacation Dates:</div>
                                    {adjustedDate ? (
                                      <span>
                                        {DateTime.fromISO(adjustedDate.start, { setZone: 'local' }).toFormat('LLLL d')} - {DateTime.fromISO(adjustedDate.end, { setZone: 'local' }).toFormat('LLLL d')}
                                      </span>
                                    ) : (
                                      <span>"No Date Selected"</span>
                                    )}
                                  </div>
                                  <div className="OrderWizard__DateSelection__AddOnDates__ExtraPricing">
                                    {totalExtraDays} Total Extra Days: ${(totalExtraDays * pricePerNight).toFixed(2)}
                                  </div>
                                </Col>
                              </Row>
                              <h2>
                                You can add on extra<br />days either before or after.<br />Per Day Price: ${pricePerNight.toFixed(2)}
                              </h2>
                              <Row type="flex" justify="space-between" align="middle">
                                <Col xs={24} sm={12} className="OrderWizard__DateSelection__RadioNumberSpinner">
                                  <div className="OrderWizard__DateSelection__AddOnDates__Header">Days Before</div>
                                  <NumberSpinner numberChanged={this.updateStartDate} defaultValue={adjustedDate ? adjustedDate.extraDaysBefore : 0} />
                                  <div className="OrderWizard__DateSelection__AddOnDates__ExtraPricing">${adjustedDate ? (adjustedDate.extraDaysBefore * pricePerNight).toFixed(2) : 0}</div>
                                </Col>

                                <Col xs={24} sm={12} className="OrderWizard__DateSelection__RadioNumberSpinner">
                                  <div className="OrderWizard__DateSelection__AddOnDates__Header">Days After</div>
                                  <NumberSpinner numberChanged={this.updateEndDate} defaultValue={adjustedDate ? adjustedDate.extraDaysAfter : 0} />
                                  <div className="OrderWizard__DateSelection__AddOnDates__ExtraPricing">${adjustedDate ? (adjustedDate.extraDaysAfter * pricePerNight).toFixed(2) : 0}</div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                      <StepNavigation disabled={!dateSelected && !dates.length === 1} nextAsSubmit={next} previous={previous} />
                    </div>
                  </Form>
                </section>
              </Col>
            </Row>
          );
        }}
      </Mutation>
    );
  }
}

import React from 'react';
import moment from 'moment';
import { DateTime } from 'luxon';
import v1 from 'uuid/v1';
import { TripContext } from './TripProvider';

export const CheckoutContext = React.createContext();

export const withCheckoutContext = Component => {
  return props => (
    <TripContext.Consumer>
      {trip => (
        <CheckoutContext.Consumer>
          {checkout => {
            return <Component {...props} checkout={checkout} trip={trip} />;
          }}
        </CheckoutContext.Consumer>
      )}
    </TripContext.Consumer>
  );
};

class CheckoutProvider extends React.PureComponent {
  state = {
    agreement: false,
    reservation: {
      trip: null,
      user: null,
      date: null,
      guests: [
        {
          id: v1(),
          firstName: '',
          lastName: '',
          email: '',
          dob: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          postalCode: '',
          displayOrder: 0,
        },
      ],
      excursionExtras: [],
      willingToRoom: false,
      notes: '',
    },
    paymentOption: 'PaymentPlan',
    dateIndex: 0,
    current: 0,

    next: () => {
      const current = this.state.current + 1;
      this.setState({ current });
    },
    previous: () => {
      const current = this.state.current - 1;
      this.setState({ current });
    },
    goToStep: current => {
      this.setState({ current });
    },
    setReservation: reservation => {
      this.setState(state => ({
        reservation,
      }));
    },
    setTrip: trip => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          trip,
        },
      }));
    },
    setDate: date => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          date,
        },
      }));
    },
    setUser: user => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          user,
        },
      }));
    },
    setGuests: guests => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          guests,
        },
      }));
    },
    setWillingToRoom: willingToRoom => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          willingToRoom,
        },
      }));
    },
    setExcursionExtras: excursionExtras => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          excursionExtras,
        },
      }));
    },
    setPayment: payment => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          payment,
        },
      }));
    },
    setAgreement: () => {
      this.setState(state => ({
        agreement: !state.agreement,
      }));
    },
    setPaymentOption: paymentOption => {
      this.setState(state => ({
        paymentOption,
      }));
    },
    setBillingProfile: billingProfile => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          billingProfile,
        },
      }));
    },
    setCard: card => {
      this.setState(state => ({
        reservation: {
          ...state.reservation,
          card,
        },
      }));
    },

    getPricing: () => {
      const { date, guests, excursionExtras, willingToRoom } = this.state.reservation;

      if (date) {
        const pricePerRoom = date.pricing.pricePerRoom;
        const pricePerRoomPerPerson = date.pricing.pricePerRoomPerPerson;
        const downPaymentPerPerson = date.pricing.downPaymentPerPerson;
        const extraPricePerNight = date.pricing.extraPricePerNight;
        const extraPricePerNightPerPerson = date.pricing.extraPricePerNightPerPerson;

        let excursionExtrasTotalPrice = 0;
        excursionExtras.forEach(addOn => {
          excursionExtrasTotalPrice += addOn.time.price * guests.length;
        });

        const useSinglePrice = guests.length === 1 && willingToRoom;

        const extraDays = date.extraDaysBefore + date.extraDaysAfter;
        const extraDaysPrice = extraDays * extraPricePerNight;
        const extraDaysPricePerPerson = extraDays * extraPricePerNightPerPerson;
        const extraDaysTotalPrice = useSinglePrice ? extraDaysPricePerPerson : extraDaysPrice;
        const extraDaysTotalPriceByDay = useSinglePrice ? extraPricePerNightPerPerson : extraPricePerNight;

        const downPayment = useSinglePrice ? date.pricing.downPaymentPerPerson : date.pricing.downPayment;
        const extraDaysDownPayment = useSinglePrice ? Math.round(extraDaysPricePerPerson * 0.5) : Math.round(extraDaysPrice * 0.5);
        const excursionExtrasDownPayment = excursionExtrasTotalPrice > 0 ? Math.round(excursionExtrasTotalPrice * 0.5) : 0;
        const totalDownPayment = downPayment + excursionExtrasDownPayment + extraDaysDownPayment;
        const totalDownPaymentPerPerson = date.pricing.downPaymentPerPerson + excursionExtrasDownPayment + extraDaysDownPayment;

        const price = pricePerRoom + excursionExtrasTotalPrice + extraDaysPrice;
        const pricePerPerson = pricePerRoomPerPerson + excursionExtrasTotalPrice + extraDaysPricePerPerson;
        const totalRoomPrice = useSinglePrice ? pricePerRoomPerPerson : pricePerRoom;
        const totalPrice = useSinglePrice ? pricePerPerson : price;

        const futurePayment = (totalPrice - totalDownPayment) / 1;

        return {
          willingToRoom,

          pricePerRoom,
          pricePerRoomPerPerson,

          extraDays,
          extraDaysPrice,
          extraDaysTotalPrice,
          extraDaysTotalPriceByDay,
          extraDaysPricePerPerson,
          extraPricePerNight,
          extraPricePerNightPerPerson,
          extraDaysDownPayment,

          excursionExtrasTotalPrice,
          excursionExtrasDownPayment,

          downPayment,
          downPaymentPerPerson,
          totalDownPayment,
          futurePayment,

          price,
          pricePerPerson,
          totalRoomPrice,
          totalPrice,

          futurePayments: [
            // {
            //   amount: futurePayment,
            //   date: DateTime.local(2018, 10, 15).toISO(),
            // },
            {
              amount: futurePayment,
              date: DateTime.local(2018, 11, 15).toISO(),
            },
          ],
        };
      } else {
        return {
          pricePerRoom: 0,
          perPersonPrice: 0,

          downPaymentDoubleOccupancy: 0,
          downPaymentPerPerson: 0,

          extraDays: 0,
          extraDaysTotalPrice: 0,
          extraDaysPricePerNight: 0,
          extraDaysTotalPricePerPerson: 0,
          extraDaysPricePerNightPerPerson: 0,

          excursionExtrasDownPayment: 0,
          excursionExtrasTotalPrice: 0,

          totalDownPayment: 0,
          totalPrice: 0,

          futurePayments: [],
        };
      }
    },
  };

  render() {
    return <CheckoutContext.Provider value={this.state}>{this.props.children}</CheckoutContext.Provider>;
  }
}

export default CheckoutProvider;

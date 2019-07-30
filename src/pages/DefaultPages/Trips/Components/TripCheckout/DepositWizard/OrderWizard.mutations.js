import gql from 'graphql-tag';

export const PAY_RESERVATION = gql`
  mutation payReservation($reservation: ReservationInput!) {
    payReservation(reservation: $reservation) {
      paid
      user {
        id
      }
    }
  }
`;

export const PAY_RESERVATION_DEPOSIT = gql`
  mutation payReservationDeposit($trip: ReservationTripInput!, $user:ReservationUserInput!, $billingAndCard:BillingAndCardInput!  ) {
    payReservationDeposit(trip:$trip, user:$user, billingAndCard:$billingAndCard) {
      success
    }
  }
`;



export const UPDATE_RESERVATION_GUESTS = gql`
  mutation updateReservationGuests($id: ID!, $guests: [ReservationGuestInput!]!, $willingToRoom: Boolean!) {
    updateReservationGuests(id: $id, guests: $guests, willingToRoom: $willingToRoom) {
      id
      trip {
        id
        title
      }
      user {
        id
        firstName
        lastName
        email
        roles
      }
      date {
        days
        end
        extraDaysAfter
        extraDaysBefore
        id
        start
        pricing {
          id
          role
          pricePerRoom
          pricePerRoomPerPerson
          downPayment
          downPaymentPerPerson
          extraPricePerNight
          extraPricePerNightPerPerson
        }
      }
      guests {
        firstName
        lastName
        email
        phone
        dob
        address
        address2
        city
        state
        postalCode
      }
      excursionExtras {
        excursion {
          id
          imageUrl
          price
          what
          whatType
          when
        }
        excursionDate {
          id
          tripDateId
          day
        }
        time {
          id
          start
          end
          price
        }
      }
      paid
      uuid
      willingToRoom
    }
  }
`;

export const UPDATE_RESERVATION_DATE = gql`
  mutation updateReservationDate($id: ID!, $date: ReservationDateInput!) {
    updateReservationDate(id: $id, date: $date) {
      id
      trip {
        id
        title
      }
      user {
        id
        firstName
        lastName
        email
        roles
      }
      date {
        days
        end
        extraDaysAfter
        extraDaysBefore
        id
        start
        pricing {
          id
          role
          pricePerRoom
          pricePerRoomPerPerson
          downPayment
          downPaymentPerPerson
          extraPricePerNight
          extraPricePerNightPerPerson
        }
      }
      guests {
        firstName
        lastName
        email
        phone
        dob
        address
        address2
        city
        state
        postalCode
      }
      excursionExtras {
        excursion {
          id
          imageUrl
          price
          what
          whatType
          when
        }
        excursionDate {
          id
          tripDateId
          day
        }
        time {
          id
          start
          end
          price
        }
      }
      paid
      uuid
      willingToRoom
    }
  }
`;

export const UPDATE_RESERVATION_EXCURSION_EXTRAS = gql`
  mutation updateReservationExcursionExtras($id: ID!, $excursionExtras: [ReservationExcursionExtraInput!]) {
    updateReservationExcursionExtras(id: $id, excursionExtras: $excursionExtras) {
      id
      trip {
        id
        title
      }
      user {
        id
        firstName
        lastName
        email
        roles
      }
      date {
        days
        end
        extraDaysAfter
        extraDaysBefore
        id
        start
        pricing {
          id
          role
          pricePerRoom
          pricePerRoomPerPerson
          downPayment
          downPaymentPerPerson
          extraPricePerNight
          extraPricePerNightPerPerson
        }
      }
      guests {
        firstName
        lastName
        email
        phone
        dob
        address
        address2
        city
        state
        postalCode
      }
      excursionExtras {
        excursion {
          id
          imageUrl
          price
          what
          whatType
          when
        }
        excursionDate {
          id
          tripDateId
          day
        }
        time {
          id
          start
          end
          price
        }
      }
      paid
      uuid
      willingToRoom
    }
  }
`;

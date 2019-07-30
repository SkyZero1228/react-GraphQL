import gql from 'graphql-tag';

export const GET_RESERVATIONS = gql`
  query getReservations($searchText:String) {
    getReservations(searchText:$searchText) {
      id
      trip {
        id
        title
      }
      paid
      uuid
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

      pricing {
        willingToRoom
        futurePayments {
          amount
          date
        }
        pricePerRoom
        pricePerRoomPerPerson
        extraDays
        extraDaysPrice
        extraDaysTotalPrice
        extraDaysTotalPriceByDay
        extraDaysPricePerPerson
        extraPricePerNight
      }
      payment {
        sourceId
        customerId
        chargeInfo {
          id
          object
          amount
          amount_refunded
          application
          application_fee
          balance_transaction
          balance_transaction
          captured
          created
          customer
          status
          receipt_number
          receipt_email
          paid
        }
      }
      willingToRoom
    }
  }
`;

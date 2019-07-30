import gql from 'graphql-tag';

const ADD_ESCAPE_USER = gql`
  mutation addEscapeUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $tripId: String!, $userAgent: String) {
    addEscapeUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, tripId: $tripId, userAgent: $userAgent) {
      user {
        id
        firstName
        lastName
        email
        roles
      }
      reservation {
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
      token
    }
  }
`;

export { ADD_ESCAPE_USER };

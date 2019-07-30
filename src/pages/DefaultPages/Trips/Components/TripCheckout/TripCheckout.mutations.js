import gql from 'graphql-tag';

const ESCAPE_LOGIN = gql`
  mutation escapeLogin($email: String!, $password: String!, $tripId: String!, $userAgent: String) {
    escapeLogin(email: $email, password: $password, tripId: $tripId, userAgent: $userAgent) {
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
        }
        paid
        uuid
        willingToRoom
      }
      token
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
        roles
      }
      token
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation resetPassword($resetToken: String!, $email: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
        roles
      }
      token
    }
  }
`;

export { ESCAPE_LOGIN, FORGOT_PASSWORD, RESET_PASSWORD };

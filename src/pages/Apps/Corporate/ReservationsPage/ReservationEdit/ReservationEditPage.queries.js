import gql from 'graphql-tag';

export const GET_RESERVATION_BY_ID = gql`
  query getReservationAndTripById($id: ID!) {
    getReservationAndTripById(id: $id) {
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
        notes
      }
      trip {
        agenda {
          day
          dayTitle
          imageUrl
          agenda
        }
        createdAt
        couponCodes {
          id
          code
          discountType
          discountAmount
          appliesToNumberOfGuests
          appliesToExcursions
        }
        dates {
          id
          days
          end
          start
          status
        }
        description
        excursions {
          id
          description
          dates {
            id
            tripDateId
            day
            times {
              id
              start
              end
              price
              cost
            }
          }
          imageUrl
          included
          price
          restrictions
          times
          what
          whatType
          when
        }
        id
        location {
          country
          cityOrRegion
          description
          images {
            url
            type
            displayOrder
          }
        }
        hotel {
          description
          images {
            url
            type
            displayOrder
          }
          rooms {
            id
            description
            rooms
            roomsRemaining
            images {
              url
              type
              displayOrder
            }
            roomPriceBasis
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
          property
          totalRooms
          totalRoomsRemaining
        }
        includes
        images {
          url
          type
          displayOrder
        }
        title
        updatedAt
        urlSlug
        videoUrl
      }
    }
  }
`;

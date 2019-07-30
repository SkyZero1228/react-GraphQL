import gql from 'graphql-tag';

export const GET_TRIP_BY_SLUG = gql`
  query getTripBySlug($urlSlug: [String!]!) {
    getTripBySlug(urlSlug: $urlSlug) {
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
`;

export const GET_TRIP_BY_VIP = gql`
  query getTripByVip($vip: String!) {
    getTripByVip(vip: $vip) {
      agenda {
        day
        dayTitle
        agenda
      }
      createdAt
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
`;

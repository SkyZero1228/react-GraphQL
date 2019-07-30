import gql from 'graphql-tag';

const LOGIN = gql`
  mutation addTrip($trip: TripInput!) {
    addTrip(trip: $trip) {
      id
      includes
      title
      dates {
        start
        end
        days
      }
      description
      excursions {
        imageUrl
        what
				whatType
        when
        times
        dates {
          day
          times {
            start
            end
            price
            cost
          }
        }
      }
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
          displayOrder
          url
          type
        }
        rooms {
          description
          rooms
          roomsRemaining
          images {
            displayOrder
            url
            type
          }
          roomPriceBasis
          price {
            role
            price
          }
        }
      }
      title
      updatedAt
      urlSlug
    }
  }
`;

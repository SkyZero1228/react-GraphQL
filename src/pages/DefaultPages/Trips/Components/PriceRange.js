import React, { PureComponent } from 'react';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import forEach from 'lodash/forEach';
import { withCheckoutContext } from 'providers/CheckoutProvider';

@withCheckoutContext
export default class PriceRange extends PureComponent {
  state = {
    priceRange: '',
    min: 0,
    max: 0,
  };

  componentWillMount = () => {
    const rooms = this.props.hotel.rooms;
    let min = 999999;
    let max = 0;
    forEach(rooms, room => {
      const roomMin = minBy(room.pricing, price => price.pricePerRoomPerPerson);
      if (roomMin.pricePerRoomPerPerson < min) min = roomMin.pricePerRoomPerPerson;
      const roomMax = maxBy(room.pricing, price => price.pricePerRoomPerPerson);
      if (roomMax.pricePerRoomPerPerson > max) max = roomMax.pricePerRoomPerPerson;
    });

    const priceRange = min === max ? `$${min.toLocaleString()}.00` : `$${min.toLocaleString()}.00 - $${max.toLocaleString()}.00`;
    this.setState(state => ({
      min,
      max,
      priceRange,
    }));
  };

  render() {
    const { trip } = this.props;
    const { min, max, priceRange } = this.state;
    return (
      <div className="text-center">
        <div className="TripPage__PriceIncludes__PriceRange__Headline">{trip.title}</div>
        <div className="TripPage__PriceIncludes__PriceRange__Price">{priceRange}</div>
        <div>Based On Double Occupancy</div>
      </div>
    );
  }
}

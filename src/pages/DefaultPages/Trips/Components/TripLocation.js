import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Row, Col} from 'antd';

export default ({ location, hotel }) => {
  return (
    <div className="TripPage__TripLocation">
      <div className="TripPage__TripLocation__Headline">
        <h1>{hotel.property} in</h1>
        <h2>
          {location.cityOrRegion}, {location.country}
        </h2>
      </div>
      <h5 className="TripPage__TripLocation__Description">{hotel.description}</h5>
    </div>
  );
};

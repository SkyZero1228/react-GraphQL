import React from 'react';
import PriceRange from './PriceRange';

export default ({ includes, hotel }) => {
  return (
    <div className="TripPage__PriceIncludes">
      <PriceRange hotel={hotel} />
      <div className="TripPage__PriceIncludes__Headline">
        <h1>Trip Price Includes</h1>
        <div className="TripPage__PriceIncludes__ItemWrapper">{includes.map((included, index) => <h2 key={index}>{included}</h2>)}</div>
      </div>
    </div>
  );
};

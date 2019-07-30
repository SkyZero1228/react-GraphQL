import React from 'react';

export default ({ excursions, tripTitle }) => {
  return (
    <React.Fragment>
			<img src="/resources/images/trips/mexico/2018-excursions-banner.png" alt={`${tripTitle} Daily Agenda`} className="TripPage__HeaderBanner"/>
      {excursions.map((excursion, i) => (
        <div key={i} className="TripPage__Excursions__Day">
          <img src={excursion.imageUrl} alt={excursion.what} />
          <h2 className="TripPage__Excursions__Day__Title">{excursion.what}</h2>
          <div className="TripPage__Excursions__DayItem__Wrapper">
            <div className="TripPage__Excursions__DayItem__Wrapper__What">
              {excursion.whatType}: {excursion.what}
            </div>
            <div className="TripPage__Excursions__DayItem__Wrapper__When">DATE: {excursion.when}</div>
            <div className="TripPage__Excursions__DayItem__Wrapper__Times">
              TIME{excursion.dates[0].times.length > 1 ? 'S' : null} AVAILABLE: {excursion.times}
            </div>
            <div className="TripPage__Excursions__DayItem__Wrapper__Price">PRICE: {excursion.price}</div>
            <div className="TripPage__Excursions__DayItem__Wrapper__Description">{excursion.description}</div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

import React from 'react';

export default ({ agenda, tripTitle }) => {
  return (
    <React.Fragment>
      <img src="/resources/images/trips/mexico/daily-agenda-banner.png" alt={`${tripTitle} Daily Agenda`} className="TripPage__HeaderBanner" />
      {agenda.map(day => (
        <div key={day.day} className="TripPage__Agenda__Day" style={{ backgroundImage: 'url(' + day.imageUrl + ')' }}>
          <h2 className="TripPage__Agenda__Day__Title">{day.dayTitle}</h2>
          <div className="TripPage__Agenda__DayItem__Wrapper">
            <ul>{day.agenda.map((dayAgenda, index) => <li key={index} className="TripPage__Agenda__DayItem__Wrapper__Item" dangerouslySetInnerHTML={{ __html: dayAgenda }} />)}</ul>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

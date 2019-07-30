import React, { PureComponent } from 'react';
import { find } from 'lodash';
import { withRouter } from 'react-router-dom';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import { Logo, WistiaVideo, TripLocation, ImageCarousel, Agenda, Excursions, TripCheckout, PriceIncludes } from '../Components';

@withRouter
@withCheckoutContext
export default class Trip extends PureComponent {
  componentWillMount = () => {
    const {
      trip,
      checkout: { setTrip },
    } = this.props;
    setTrip({ id: trip.id, title: trip.title });
  };

  render() {
    const trip = this.props.trip;
    const { location, agenda, images, hotel, excursions, includes } = trip;
    const background = find(trip.images, { type: 'Background' });
    const header = find(trip.images, { type: 'Header' });
    return (
      <div className="TripPage">
        <div className="TripPage__Background" style={{ backgroundImage: 'url(' + background.url + ')' }} />
        <Logo />
        <div className="TripPage__MainContent">
          <img className="TripPage__MainContent__HeaderImage" src={header.url} alt={trip.title} />
          <WistiaVideo videoUrl={trip.videoUrl} />
          <TripLocation hotel={hotel} location={location} />
          <ImageCarousel images={hotel.images} />
          <PriceIncludes includes={includes} hotel={hotel} />
          <Agenda agenda={agenda} tripTitle={trip.title} />
          <Excursions excursions={excursions} tripTitle={trip.title} />
          <img src="/resources/images/trips/mexico/E2M-NOV-DEC-200-Down.jpg" className="TripPage__HeaderBanner" alt="$200 Down Each Person based on Double Occupancy" />
          <TripCheckout />
        </div>
      </div>
    );
  }
}

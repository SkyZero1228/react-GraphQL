import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Spin } from 'antd';
import { TripContext } from 'providers/TripProvider';
import CheckoutProvider from 'providers/CheckoutProvider';
import { InfluencerTrip } from '../Components';
import { GET_TRIP_BY_SLUG } from '../Trips.queries';

import '../index.styles.scss';

export default class TripPage extends PureComponent {
  render() {
    const { vip } = this.props;
    return (
      <React.Fragment>
        <Query query={GET_TRIP_BY_SLUG} variables={{ urlSlug: [vip] }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Spin>
                  <div className="TripPage__spinner" />
                </Spin>
              );
            if (data && !loading) {
              const trip = data.getTripBySlug;
              return (
                <TripContext.Provider value={trip}>
                  <CheckoutProvider>
                    <InfluencerTrip />
                  </CheckoutProvider>
                </TripContext.Provider>
              );
            }
          }}
        </Query>
        <script src="https://fast.wistia.net/assets/external/E-v1.js" async />
      </React.Fragment>
    );
  }
}

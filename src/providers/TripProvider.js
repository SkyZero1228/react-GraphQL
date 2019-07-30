import React from 'react';

export const TripContext = React.createContext();

export const withTripContext = Component => {
  return props => (
    <TripContext.Consumer>
      {trip => {
        return <Component {...props} trip={trip} />;
      }}
    </TripContext.Consumer>
  );
};

class TripProvider extends React.PureComponent {
  state = {
    trip: null,
  };

  render() {
    return <TripContext.Provider value={this.state}>{this.props.children}</TripContext.Provider>;
  }
}

export default TripProvider;

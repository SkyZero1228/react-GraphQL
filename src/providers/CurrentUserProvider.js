import React from 'react';

export const CurrentUserContext = React.createContext();
export const withCurrentUserContext = Component => {
  return props => (
    <CurrentUserContext.Consumer>
      {state => {
        return <Component {...props} user={state.currentUser} userContext={state} />;
      }}
    </CurrentUserContext.Consumer>
  );
};
class CurrentUserProvider extends React.PureComponent {
  state = {
    currentUser: false,
    threeForFreeCount: 0,
    setCurrentUser: (currentUser, threeForFreeCount) => {
      this.setState({ currentUser, threeForFreeCount });
    },
  };

  componentDidMount = () => {
    this.state.setCurrentUser(
      this.props.currentUser ? this.props.currentUser : null,
      this.props.threeForFreeCount ? this.props.threeForFreeCount : 0
    );
  };

  render() {
    return <CurrentUserContext.Provider value={this.state}>{this.props.children}</CurrentUserContext.Provider>;
  }
}

export default CurrentUserProvider;

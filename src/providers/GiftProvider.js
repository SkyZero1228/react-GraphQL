import React from 'react';

export const GiftContext = React.createContext();

class GiftProvider extends React.Component {
  state = {
    isMobile: false,
    setIsMobile: isMobile => {
      this.setState({ isMobile });
    },
  };
  render() {
    return <GiftContext.Provider value={this.state}>{this.props.children}</GiftContext.Provider>;
  }
}

export default GiftProvider;

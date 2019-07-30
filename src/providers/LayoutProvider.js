import React from 'react';

export const LayoutContext = React.createContext();

class LayoutProvider extends React.Component {
  state = {
    screen: {},
    layoutState: {
      isMenuTop: true,
      menuMobileOpened: false,
      menuCollapsed: false,
      menuShadow: false,
      themeLight: false,
      squaredBorders: false,
      borderLess: false,
      settingsOpened: false,
    },
    // mobileView: !!this.screen['screen-xs'] || !!this.screen['screen-xxs'],
    setScreen: screen => {
      this.setState({ screen });
    },
    isMobile: () => {
      return !!this.state.screen['screen-xs'] || !!this.state.screen['screen-xxs'];
    },
  };
  render() {
    return <LayoutContext.Provider value={this.state}>{this.props.children}</LayoutContext.Provider>;
  }
}

export default LayoutProvider;

import React from 'react';
import Page from 'components/LayoutComponents/Page';

class MembersHome extends React.Component {
  static defaultProps = {
    roles: ['init'],
  };

  render() {
    const props = this.props;
    return null; //<Page {...props} />;
  }
}

export default MembersHome;

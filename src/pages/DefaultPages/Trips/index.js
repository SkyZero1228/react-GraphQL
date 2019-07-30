import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Spin } from 'antd';
import { find } from 'lodash';
import { GET_TRIP_BY_SLUG } from './Trips.queries';
import Trip from './Trip';
import Vip from './Vip';

import './index.styles.scss';

export default class TripPage extends PureComponent {
  state = {
    isVip: false,
  };

  componentWillMount = () => {
    if (this.props.match.params.influencer) {
      this.setState(state => ({
        isVip: true,
      }));
    }
  };

  render() {
    const { isVip } = this.state;

    return isVip === true ? <Vip vip={this.props.match.params.influencer} /> : <Trip />;
  }
}

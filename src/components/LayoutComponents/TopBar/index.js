import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import ProfileMenu from './ProfileMenu';
import IssuesHistory from './IssuesHistory';
import ProjectManagement from './ProjectManagement';
import BitcoinPrice from './BitcoinPrice';
import Breadcrumb from '../Breadcrumb';
import LiveSearch from './LiveSearch';
import './style.scss';

const mapStateToProps = (state, props) => ({
  isUpdatingContent: state.app.isUpdatingContent,
  isMenuTop: state.app.layoutState.isMenuTop,
  theme: state.app.layoutState.themeLight ? 'light' : 'dark',
});

@connect(mapStateToProps)
class TopBar extends React.Component {
  static contextTypes = {
    getContentBuffer: PropTypes.func,
  };

  shouldComponentUpdate(nextProps: { isUpdatingContent: boolean }) {
    if (this.props.isUpdatingContent && !nextProps.isUpdatingContent) {
      return false;
    }
    return true;
  }

  render() {
    const { getContentBuffer } = this.context;
    const { pathName, content } = getContentBuffer();
    const { isMobile = false, isMenuTop, theme } = this.props;
    const logo = 'topbar__logo';

    if (isMenuTop && !isMobile) return null;

    return (
      <div className="topbar">
        <div className="topbar__left">
          {isMobile ? (
            <img className={logo} src="/resources/images/svgs/TVI-TM-Logo-Horizontal.svg" alt="TripValet Incentives" />
          ) : (
            <Breadcrumb name={pathName} isTopBar />
          )}
        </div>
        <div className="topbar__right">
          <ProfileMenu theme={theme} topbar />
        </div>
      </div>
    );
  }
}

export default TopBar;

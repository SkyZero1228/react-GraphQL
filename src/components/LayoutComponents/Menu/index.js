import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';
import { connect } from 'react-redux';
import { setLayoutState } from 'ducks/app';
import Impersonate from './Impersonate';
import './style.scss';

const mapStateToProps = ({ app }, props) => ({
  open: app.layoutState.menuMobileOpened,
  isMenuTop: app.layoutState.isMenuTop,
});

@connect(mapStateToProps)
class AppMenu extends React.Component {
  state = {
    open: this.props.open,
    isMenuTop: this.props.isMenuTop,
  };

  toggleOpen = () => {
    const { dispatch } = this.props;
    const { open } = this.state;
    dispatch(setLayoutState({ menuMobileOpened: !open }));
  };

  componentWillReceiveProps({ open, isMenuTop }) {
    this.setState({
      open,
      isMenuTop,
    });
  }

  render() {
    const { isMobile } = this.props;
    const { open, isMenuTop } = this.state;
    return (
      <React.Fragment>
        {isMobile ? (
          <DrawerMenu getContainer={null} level={null} open={open} onMaskClick={this.toggleOpen} onHandleClick={this.toggleOpen}>
            <MenuLeft {...this.props} />
          </DrawerMenu>
        ) : isMenuTop ? (
          <MenuTop {...this.props} />
        ) : (
          <MenuLeft {...this.props} />
        )}
      </React.Fragment>
    );
  }
}

export default AppMenu;

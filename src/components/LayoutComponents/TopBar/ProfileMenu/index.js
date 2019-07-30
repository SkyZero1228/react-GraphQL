import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cn from 'classnames';
import { logout, setLayoutState } from 'ducks/app';
import { Menu, Dropdown, Avatar, Badge, Spin } from 'antd';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { Query, withApollo } from 'react-apollo';
import { find } from 'lodash';
import { GET_ME } from '../../../../pages/Apps/Members/AccountSettings/UserAccount.queries';
import './style.scss';

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: event => {
    event.preventDefault();
    ownProps.client.cache.reset();
    localStorage.removeItem('token');
    // TODO: Call server to delete cookies
    dispatch(push('/'));
  },
  openSiteSettings: event => {
    event.preventDefault();
    dispatch(setLayoutState({ settingsOpened: true }));
  },
  collapseMenu: event => {
    event.preventDefault();
    dispatch(setLayoutState({ menuCollapsed: false }));
  },
});

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
  isMobile: state.app.layoutState.isMobile,
});

@withApollo
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ProfileMenu extends React.Component {
  state = {
    count: 7,
  };

  addCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  renderMenu = me => {
    const { collapseMenu, openSiteSettings, logout } = this.props;
    const membership = find(me.roles, r => {
      return r === 'TVI PRO' || r === 'TVI PLUS' || r === 'TVI BASIC' || r === 'TV PLUS' || r === 'TV VIP';
    });
    return (
      <Menu selectable={false}>
        <Menu.Item>
          <div className="rfq__widget__system-status__item">
            <strong>
              Hello, {me.firstName} {me.lastName}
            </strong>
            <div>
              <strong>Membership:</strong> {membership}
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div className="rfq__widget__system-status__item">
            <strong>Email:</strong> {me.email}
            <br />
            <strong>Phone:</strong> {me.phone}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link
            to={'/members/account-settings/user-account'}
            onClick={
              this.props.isMobile
                ? () => {
                    collapseMenu();
                  }
                : undefined
            }
          >
            <i className="topbar__dropdownMenuIcon icmn-user" /> My Account
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link
            to={'/members/account-settings/change-password'}
            onClick={
              this.props.isMobile
                ? () => {
                    collapseMenu();
                  }
                : undefined
            }
          >
            <i className="topbar__dropdownMenuIcon icmn-lock" /> Change Password
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link
            to={'/members/account-settings/payment-information'}
            onClick={
              this.props.isMobile
                ? () => {
                    collapseMenu();
                  }
                : undefined
            }
          >
            <i className="topbar__dropdownMenuIcon icmn-mail3" /> Payment and Subscription Information
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a onClick={openSiteSettings}>
            <i className="topbar__dropdownMenuIcon icmn-exit" /> Site Settings
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={logout}>
            <i className="topbar__dropdownMenuIcon icmn-exit" /> Logout
          </a>
        </Menu.Item>
      </Menu>
    );
  };
  render() {
    const { count } = this.state;
    const { userState, logout, inMenu = false, theme, topbar } = this.props;

    let container = cn('topbar__dropdown d-inline-block', { profileMenu__inMenu: inMenu });
    let avatar = cn('topbar__avatar', { profileMenu__inMenu: inMenu });
    return (
      <Query query={GET_ME}>
        {({ loading, error, data }) => {
          if (loading) return <Spin delay="250" />;
          if (data) {
            let count = data.me.threeForFreeCount;
            let threeForFreeImageUrl: string;
            if (theme === 'light' || topbar) {
              threeForFreeImageUrl = `/resources/images/threeFree/threeFreeBlack-${count >= 3 ? 3 : count}.png`;
            } else {
              threeForFreeImageUrl = `/resources/images/threeFree/threeFreeWhite-${count >= 3 ? 3 : count}.png`;
            }
            return (
              <div className={container}>
                <label style={{ marginRight: '5px', fontSize: '18px', verticalAlign: 'middle' }}>
                  <b>{Number(data.me.escapeBucks).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} EB</b>
                </label>
                <img src={threeForFreeImageUrl} alt="TripValet Incentives Logo" className="profileMenu__threeForFree" />
                <Dropdown
                  overlay={this.renderMenu(data.me.user)}
                  trigger={['click']}
                  placement="bottomRight"
                  onVisibleChange={this.addCount}
                >
                  <a className="ant-dropdown-link" href="/">
                    <Gravatar email={data.me.user.email} default="mp" size={40} />
                    {/* <Avatar className="topbar__avatar" shape="square" size="large" icon="user" /> */}
                  </a>
                </Dropdown>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default ProfileMenu;

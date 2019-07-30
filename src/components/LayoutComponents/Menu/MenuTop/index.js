import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { reduce, some, pullAllBy, includes, clone } from 'lodash';
import cn from 'classnames';
import { setLayoutState } from 'ducks/app';
import { default as menuData } from '../menuData';
import ProfileMenu from '../../TopBar/ProfileMenu';
import { CurrentUserContext, withCurrentUserContext } from 'providers/CurrentUserProvider';
import './style.scss';

const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const mapStateToProps = ({ app, routing }, props) => {
  const { layoutState } = app;
  return {
    pathname: routing.location.pathname,
    collapsed: layoutState.menuCollapsed,
    theme: layoutState.themeLight ? 'light' : 'dark',
    settingsOpened: layoutState.settingsOpened,
  };
};

@connect(mapStateToProps)
@withRouter
@withCurrentUserContext
class MenuTop extends React.Component {
  state = {
    pathname: this.props.pathname,
    collapsed: this.props.collapsed,
    theme: this.props.theme,
    selectedKeys: '',
    openKeys: [''],
    settingsOpened: this.props.settingsOpened,
    menuData: clone(menuData),
  };

  handleClick = e => {
    const { dispatch, isMobile } = this.props;
    if (isMobile) {
      dispatch(setLayoutState({ menuMobileOpened: false }));
    }
    this.setState({
      selectedKeys: e.key,
      openKeys: e.keyPath,
    });
  };

  onOpenChange = openKeys => {
    this.setState({
      openKeys,
    });
  };

  getPath(data, id, parents = []) {
    const { user } = this.props;
    let briefcase = data.find(d => d.key === 'briefcase');
    let faq = data.find(d => d.key === 'faq');
    let admin = data.find(d => d.key === 'admin');

    if (user && user.roles) {
      if (
        !some(user.roles, role => {
          return role === 'TVI PRO' || role === 'TVI PLUS' || role === 'TVI BASIC';
        })
      ) {
        if (briefcase) briefcase.visible = false;
        if (faq) faq.visible = false;
      } else if (briefcase && !briefcase.visible) {
        if (briefcase) briefcase.visible = true;
        if (faq) faq.visible = true;
      }

      if (!includes(user.roles, 'Administrator')) {
        if (admin) admin.visible = false;
      } else {
        if (admin) admin.visible = true;
      }
    }

    const { selectedKeys } = this.state;
    let items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result;
        } else if (entry.url === id && selectedKeys === '') {
          return [entry].concat(parents);
        } else if (entry.key === id && selectedKeys !== '') {
          return [entry].concat(parents);
        } else if (entry.children) {
          let nested = this.getPath(entry.children, id, [entry].concat(parents));
          return nested ? nested : result;
        }
        return result;
      },
      []
    );
    return items.length > 0 ? items : false;
  }

  getActiveMenuItem = (props, items) => {
    const { selectedKeys, pathname } = this.state;
    let { collapsed } = props;
    let [activeMenuItem, ...path] = this.getPath(items, !selectedKeys ? pathname : selectedKeys);

    this.setState({
      selectedKeys: activeMenuItem ? activeMenuItem.key : '',
      collapsed,
    });
  };

  generateMenuPartitions(items) {
    return items.map(menuItem => {
      if (menuItem.children) {
        let subMenuTitle = (
          <span className="menuTop__title-wrap" key={menuItem.key}>
            {menuItem.icon && <span className={menuItem.icon + ' menuTop__icon'} />}
            <span className="menuTop__item-title">{menuItem.title}</span>
          </span>
        );
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key} hidden={!menuItem.visible}>
            {this.generateMenuPartitions(menuItem.children)}
          </SubMenu>
        );
      }
      return this.generateMenuItem(menuItem);
    });
  }

  generateMenuItem(item) {
    const { key, title, url, icon, disabled, visible } = item;
    const { dispatch } = this.props;
    return item.divider ? (
      <Divider key={Math.random()} />
    ) : item.url ? (
      <Menu.Item key={key} disabled={disabled} hidden={!visible}>
        <Link
          to={url}
          onClick={
            this.props.isMobile
              ? () => {
                  dispatch(setLayoutState({ menuCollapsed: false }));
                }
              : undefined
          }
        >
          {icon && <span className={icon + ' menuTop__icon'} />}
          <span className="menuTop__item-title">{title}</span>
        </Link>
      </Menu.Item>
    ) : (
      <Menu.Item key={key} disabled={disabled}>
        {icon && <span className={icon + ' menuTop__icon'} />}
        <span className="menuTop__item-title">{title}</span>
      </Menu.Item>
    );
  }

  componentWillMount() {
    this.getActiveMenuItem(this.props, menuData);
  }

  componentWillReceiveProps(newProps) {
    this.setState(
      {
        pathname: newProps.pathname,
        theme: newProps.theme,
        settingsOpened: newProps.settingsOpened,
      },
      () => {
        if (!newProps.isMobile) {
          this.getActiveMenuItem(newProps, menuData);
        }
      }
    );
  }

  render() {
    const { selectedKeys, openKeys, theme } = this.state;
    const menuItems = this.generateMenuPartitions(menuData);
    let logoContainer = cn('menuTop__logoContainer', { menuTop__logoContainer__light: theme === 'light' });
    let menuTopLogo = cn('menuTop__logo', { menuTop__logo__light: theme === 'light' });

    return (
      <CurrentUserContext.Consumer>
        {context => {
          return (
            <div className="menuTop">
              <div className={menuTopLogo}>
                <div className={logoContainer} />
              </div>
              <Menu
                theme={theme}
                onClick={this.handleClick}
                selectedKeys={[selectedKeys]}
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                mode="horizontal"
                className="menuTop__navigation"
              >
                {menuItems}
                <ProfileMenu inMenu theme={theme} />
              </Menu>
            </div>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  }
}

export { MenuTop, menuData };

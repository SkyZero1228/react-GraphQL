import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-redux-spinner';
import { BackTop, Layout as AntLayout } from 'antd';
import { connect } from 'react-redux';
import Routes from 'routes';
import TopBar from 'components/LayoutComponents/TopBar';
import Footer from 'components/LayoutComponents/Footer';
import Menu from 'components/LayoutComponents/Menu';
import Content from 'components/LayoutComponents/Content';
import Loader from 'components/LayoutComponents/Loader';
import LayoutState from 'components/LayoutComponents/LayoutState';
import SettingsSider from 'components/LayoutComponents/SettingsSider';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { LayoutContext } from '../../../../providers/LayoutProvider';

import('./index.styles.scss');

const AntContent = AntLayout.Content;
const AntHeader = AntLayout.Header;
const AntFooter = AntLayout.Footer;

const query = {
  'screen-xxs': {
    maxWidth: 320,
  },
  'screen-xs': {
    minWidth: 321,
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

let contentBuffer = {
  pathName: null,
  content: null,
};

const mapStateToProps = ({ app }, props) => ({
  isMenuTop: app.layoutState.isMenuTop,
});

@connect(mapStateToProps)
class MemberLayout extends React.Component {
  static childContextTypes = {
    getContentBuffer: PropTypes.func,
    setContentBuffer: PropTypes.func,
  };

  state = {
    isMobile,
    isMenuTop: this.props.isMenuTop,
  };

  getChildContext() {
    return {
      getContentBuffer: () => contentBuffer,
      setContentBuffer: ({ pathName, content }) => (contentBuffer = { pathName, content }),
    };
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
  }

  componentWillReceiveProps({ containerParams }) {
    if (containerParams !== this.props.containerParams) this.props.layoutState.setScreen(containerParams);
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  render() {
    const isMobile = !!this.state.isMobile;
    const isMenuTop = this.props.isMenuTop;
    const antLayout = classNames({ 'child-container': isMenuTop ? true : false });
    const { layoutState, containerParams } = this.props;

    return (
      <div className={classNames(containerParams)}>
        <AntLayout>
          <LayoutState />
          <Loader />
          <Spinner />
          <BackTop />
          <Menu isMobile={isMobile} />
          <SettingsSider />
          <AntLayout className={antLayout}>
            <TopBar isMobile={isMobile} />
            {this.props.children}
          </AntLayout>
        </AntLayout>
      </div>
    );
  }
}

const withLayoutContext = Component => {
  return props => (
    <LayoutContext.Consumer>
      {context => {
        return (
          <ContainerQuery query={query}>
            {params => {
              return <Component {...props} layoutState={context} containerParams={params} />;
            }}
          </ContainerQuery>
        );
      }}
    </LayoutContext.Consumer>
  );
};

export default withLayoutContext(MemberLayout);

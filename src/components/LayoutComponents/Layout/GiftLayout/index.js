import React from 'react';
import { BackTop, Layout as AntLayout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { query } from '../../utils';
import GiftProvider, { GiftContext } from '../../../../providers/GiftProvider';

import('./index.styles.scss');
let localContext: any = null;

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class GiftLayout extends React.Component {
  state = {
    isMobile,
  };

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      localContext.setIsMobile(mobile);
      this.setState({
        isMobile: mobile,
      });
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  render() {
    const isMobile = !!this.state.isMobile;

    return (
      <ContainerQuery query={query}>
        {params => (
          <div className={classNames(params)}>
            <AntLayout>
              <BackTop />
              <AntLayout>
                <GiftProvider>
                  <GiftContext.Consumer>
                    {context => {
                      localContext = context;
                      return this.props.children;
                    }}
                  </GiftContext.Consumer>
                </GiftProvider>
              </AntLayout>
            </AntLayout>
          </div>
        )}
      </ContainerQuery>
    );
  }
}

export default GiftLayout;

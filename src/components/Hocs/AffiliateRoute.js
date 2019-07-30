import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Spin } from 'antd';
import omit from 'lodash/omit';
import { GET_ME } from '../../pages/Apps/Members/AccountSettings/UserAccount.queries';
import { findIndex } from 'lodash';
import CurrentUserProvider from '../../providers/CurrentUserProvider';
import LayoutProvider from '../../providers/LayoutProvider';
import Impersonate from '../LayoutComponents/Menu/Impersonate/index';

const MemberRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_ME}>
    {({ loading, error, data }) => {
      if (loading) return <Spin delay="250" />;
      if (
        error ||
        !data ||
        !data.me ||
        findIndex(data.me.user.roles, r => {
          return r === 'Affiliate' || r === 'CoinMD Member';
        }) < 0
      ) {
        return (
          <Route
            {...rest}
            render={props => (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )}
          />
        );
      }
      if (data) {
        const currentUser = omit(data.me.user, ['id', '__typename', 'Symbol(id)', 'username', 'phone']);
        return (
          <Route
            {...rest}
            render={props => (
              <LayoutProvider screen={{}}>
                <CurrentUserProvider currentUser={currentUser} threeForFreeCount={data.me.threeForFreeCount}>
                  <Impersonate />
                  <Component currentUser={currentUser} threeForFreeCount={data.me.threeForFreeCount} {...props} />
                </CurrentUserProvider>
              </LayoutProvider>
            )}
          />
        );
      }
    }}
  </Query>
);

export default MemberRoute;

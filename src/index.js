import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Helmet } from 'react-helmet';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
//import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink, createNetworkInterface } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { notification } from 'antd';
import { some } from 'lodash';
import vars from './env/vars';
import 'es6-promise/auto';
import 'setimmediate';
import 'chartist-plugin-tooltip';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Routes from './routes';
import reducer from 'ducks';

import 'resources/_antd.less'; // redefinition AntDesign variables
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap styles
import 'resources/AntStyles/AntDesign/antd.cleanui.scss';
import 'resources/CleanStyles/Core/core.cleanui.scss';
import 'resources/CleanStyles/Vendors/vendors.cleanui.scss';

const history = createHistory();
const router = routerMiddleware(history);
const middlewares = [router, thunk];
const isLogger = false;
if (isLogger && process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const uploadLink = createUploadLink({ uri: vars.GraphQLServer });
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    localStorage.removeItem('token');
    history.push('/', { from: history.location });
  } else if (graphQLErrors) {
    if (
      some(graphQLErrors, graphQLError => {
        return graphQLError.message === 'Not Logged in';
      })
    ) {
      localStorage.removeItem('token');
      history.push('/', { from: history.location });
    }
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(uploadLink)),
  cache: new InMemoryCache(),
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LocaleProvider locale={enUS}>
          <div>
            <Helmet titleTemplate="TVI - %s" />
            <Routes />
          </div>
        </LocaleProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

export default history;

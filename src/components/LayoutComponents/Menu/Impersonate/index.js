import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { withCurrentUserContext } from 'providers/CurrentUserProvider';
import { withRouter } from 'react-router-dom';
import { RESTORE_AUTH } from './Impersonate.queries';
import { GET_ME } from '../../../../pages/Apps/Members/AccountSettings/UserAccount.queries';
import './style.scss';

@withRouter
@withCurrentUserContext
class Impersonate extends React.Component {
  render() {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      return (
        <ApolloConsumer>
          {client => (
            <div className="wrapper">
              Impersonating {this.props.user.firstName} {this.props.user.lastName}.
              <span
                className="endSession"
                onClick={() => {
                  localStorage.setItem('token', localStorage.getItem('adminToken'));
                  localStorage.removeItem('adminToken');
                  client.cache.reset();
                  // .then(() => {
                  client.query({ query: GET_ME, fetchPolicy: 'network-only' }).then(me => {
                    console.log('me', me);
                    this.props.userContext.setCurrentUser(me.data.me);
                    this.props.history.push('/corporate/users');
                  });
                  // });
                }}
              >
                {' '}
                Click Here to End Impersonation.
              </span>
            </div>
          )}
        </ApolloConsumer>
      );
    } else {
      return null;
    }
  }
}

export default Impersonate;

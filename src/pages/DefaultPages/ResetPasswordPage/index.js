import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { notification, Spin } from 'antd';
import * as moment from 'moment';
import { VALIDATE_PASSWORD_RESET_TOKEN } from './PasswordReset.queries';
import ResetPasswordForm from './ResetPasswordForm';
import './index.styles.scss';

@withRouter
class ResetPasswordPage extends React.Component {
  handleLogin = () => {
    notification.open({
      type: 'success',
      message: 'You have successfully changed your Password!',
      description: 'Password Reset',
    });
  };

  render() {
    return (
      <Query query={VALIDATE_PASSWORD_RESET_TOKEN} variables={{ resetToken: this.props.match.params.token }}>
        {({ data, loading, error }) => {
          if (loading) return <Spin size="large" />;
          if (data && !loading)
            return (
              <React.Fragment>
                <Helmet title="Login" />
                <div className="forgot-password forgot-password--fullscreen">
                  <div className="forgot-password__header">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="forgot-password__header__logo">
                          <img src="/resources/images/svgs/TVI-TM-Logo-Horizontal-White.svg" alt="TripValet Incentives" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="forgot-password__block pb-0">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="forgot-password__block__inner">
                          <div className="forgot-password__block__form">
                            <ResetPasswordForm token={this.props.match.params.token} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
        }}
      </Query>
    );
  }
}

export default ResetPasswordPage;

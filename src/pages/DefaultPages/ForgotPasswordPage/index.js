import React from 'react';
import Helmet from 'react-helmet';
import { notification } from 'antd';
import * as moment from 'moment';
import ForgotPasswordForm from './ForgotPasswordForm';
import './index.styles.scss';

class LoginPage extends React.Component {
  handleLogin = () => {
    let { location, history } = this.props;

    if (location.state && location.state.from) {
      history.replace(this.props.location.state.from.pathname);
    } else history.replace('/members');

    notification.open({
      type: 'success',
      message: 'You have successfully logged in!',
      description: 'Welcome to the TripValet Incentives!',
    });
  };

  render() {
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
                    <ForgotPasswordForm handleLogin={this.handleLogin} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;

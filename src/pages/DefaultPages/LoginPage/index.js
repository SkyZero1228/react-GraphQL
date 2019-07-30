import React from 'react';
import Helmet from 'react-helmet';
import { notification } from 'antd';
import * as moment from 'moment';
import LoginForm from './LoginForm';
import './style.scss';

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
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[new Date().getMonth()];
    const year = new Date().getFullYear().toString();

    return (
      <React.Fragment>
        <Helmet title="Login" />
        <div className="main-login main-login--fullscreen">
          <div className="main-login__header">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-login__header__logo">
                  <img src="/resources/images/svgs/TVI-TM-Logo-Horizontal-White.svg" alt="TripValet Incentives" />
                </div>
              </div>
            </div>
          </div>
          <div className="main-login__block main-login__block--extended pb-0">
            <div className="row">
              <div className="col-xl-12">
                <div className="main-login__block__inner">
                  <div className="main-login__block__form">
                    <LoginForm handleLogin={this.handleLogin} />
                  </div>
                  <div className="main-login__block__sidebar">
                    <h4 className="main-login__block__sidebar__title text-white">
                      <strong>
                        Welcome to<br />TripValet Incentives
                      </strong>
                      <br />
                      <span>{moment().format('lll')}</span>
                    </h4>
                    <div className="main-login__block__sidebar__item">Would you like the Opportunity to Grow your Business by 100, 200 or even 300% by Giving Away Complimentary Vacations to your Leads, Prospects and Clients?</div>
                    <div className="main-login__block__sidebar__item">TripValet Incentives was built from the ground up to do just that! Login now to get started!</div>
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

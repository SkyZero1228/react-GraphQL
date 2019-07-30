import React from 'react';
import { Button } from 'antd';
import './style.scss';

class AppFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__top">
          <div className="row">
            <div className="col-lg-9">
              <p>
                <strong>TripValet Incentives - Explode your businesss!</strong>
              </p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <p>Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="row">
            <div className="col-sm-6">Something Here?</div>
            <div className="col-sm-6">
              <div className="footer__copyright">
                <img src="/resources/images/TipValetIcon-48x48.png" target="_blank" rel="noopener noreferrer" alt="TripValet LLC" />
                <span>
                  © 2018{' '}
                  <a href="https://tripvalet.com/" target="_blank" rel="noopener noreferrer">
                    TripValet LLC
                  </a>
                  <br />
                  All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppFooter;

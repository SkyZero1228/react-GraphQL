import React from 'react';
import { Row, Col, Icon, Input, Button, Checkbox } from 'antd';
import { CurrentUserContext } from 'providers/CurrentUserProvider';

class WelcomeComponent extends React.PureComponent {
  render() {
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Welcome To TripValet Incentives!</strong>
          </div>
        </div>
        <div className="card-body">
          <p>
            You have made a priceless investment for your work that is guaranteed to boost business and build loyalty with your clients.
          </p>
          <p>
            With sixteen vacation certificates to choose from, there is something to suit each client’s needs. We’ve streamlined the gift
            giving process and have made saying THANK YOU easier and more personal than ever. Below is a quick overview of the steps &amp;
            tools to send your complimentary vacation certificates and keep your clients coming back for years to come.
          </p>
          <h4>
            <strong>How to Send a Certificate:</strong>
          </h4>
          <ol>
            <li>Fill out the form below with your recipient’s information &amp; your personalized message.</li>
            <li>The recipient will automatically receive an email with the certificate and instructions on how to register the cert.</li>
            <li>Once they’ve registered the certificate, they’ll have up to 1 year to redeem and book the vacation.</li>
          </ol>
          <h4>
            <strong>What’s in Your Briefcase:</strong>
          </h4>
          <ol>
            <li>Marketing Tools includes flyers &amp; posters to help you promote each certificate to your customers.</li>
            <li>The Videos sections has categories that represent each industry type allowing your videos to be correctly branded.</li>
            <li>
              ClickFunnels &amp; Landing Pages includes prebuilt templates to create professional looking websites with a simple click of a
              button.
            </li>
          </ol>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col xs={24} md={12}>
              {this.props.currentUser.roles.indexOf('CoinMD Member') >= 0 ? (
                <Button type="primary" size="large" className="utils__fullWidthButton" style={{ margin: '5px 0' }}>
                  <a href="https://www.facebook.com/groups/coinmdtravelmoreworryless/" target="_blank" rel="noopener noreferrer">
                    Join our Facebook CoinMD Travel More Worry Less Group!
                  </a>
                </Button>
              ) : (
                <Button type="primary" size="large" className="utils__fullWidthButton" style={{ margin: '5px 0' }}>
                  <a href="https://www.facebook.com/groups/tripvaletincentives/" target="_blank" rel="noopener noreferrer">
                    Join our Facebook TripValet Incentives Group!
                  </a>
                </Button>
              )}
            </Col>
            <Col xs={24} md={12} className="">
              <Button type="primary" size="large" className="utils__fullWidthButton" style={{ margin: '5px 0' }}>
                <a href="/affiliates/links">Get Your TripValet Incentives Affiliate Links!</a>
              </Button>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

export default WelcomeComponent;

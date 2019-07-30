import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import './index.styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class SupportPage extends React.Component {
  static defaultProps = {
    pathName: 'Support',
  };

  render() {
    const props = this.props;
    const left = 1;
    const middle = 2;
    const right = 3;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Support" />
            <Row className="utils__wide-content-card">
              <Col>
                <section className="card SupportPage">
                  <div className="card-body">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col order={middle}>
                        <img src="/resources/images/svgs/TVI-TM-Logo-Vertical.svg" alt="TripValet Incentives Logo" className="SupportPage__TviLogo" />
                      </Col>
                      <Col order={right}>
                        <h1 className="SupportPage__headline">Customer Support</h1>
                        <div className="SupportPage__toll-free">Toll Free: 1-800-816-2467</div>
                        <div className="SupportPage__email">
                          Email: <a href="mailto:support@tripvaletincentives.com">support@tripvaletincentives.com</a>
                        </div>
                      </Col>
                    </Row>
                    <img src="/resources/images/svgs/customer-support.svg" alt="Customer Support" />
                  </div>
                </section>
              </Col>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default SupportPage;

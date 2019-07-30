import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification, Card } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import './index.styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class ClickFunnelsPage extends React.Component {
  static defaultProps = {
    pathName: 'Click Funnels',
  };

  render() {
    const props = this.props;
    const videoId = '15i7jqc5w4';
    const title = 'ClickFunnels Walkthrough';
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Click Funnels" />
            <div style={{ maxWidth: '1000px', margin: '0 auto 30px auto' }}>
              <Card hoverable>
                <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                  <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                    <iframe src={`https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true`} title="Wistia video player" allowtransparency="true" frameBorder="0" scrolling="no" className="wistia_embed" name="wistia_embed" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" width="100%" height="100%" />
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center', margin: "10px"}} dangerouslySetInnerHTML={{ __html: title }} />
              </Card>
            </div>
            <Row className="utils__full-width-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Click Funnels</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Card title="Real Estate Funnel" className="mb-4">
                      <Row gutter={36}>
                        <Col xs={24} sm={6} style={{ maxWidth: '258px' }}>
                          <img src="/resources/images/clickFunnelsPreviews/TVIRealEstateFunnel.png" width="100%" alt="TVI Real Estate Funnel" />
                        </Col>
                        <Col xs={24} sm={18}>
                          <p>
                            <strong>Details:</strong>
                            <br />2 Opt In Pages + 1 Inside/Thank you page
                          </p>
                          <p>
                            <strong>Preview Page:</strong>
                            <br />
                            <a href="https://tripvalet.clickfunnels.com/optin23633004" rel="noopener noreferrer" target="_blank">
                              https://tripvalet.clickfunnels.com/optin23633004
                            </a>
                          </p>
                          <p>
                            <strong>Share Code:</strong>
                            <br />
                            <a href="https://app.clickfunnels.com/funnels/6167168/share/rn3wb1b46jfjwekr" rel="noopener noreferrer" target="_blank">
                              https://app.clickfunnels.com/funnels/6167168/share/rn3wb1b46jfjwekr
                            </a>
                          </p>
                        </Col>
                      </Row>
                    </Card>
                    <Card title="Insurance Funnel">
                      <Row gutter={36}>
                        <Col xs={24} sm={6} style={{ maxWidth: '258px' }}>
                          <img src="/resources/images/clickFunnelsPreviews/TVIInsuranceFunnel.png" width="100%" alt="TVI Insurance Funnel" />
                        </Col>
                        <Col xs={24} sm={18}>
                          <p>
                            <strong>Details:</strong>
                            <br />2 Opt In Pages + 1 Inside/Thank you page
                          </p>
                          <p>
                            <strong>Preview Page:</strong>
                            <br />
                            <a href="https://tripvalet.clickfunnels.com/optin23651745" rel="noopener noreferrer" target="_blank">
                              https://tripvalet.clickfunnels.com/optin23651745
                            </a>
                          </p>
                          <p>
                            <strong>Share Code:</strong>
                            <br />
                            <a href="https://app.clickfunnels.com/funnels/6171288/share/zsvu8xiw9q2kxmok" rel="noopener noreferrer" target="_blank">
                              https://app.clickfunnels.com/funnels/6171288/share/zsvu8xiw9q2kxmok
                            </a>
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </section>
              </Col>
            </Row>
          </Page>
        </AntContent>
        <script src="https://fast.wistia.net/assets/external/E-v1.js" async />
      </Layout>
    );
  }
}

export default ClickFunnelsPage;

import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import CertificateDocuments from './CertificateDocuments';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class MarketingToolsPage extends React.Component {
  static defaultProps = {
    pathName: 'Marketing Tools',
  };

  render() {
    const props = this.props;

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Marketing Tools" />
            <Row className="utils__wide-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Marketing Tools</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <CertificateDocuments />
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

export default MarketingToolsPage;

import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Row, Col, Alert, Spin, Icon, Form, Collapse, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_FAQS } from './FaqPage.queries';
import './FaqPage.styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const Panel = Collapse.Panel;

class FaqPage extends React.Component {
  static defaultProps = {
    pathName: 'Frequently Asked Questions',
  };
  renderPanels = data => {
    return data.getFrequentlyAskedQuestions.map(q => (
      <Collapse key={q.id} bordered={false}>
        <Panel className="FaqPage__panel" header={q.question}>
          <p>{q.answer}</p>
        </Panel>
      </Collapse>
    ));
  };

  render() {
    const props = this.props;

    return (
      <Layout>
        <Page {...props}>
          <Helmet title="Frequently Asked Questions" />
          <Query query={GET_FAQS}>
            {({ data, loading, error }) => {
              if (loading) return <Spin delay="250" />;
              if (error) return null;
              if (data) {
                return (
                  <Row gutter={24} type="flex" justify="space-around" align="top">
                    <Col className="FaqPage__header-image">
                      <img src="/resources/images/svgs/faq.svg" alt="FAQ" />
                    </Col>
                    <Col className="FaqPage__faq-panels">{this.renderPanels(data)}</Col>
                  </Row>
                );
              }
            }}
          </Query>
        </Page>
      </Layout>
    );
  }
}

export default FaqPage;
